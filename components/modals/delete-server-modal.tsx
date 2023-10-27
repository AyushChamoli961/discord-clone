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




export const DeleteServerModal = () => {

    const router = useRouter();
    const { isOpen, onClose, type, data} = useModal();
    const {server} = data;  
    const isModalOpen = isOpen && type === "deleteServer"
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);

            await axios.delete(`/api/servers/${server?.id}/delete`)

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
                    Delete Server
                </DialogTitle>
            
                <DialogDescription className="text text-center text-zinc-500" >
                    Are you sure you want to do that, <span className="font-semibold text-indigo-400">{server?.name}</span> will be permanently deleted.
                </DialogDescription>   
            </DialogHeader>
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
 
export default DeleteServerModal;