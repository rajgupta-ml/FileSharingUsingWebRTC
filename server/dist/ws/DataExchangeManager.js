export class DataExchangeManager {
    constructor(socket) {
        this.socketManager = socket;
    }
    // Problem in this sender alawys needs to send the UUID to get the reciever data
    classifyUser(currentUser) {
        var _a;
        const users = this.socketManager.getUser();
        const senderSocket = (_a = users.get(currentUser.UUID)) === null || _a === void 0 ? void 0 : _a.socket;
        if (currentUser.task !== "sender") {
            return; // No action needed if current user is not a sender
        }
        if (!senderSocket)
            return; // There is no socket can send message
        const receivers = Array.from(users.entries())
            .filter(([userId, userData]) => userData && userData.task === "receiver")
            .map(([userId, userData]) => ({
            name: userData === null || userData === void 0 ? void 0 : userData.name,
            UUID: userData === null || userData === void 0 ? void 0 : userData.UUID,
        }));
        this.socketManager.brodcastToOne(senderSocket, JSON.stringify(receivers));
    }
}
