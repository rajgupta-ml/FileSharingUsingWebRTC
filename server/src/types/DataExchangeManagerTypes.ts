import { WebSocket } from "ws";

export interface SenderReceiverMapping {
  senderName: string;
  receiverName: string;
  senderUUID: string;
  receiverUUID: string;
}
