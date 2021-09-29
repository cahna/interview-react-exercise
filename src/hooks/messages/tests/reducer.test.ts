import { SortDirection } from "client/messages/utils";

import { reducer, ActionType, ClientState, DEFAULT_OPTIONS } from "../index";

describe("useMessages reducer", () => {
  describe("ActionType.NotifyLoading", () => {
    it("sets loading state", () => {
      const initialState: ClientState = {
        loading: false,
        firstLoad: false,
        options: { ...DEFAULT_OPTIONS },
        messages: []
      };
      const newState = reducer(initialState, {
        type: ActionType.NotifyLoading,
        payload: { loading: true }
      });
      expect(newState).toEqual({
        ...initialState,
        loading: true
      });
    });
  });

  describe("ActionType.ToggleSortDirection", () => {
    it("inverts sort direction and resets messages", () => {
      const initialState: ClientState = {
        loading: false,
        firstLoad: false,
        options: {
          ...DEFAULT_OPTIONS,
          sortDirection: SortDirection.ASCENDING,
          offset: 1
        },
        messages: [
          {
            uuid: "5a6a5467-2e91-4d0e-8487-bd18dfe268bd",
            sentAt: new Date(),
            senderUuid: "b7ae4b74-3527-4896-b46c-feaa30d53e81",
            content: "This is a test"
          }
        ]
      };
      const newState = reducer(initialState, {
        type: ActionType.ToggleSortDirection
      });

      expect(newState).toEqual({
        ...initialState,
        options: {
          ...initialState.options,
          offset: 0,
          sortDirection: SortDirection.DESCENDING
        },
        messages: []
      });
    });
  });

  describe("ActionType.SetMessages", () => {
    it.skip("TODO", () => {});
  });

  describe("ActionType.AppendMessages", () => {
    it.skip("TODO", () => {});
  });

  describe("ActionType.DeleteMessage", () => {
    it.skip("TODO", () => {});
  });
});
