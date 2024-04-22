export const wsRouter = (ws, SocketManager, message, DataExchangeManager) => {
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
