export class DataExchangeManager {
    constructor(socket) {
        this.socketManager = socket;
    }
    print() {
        console.log(this.socketManager.getUser());
    }
}
