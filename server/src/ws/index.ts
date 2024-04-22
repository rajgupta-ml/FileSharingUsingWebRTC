import WebSocket, { WebSocketServer } from "ws";
import { SocketManger } from "./SocketManager.js";
import { wsRouter } from "../utlils/wsRouter.js";
import { DataExchangeManager } from "./DataExchangeManager.js";

const websockets: WebSocket[] = [];

const wss = new WebSocketServer({ port: 8080 });

const sm = new SocketManger();
const dm = new DataExchangeManager(sm);

wss.on("connection", (ws) => {
  sm.addUser(ws);

  ws.on("close", () => {
    ws.send("You been disconnected abruptly!");
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    wsRouter(ws, sm, message, dm);
  });
});
