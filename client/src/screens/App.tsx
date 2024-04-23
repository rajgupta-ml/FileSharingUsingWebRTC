import StartReceivingDialogBox from "@/components/screens/StartReceivingDialogBox"
import StartSendingDialogBox from "@/components/screens/StartSendingDialogBox"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import {socketInitialization } from "@/utils/AppComponetUtils"
import { useEffect, useState } from "react"

function App() {
  const [socket, setSocket] = useState<WebSocket | undefined | null>()
  const [UUID, setUUID] = useState<string>("");
  const {toast} = useToast()


  useEffect(() => {
    try {
      socketInitialization(setSocket, setUUID)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  }, [])
  
  
  useEffect(() => {
  
    console.log(UUID);
  }, [UUID])

  return (
    <>
    <div className="bg-[#09090b] h-screen flex justify-center items-center gap-4 flex-col">
    <h1 className="text-white text-8xl">Welcome fileSwift</h1>
    <h2 className="text-white opacity-70">Your Peer-to-Peer File Sharing Platform for Fast and Secure Transfers</h2>
    <div className=" flex justify-center items-center gap-2">
      <StartSendingDialogBox ></StartSendingDialogBox>
      <StartReceivingDialogBox></StartReceivingDialogBox>
    </div>

    </div>
    <Toaster/>
    </>
  )
}
export default App