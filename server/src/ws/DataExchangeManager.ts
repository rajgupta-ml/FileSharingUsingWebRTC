import { SocketManger } from "./SocketManager.js";
import { userData } from "../types/SocketMangerTypes.js";

export class DataExchangeManager {
  private socketManager: SocketManger;

  constructor(socket: SocketManger) {
    this.socketManager = socket;
  }

  // Problem in this sender alawys needs to send the UUID to get the reciever data
  classifyUser(currentUser: userData) {
    const users = this.socketManager.getUser();
    const senderSocket = users.get(currentUser.UUID)?.socket;

    if (currentUser.task !== "sender") {
      return; // No action needed if current user is not a sender
    }

    if (!senderSocket) return; // There is no socket can send message

    const receivers = Array.from(users.entries())
      .filter(([userId, userData]) => userData && userData.task === "receiver")
      .map(([userId, userData]) => ({
        name: userData?.name,
        UUID: userData?.UUID,
      }));

    this.socketManager.brodcastToOne(senderSocket, JSON.stringify(receivers));
  }
}
