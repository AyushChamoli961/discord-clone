import { Server } from "@prisma/client";
import {create} from "zustand"

export type ModalType = "createServer" | "invite";

interface ModalData{
    server?: Server
}

interface ModalStrore{
    type: ModalType | null
    isOpen:  boolean
    data: ModalData
    onOpen: (type: ModalType, data: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStrore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({isOpen: true, type, data}),
    onClose: () => set({type: null, isOpen: false})
}))