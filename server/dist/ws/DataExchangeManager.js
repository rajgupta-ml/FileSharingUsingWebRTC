export class DataExchangeManager {
    constructor(socket) {
        this.senderReceiverMapping = [];
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
    handleSelectReceiver(data) {
        const users = this.socketManager.getUser();
        const senderUser = users.get(data.senderUUID);
        const receiverUser = users.get(data.receiverUUID);
        if (!senderUser || !receiverUser) {
            return; // Exit if sender or receiver not found
        }
        const senderSocket = senderUser.socket;
        const receiverSocket = receiverUser.socket;
        const senderSDC = senderUser.SCD;
        const receiverSDC = receiverUser.SCD;
        const senderReceiverMapCreation = {
            senderName: data.senderName,
            receiverName: data.receiverName,
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
        console.log(senderSocket);
        this.socketManager.brodcastToOne(senderSocket, JSON.stringify(senderMessage));
        this.socketManager.brodcastToOne(receiverSocket, JSON.stringify(receiverMessage));
    }
}
