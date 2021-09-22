import { useState, useMemo, useEffect } from "react";
import { Message } from "types/messages";

import DATA from "./data.json";
import { SortDirection, compareMessageKey, parseMessage } from "./utils";

export interface GetMessagesOptions {
  offset: number;
  limit?: number;
  sortBy?: keyof Message;
  sortDirection?: SortDirection;
}

export interface IMessagesClient {
  getMessages: (options: GetMessagesOptions) => Promise<ReadonlyArray<Message>>;
  deleteMessage: (uuid: string) => Promise<void>;
}

/**
 * Simulate network latency
 */
const sleep = (seconds: number) =>
  new Promise((r) => setTimeout(r, seconds * 1000));

export const useMessagesClient = (): IMessagesClient => {
  // This represents the source-of-truth for messages (ie: server-side database)
  const [messages, setMessages] = useState<ReadonlyArray<Message>>(() => []);

  useEffect(() => {
    // Set initial state in useEffect so that codesandbox hot-reloading doesn't break UX
    setMessages(
      // Deep copy of JSON data and parse into JS types
      JSON.parse(JSON.stringify(DATA)).messages.map(parseMessage)
    );
  }, []);

  const getMessages: IMessagesClient["getMessages"] = useMemo(
    () => async ({
      offset = 0,
      limit = 5,
      sortBy = "sentAt",
      sortDirection = SortDirection.ASCENDING
    }) => {
      const sortedMessages = [...messages];
      sortedMessages.sort(compareMessageKey(sortBy, sortDirection));
      await sleep(1);
      return sortedMessages.slice(offset, offset + limit);
    },
    [messages]
  );

  const deleteMessage: IMessagesClient["deleteMessage"] = useMemo(
    () => async (uuid: string) => {
      setMessages((currentMessages) =>
        currentMessages.filter((m) => m.uuid !== uuid)
      );
      await sleep(1);
    },
    []
  );

  return {
    getMessages,
    deleteMessage
  };
};
