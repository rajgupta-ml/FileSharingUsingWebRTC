import { WebSocket } from "ws";
import { userData } from "../types/SocketMangerTypes.js";
import { SocketManger } from "../ws/SocketManager.js";
import { DataExchangeManager } from "../ws/DataExchangeManager.js";

export const wsRouter = (
  ws: WebSocket,
  SocketManager: SocketManger,
  message: userData,
  DataExchangeManager: DataExchangeManager,
) => {
  switch (message.action) {
    // When sender click the want to send Data button || want to recive data
    case "add-user":
      SocketManager.addUserDetails(ws, message);
      DataExchangeManager.classifyUser(ws, message);
      break;
    case "disconnet":
      SocketManager.deleteUser(ws, message.UUID);
      break;
  }
};
