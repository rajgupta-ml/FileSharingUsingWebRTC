import { WebSocket } from "ws";

export interface userData {
  UUID: string;
  action: string;
  SCD: string;
  name: string;
  task: string;
  socket: WebSocket;
}

export interface usersDataToBroadcast {
  name: string;
  socket: WebSocket;
}
