import { WebSocket } from "ws";
import { SocketManger } from "./SocketManager.js";
import { userData } from "../types/SocketMangerTypes.js";

export class DataExchangeManager {
  private socketManager: SocketManger;

  constructor(socket: SocketManger) {
    this.socketManager = socket;
  }

  classifyUser(currentUserSocket: WebSocket, currentUser: userData) {
    const users = this.socketManager.getUser();

    if (currentUser.task !== "sender") {
      return; // No action needed if current user is not a sender
    }

    const receivers = Array.from(users.entries())
      .filter(([userId, userData]) => userData && userData.task === "receiver")
      .map(([userId, userData]) => ({
        name: userData?.name,
        UUID: userData?.UUID,
      }));

    this.socketManager.brodcastToOne(
      currentUserSocket,
      JSON.stringify(receivers),
    );
  }
}
