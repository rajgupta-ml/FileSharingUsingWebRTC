import { WebSocket } from "ws";
import { receiverSelection, userData } from "../types/SocketMangerTypes.js";
import { SocketManger } from "../ws/SocketManager.js";
import { DataExchangeManager } from "../ws/DataExchangeManager.js";

export const wsRouter = (
  ws: WebSocket,
  SocketManager: SocketManger,
  message: userData | receiverSelection,
  DataExchangeManager: DataExchangeManager,
) => {
  switch (message.action) {
    // When sender click the want to send Data button || want to recive data
    case "add-user":
      SocketManager.addUserDetails(ws, message as userData);
      DataExchangeManager.classifyUser(message as userData);
      break;
    case "disconnet":
      SocketManager.deleteUser(ws, (message as userData).UUID);
      break;

    case "selection-done":
      DataExchangeManager.handleSelectReceiver(message as receiverSelection);
  }
};
