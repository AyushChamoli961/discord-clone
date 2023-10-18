import {create} from "zustand"

export type ModalType = "createServer";

interface ModalStrore{
    type: ModalType | null
    isOpen:  boolean
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

export const useModal = create<ModalStrore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({isOpen: true, type}),
    onClose: () => set({type: null, isOpen: false})
}))