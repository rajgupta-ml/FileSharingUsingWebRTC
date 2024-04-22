import { generateUUID } from "../utlils/generateUUID.js";
export class SocketManger {
    constructor() {
        this.UUID = "";
        this.user = new Map();
    }
    // When websocket is gets connected for the first time
    addUser(socket) {
        this.UUID = generateUUID();
        this.user.set(this.UUID, null);
        this.brodcastToOne(socket, `Your UNNIQUE ID:  ${this.UUID}`);
    }
    deleteUser(socket, userId) {
        if (this.user.has(userId))
            this.user.delete(userId);
        this.brodcastToOne(socket, "You have been successfully disconnected from the the websocket");
    }
    // When send or reciver button is clicked
    addUserDetails(socket, data) {
        this.user.set(this.UUID, Object.assign(Object.assign({}, data), { socket, UUID: this.UUID }));
        this.brodcastToOne(socket, this.UUID);
    }
    // Brodcast the message to one client
    brodcastToOne(socket, message) {
        socket.send(JSON.stringify(message));
    }
    // Brodcast the message to everyone
    brodcastToMany(users) { }
}
