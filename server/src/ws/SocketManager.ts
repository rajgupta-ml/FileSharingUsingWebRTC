import { WebSocket } from "ws";
import { userData, usersDataToBroadcast } from "../types/SocketMangerTypes.js";
import { generateUUID } from "../utlils/generateUUID.js";

export class SocketManger {
  private user: Map<string, userData | null>;

  private UUID: string = "";

  constructor() {
    this.user = new Map<string, userData | null>();
  }

  // When websocket is gets connected for the first time
  addUser(socket: WebSocket) {
    this.UUID = generateUUID();
    this.user.set(this.UUID, null);
    const message = {
      "action" : "set-UUID",
      "UUID" : this.UUID
    }
    this.brodcastToOne(socket, JSON.stringify(message));
  }

  deleteUser(userId: string) {
    const socket = this.user.get(userId)?.socket;
    if (socket === undefined) return;
    if (this.user.has(userId)) {
      this.user.delete(userId);
      socket.close(
        1000,
        "You have been successfully disconnected from the the websocket",
      );
    } else {
      socket.close(4000, "Sorry, There was some problem!");
    }
  }

  // When send or reciver button is clicked
  addUserDetails(socket: WebSocket, data: userData) {
    this.user.set(this.UUID, { ...data, socket, UUID: this.UUID });
    this.brodcastToOne(socket, this.UUID);
    // If task of the user is send files then diplay him all the user whose task is to recieve the data
  }

  // Brodcast the message to one client
  brodcastToOne(socket: WebSocket, message: string) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }

  // Brodcast the message to everyone
  brodcastToMany(usersToBrodacastTo: usersDataToBroadcast) {
    usersToBrodacastTo;
  }

  // Getter
  getUser() {
    return this.user;
  }
}
