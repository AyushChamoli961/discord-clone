"use client"

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
    DialogFooter
    
 } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import{Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {FileUpload} from "@/components/file-upload"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useModal } from "./use-modal-store";


const formSchema = z.object({
    name: z.string().min(1,{
        message:"Server name is required"
    }),
    imageUrl:z.string().min(1,{
        message:"image is required"
    })
});


export const CreateServerModal = () => {
    const {isOpen, onClose, type} = useModal();
    const router  = useRouter();
    
    const isModalOpen = isOpen && type === "createServer"

    
const form =  useForm({
        resolver: zodResolver(formSchema),

        defaultValues: {
            name:"",
            imageUrl:""
        }       
});

const isLoading = form.formState.isLoading;
const onSubmit = async(values:z.infer<typeof formSchema>) => {
    try{
        await axios.post("/api/servers", values);

        form.reset();
        router.refresh();
      
    }
    catch(error){
        console.log(error)
    }
    }

    const handleClose = () => {
        form.reset();
        router.refresh();
        onClose();
    }

    return ( <div>
       <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2xl text-center font-bold">
                    Customize your server.
                </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text text-center text-zinc-500" >
                Add name and Image to your server u can change it later
            </DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center text-center">
                         <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                       <FileUpload
                       endpoint="serverImage"
                       value = {field.value}
                       onChange = {field.onChange}

                       />
                      </FormControl>
                    </FormItem>
                  )}
                />
                        </div>
                        <FormField 
                        control={form.control}
                        name = "name"
                        render = {({field}) => (
                            <FormItem>
                                 <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                    Server Name
                                 </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled = {isLoading}
                                    className="bg-zinc-300/50 border-0 focus-visible:ring-offset-0"
                                    placeholder="Enter server name"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                           
                           
                        )}
                        />
                    </div>
                    <DialogFooter className="px-8 py-6 bg-gray-100">
                        <Button disabled={isLoading} variant={"primary"}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
            
        </DialogContent>
       </Dialog>
    </div> );
}
 
export default CreateServerModal;