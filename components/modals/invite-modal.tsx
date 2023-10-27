"use client"

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    
 } from "@/components/ui/dialog";

import{Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"


import * as z from "zod";

import axios from "axios"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "@/components/ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


const formSchema = z.object({
    name: z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"image is required"
    })
});


export const InviteModal = () => {
    const {onOpen, isOpen, onClose, type, data} = useModal();
    const origin = useOrigin();

    const {server} = data;
    
    const isModalOpen = isOpen && type === "invite"
    const inviteUrl = `${origin}/invite/${server?.inviteCode}` //this inviteCode is from the server model in prisma.

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

 const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

    return ( <div>
       <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Invite firends to your server
                </DialogTitle>
            
                <DialogDescription className="text text-center text-zinc-500" >
                    
                </DialogDescription>   
            </DialogHeader>
            <div className="p-6">
                <Label className="uppercase text-xs font-bold text-zinc-500 dark:test-secondary/70">
                    Server invite link here
                </Label>
                <div className="flex items-center mt-2 gap-x-2">
                    <Input
                    disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black  focus-visible:ring-offset-0"
                        value={inviteUrl}
                    />
                    
                    <Button disabled={isLoading} onClick={onCopy} size="icon">
                        {
                            copied ? <Check className="h-5 w-5 text-green-400"/> : <Copy className="h-5 w-5"/>
                        }
                    
                    </Button>
                </div>
                <Button onClick={onNew} variant="link" size="sm" className="text-xs text-zinc-500 mt-4">
                    Generate a new link
                    <RefreshCw className="w-4 h-4 ml-2"/>
                </Button>
            </div>
        </DialogContent>
       </Dialog>
    </div> );
}
 
export default InviteModal;