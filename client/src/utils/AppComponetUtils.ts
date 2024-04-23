import { DataManager } from "@/Managers/DataManager";
import { SocketManager } from "@/Managers/SocketManager";
import React from "react";

const fetchUUID = async (DataManagerInstance : DataManager, setUUID : React.Dispatch<React.SetStateAction<string>>) => {
    const uuid = await DataManagerInstance.getUUID();
    setUUID(uuid);
}


export const socketInitialization = (setSocket: React.Dispatch<React.SetStateAction<WebSocket | undefined | null>>, setUUID : React.Dispatch<React.SetStateAction<string>>) => {
    const DataManagerInstance = new DataManager()
    const instance = new SocketManager(DataManagerInstance);
    try {        
        instance.connect()
        if(instance.getSocket() !== null){
            setSocket(instance.getSocket()) 
            instance.listen();
            fetchUUID(DataManagerInstance, setUUID);
        }else{
            console.log("Cannot connect to the network")
        }
    } catch (error) {
        const ErrorMessage = {
                message : "Sorry But the websocket could not connect",
                errorCode : "401",
                error : error
            }
        throw new Error(JSON.stringify(ErrorMessage));
    }
} 
