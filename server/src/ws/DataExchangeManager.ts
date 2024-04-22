import { SocketManger } from "./SocketManager.js";
import { receiverSelection, userData } from "../types/SocketMangerTypes.js";
import { SenderReceiverMapping } from "../types/DataExchangeManagerTypes.js";

export class DataExchangeManager {
  private socketManager: SocketManger;

  private senderReceiverMapping: SenderReceiverMapping[] = [];

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

  handleSelectReceiver(data: receiverSelection) {
    const users = this.socketManager.getUser();
    const senderUser = users.get(data.senderUUID);
    const receiverUser = users.get(data.receiverUUID);

    if (!senderUser || !receiverUser) {
      return; // Exit if sender or receiver not found
    }

    const senderSocket = senderUser.socket;
    const receiverSocket = receiverUser.socket;

    const senderName = senderUser.name;
    const receiverName = receiverUser.name;

    const senderSDC = senderUser.SCD;
    const receiverSDC = receiverUser.SCD;

    const senderReceiverMapCreation: SenderReceiverMapping = {
      senderName,
      receiverName,
      senderUUID: data.senderUUID,
      receiverUUID: data.receiverUUID,
    };

    this.senderReceiverMapping.push(senderReceiverMapCreation);

    const receiverMessage = {
      message: `You have been successfully connected with ${senderUser.name}`,
      senderSDC,
    };

    const senderMessage = {
      message: `You have been successfully connected with ${receiverUser.name}`,
      receiverSDC,
    };

    // Broadcast messages to sender and receiver
    this.socketManager.brodcastToOne(
      senderSocket,
      JSON.stringify(senderMessage),
    );

    this.socketManager.brodcastToOne(
      receiverSocket,
      JSON.stringify(receiverMessage),
    );
  }
}
