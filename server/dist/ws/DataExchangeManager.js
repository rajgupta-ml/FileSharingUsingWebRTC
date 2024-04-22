export class DataExchangeManager {
    constructor(socket) {
        this.socketManager = socket;
    }
    classifyUser(currentUserSocket, currentUser) {
        const users = this.socketManager.getUser();
        if (currentUser.task !== "sender") {
            return; // No action needed if current user is not a sender
        }
        const receivers = Array.from(users.entries())
            .filter(([userId, userData]) => userData && userData.task === "receiver")
            .map(([userId, userData]) => ({
            name: userData === null || userData === void 0 ? void 0 : userData.name,
            UUID: userData === null || userData === void 0 ? void 0 : userData.UUID,
        }));
        this.socketManager.brodcastToOne(currentUserSocket, JSON.stringify(receivers));
    }
}
