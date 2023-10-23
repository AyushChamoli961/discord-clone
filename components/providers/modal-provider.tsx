"use client"

import CreateServerModal from "@/components/modals/create-server-modal"
import InviteModal from "@/components/modals/invite-modal"
import { useEffect, useState } from "react"
import EditServerModal from "../modals/edit-server-modal"
import { ManageMembers } from "@/components/modals/manage-members"
import CreateChannelModal from "../modals/create-channel-modal"

export const ModalProvider = () => {
    const [isMounted,  setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }
    return(
        <>
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <ManageMembers/>
            <CreateChannelModal/>
        </>
    )
}