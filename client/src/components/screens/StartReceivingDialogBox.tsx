import { Antenna } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import React, {useState } from "react"

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));


function StartReceivingDialogBox() {
  
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    wait().then(() => setIsOpen(false));
    event.preventDefault();
    console.log(name)
  }
  
  return (
    <Dialog open = {isOpen as boolean} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Antenna className="mr-2 h-4 w-4"/>
          Receive Files
        </Button>
      </DialogTrigger>


      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
          >Enter details</DialogTitle>
          <DialogDescription>
            Please enter your name in the provided field to commence receiving files.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onChange={(event : React.ChangeEvent<HTMLInputElement> ) => setName(event.target.value)}
              value={name}
              id="name"
              className="col-span-3"
            />
          </div>
     
        </div>
        <DialogFooter>
          <Button type="submit">Receive Files</Button>
        </DialogFooter>
        </form>
      </DialogContent>
 
    </Dialog>

  )
}

export default StartReceivingDialogBox