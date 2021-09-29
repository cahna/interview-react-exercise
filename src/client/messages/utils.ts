import { Message, RawMessage } from "types/messages";

export enum SortDirection {
  ASCENDING = "asc",
  DESCENDING = "desc"
}

export type MessageCompareFn = (msg1: Message, msg2: Message) => number;

/**
 * Generic sort compare function for objects by key/attribute name
 * @param key object key name
 * @param direction sort direction
 */
export const compareMessageKey = (
  key: keyof Message = "sentAt",
  direction: SortDirection
): MessageCompareFn => {
  return (m1, m2) => {
    if (m1[key] instanceof Date) {
      if (direction === SortDirection.ASCENDING) {
        return (m2[key] as any) - (m1[key] as any);
      } else {
        return (m1[key] as any) - (m2[key] as any);
      }
    }

    if (m1[key] === m2[key]) {
      return 0;
    } else if (m1[key] < m2[key]) {
      return direction === SortDirection.ASCENDING ? -1 : 1;
    } else {
      return direction === SortDirection.DESCENDING ? 1 : -1;
    }
  };
};

/**
 * Parse message strings into JS types
 */
export const parseMessage = ({
  uuid,
  sentAt,
  senderUuid,
  content
}: RawMessage): Message => ({
  uuid,
  senderUuid,
  sentAt: new Date(sentAt),
  content
});
