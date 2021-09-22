import { useEffect, useReducer } from "react";

import { Message } from "types/messages";
import { useMessagesClient, GetMessagesOptions } from "client/messages";
import { SortDirection } from "client/messages/utils";

export interface UseMessages {
  messages: ReadonlyArray<Message>;
  readonly loading: boolean;
  readonly options: GetMessagesOptions;
  readonly setSortDirection: (sortDirection: SortDirection) => void;
  readonly loadNextPage: () => void;
  readonly deleteMessage: (uuid: string) => void;
}

export interface UseMessagesOptions extends GetMessagesOptions {
  // Additional options here
}

export const DEFAULT_OPTIONS: GetMessagesOptions = {
  offset: 0,
  limit: 5,
  sortBy: "sentAt",
  sortDirection: SortDirection.ASCENDING
};

export enum ActionType {
  NotifyLoading,
  SetMessages,
  AppendMessages,
  DeleteMessage,
  SetSortDirection
}

interface ClientState {
  readonly firstLoad: boolean;
  readonly loading: boolean;
  readonly options: GetMessagesOptions;
  messages: ReadonlyArray<Message>;
}

type Action =
  | { type: ActionType.NotifyLoading; payload: { loading: boolean } }
  | {
      type: ActionType.SetSortDirection;
      payload: { sortDirection: SortDirection };
    }
  | {
      type: ActionType.SetMessages;
      payload: { messages: ReadonlyArray<Message> };
    }
  | {
      type: ActionType.AppendMessages;
      payload: { messages: ReadonlyArray<Message> };
    }
  | {
      type: ActionType.DeleteMessage;
      payload: { uuid: string };
    };

export const reducer = (state: ClientState, action: Action): ClientState => {
  switch (action.type) {
    case ActionType.NotifyLoading:
      return {
        ...state,
        loading: true
      };
    case ActionType.SetMessages:
      return {
        ...state,
        firstLoad: true,
        loading: false,
        messages: action.payload.messages,
        options: {
          ...state.options,
          offset: action.payload.messages.length
        }
      };
    case ActionType.AppendMessages:
      const newMessages = [...state.messages, ...action.payload.messages];
      return {
        ...state,
        firstLoad: true,
        loading: false,
        messages: newMessages,
        options: {
          ...state.options,
          offset: newMessages.length
        }
      };
    case ActionType.DeleteMessage:
      const filteredMessages = state.messages.filter(
        (m) => m.uuid !== action.payload.uuid
      );
      return {
        ...state,
        loading: false,
        messages: filteredMessages,
        options: {
          ...state.options,
          offset: filteredMessages.length
        }
      };
    case ActionType.SetSortDirection:
      return {
        ...state,
        messages: [],
        options: {
          ...state.options,
          sortDirection: action.payload.sortDirection
        }
      };
    default:
      throw new Error(`Unrecognized action: ${action}`);
  }
};

/**
 * Manage client-side state of messages and interactions with messages API client
 */
export const useMessages = (
  initialOptions: UseMessagesOptions = DEFAULT_OPTIONS
): UseMessages => {
  const client = useMessagesClient();
  const [state, dispatch] = useReducer(reducer, {
    firstLoad: false,
    loading: false,
    options: { ...initialOptions },
    messages: []
  });

  const notifyLoading = (loading: boolean = true) =>
    dispatch({ type: ActionType.NotifyLoading, payload: { loading } });

  const reloadMessages = async () => {
    if (state.loading) {
      return;
    }

    notifyLoading();

    const receivedMessages = await client.getMessages(state.options);

    dispatch({
      type: ActionType.SetMessages,
      payload: { messages: receivedMessages }
    });
  };

  useEffect(() => {
    // Reset messages state on first load and whenever sortDirection changes
    reloadMessages();
  }, [state.options.sortDirection]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Set the sortDirection for future API requests, and sort the current messages
   */
  const setSortDirection = (sortDirection: SortDirection) => {
    dispatch({
      type: ActionType.SetSortDirection,
      payload: { sortDirection }
    });
  };

  const loadNextPage = async () => {
    notifyLoading();

    const receivedMessages = await client.getMessages(state.options);

    dispatch({
      type: ActionType.AppendMessages,
      payload: { messages: receivedMessages }
    });
  };

  const deleteMessage = async (uuid: string) => {
    notifyLoading();

    await client.deleteMessage(uuid);

    dispatch({
      type: ActionType.DeleteMessage,
      payload: { uuid }
    });
  };

  return {
    messages: state.messages,
    loading: state.loading,
    options: state.options,
    setSortDirection,
    loadNextPage,
    deleteMessage
  };
};
