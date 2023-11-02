
import {create} from "zustand"
import { Channel, ChannelType, Server } from "@prisma/client";


export type ModalType = "createServer" | "invite" | "editServer"|"manageMembers" | "createChannel" | "leaveServer" | "deleteServer"| "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage";

interface ModalData{
    server?: Server
    channel?: Channel
    channelType?: ChannelType
    apiUrl?: string
    query?: Record<string, any>
}

interface ModalStrore{
    type: ModalType | null
    isOpen:  boolean
    data: ModalData
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStrore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false})
}))