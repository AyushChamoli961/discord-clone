"use client"

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogFooter
    
 } from "@/components/ui/dialog";


import * as z from "zod";
import axios from "axios"
import { useModal } from "@/hooks/use-modal-store"
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    name: z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"image is required"
    })
});


export const LeaveServerModal = () => {

    const router = useRouter();
    const { isOpen, onClose, type, data} = useModal();
    const {server} = data;  
    const isModalOpen = isOpen && type === "leaveServer"
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);

            await axios.patch(`/api/servers/${server?.id}/leave`)

            onClose();
            router.refresh();
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsLoading(false)
        }
    }


    return ( <div>
       <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Leave Server
                </DialogTitle>
            
                <DialogDescription className="text text-center text-zinc-500" >
                    Are you sure you want to leave <span className="font-semibold text-indigo-400">{server?.name}</span>
                </DialogDescription>   
            </DialogHeader>
            <div className="p-6">
               Leaver Server
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between w-full">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        variant = "ghost"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant="primary"
                        onClick={onClick}
                    >
                        Confirm
                    </Button>

                </div>
            </DialogFooter>
        </DialogContent>
       </Dialog>
    </div> );
}
 
export default LeaveServerModal;