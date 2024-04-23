import { WebSocket } from "ws";
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
        const message = {
            "action": "set-UUID",
            "UUID": this.UUID
        };
        this.brodcastToOne(socket, JSON.stringify(message));
    }
    deleteUser(userId) {
        var _a;
        const socket = (_a = this.user.get(userId)) === null || _a === void 0 ? void 0 : _a.socket;
        if (socket === undefined)
            return;
        if (this.user.has(userId)) {
            this.user.delete(userId);
            socket.close(1000, "You have been successfully disconnected from the the websocket");
        }
        else {
            socket.close(4000, "Sorry, There was some problem!");
        }
    }
    // When send or reciver button is clicked
    addUserDetails(socket, data) {
        this.user.set(this.UUID, Object.assign(Object.assign({}, data), { socket, UUID: this.UUID }));
        this.brodcastToOne(socket, this.UUID);
        // If task of the user is send files then diplay him all the user whose task is to recieve the data
    }
    // Brodcast the message to one client
    brodcastToOne(socket, message) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        }
    }
    // Brodcast the message to everyone
    brodcastToMany(usersToBrodacastTo) {
        usersToBrodacastTo;
    }
    // Getter
    getUser() {
        return this.user;
    }
}
