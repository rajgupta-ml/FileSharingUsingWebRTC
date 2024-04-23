import StartReceivingDialogBox from "@/components/screens/StartReceivingDialogBox"
import StartSendingDialogBox from "@/components/screens/StartSendingDialogBox"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
    
    <div className="bg-[#09090b] h-screen flex justify-center items-center gap-4 flex-col">
    <h1 className="text-white text-8xl">Welcome fileSwift</h1>
    <h2 className="text-white opacity-70">Your Peer-to-Peer File Sharing Platform for Fast and Secure Transfers</h2>
    <div className=" flex justify-center items-center gap-2">
      <StartSendingDialogBox></StartSendingDialogBox>
      <StartReceivingDialogBox></StartReceivingDialogBox>
    </div>

    </div>
    <Toaster/>
    </>
  )
}

export default App