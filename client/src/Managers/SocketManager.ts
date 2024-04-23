import { DataManager } from "./DataManager";

const URL = "ws://localhost:8080"

export class SocketManager {
    private socket : WebSocket | null = null;
    private dataManager : DataManager;
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager
    }
    connect() {   
        try {
            if (this.socket === null || this.socket.readyState !== WebSocket.OPEN) {
                const ws = new WebSocket(URL);
                ws.addEventListener('error', console.error);
                ws.addEventListener('open', () => console.log("WebSocket Connected Successfully"));
                this.socket = ws;
            } else {
                console.log("Websocket is already connected");
            }
        } catch (error) {
            throw new Error ()
        }
    }


    getSocket () {
        return this.socket;
    }

    listen () {
        if(this.socket === null) throw new Error()
        this.socket.addEventListener("message", (message) => {
            const {data} = message
            this.dataManager.routingTable(data);
        })
    }

}