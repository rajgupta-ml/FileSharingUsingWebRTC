import { WebSocket } from "ws";

export interface SenderReceiverMapping {
  senderUUID: string;
  receiverUUID: string;
}

export interface disconnectData {
  senderUUID?: string;
  receiverUUID?: string;
}
