/**
 * Shape of Message JSON response, unparsed.
 */
export interface RawMessage {
  uuid: string;
  sentAt: string;
  senderUuid: string;
  content: string;
}

/**
 * Parsed Message payload
 */
export interface Message {
  uuid: string;
  sentAt: Date;
  senderUuid: string;
  content: string;
}
