"use client"

import CreateServerModal from "@/components/modals/create-server-modal"
import InviteModal from "@/components/modals/invite-modal"
import { useEffect, useState } from "react"
import EditServerModal from "../modals/edit-server-modal"
import { ManageMembers } from "@/components/modals/manage-members"
import CreateChannelModal from "../modals/create-channel-modal"
import { LeaveServerModal } from "../modals/leave-server-modal"
import DeleteServerModal from "../modals/delete-server-modal"
import DeleteChannelModal from "../modals/delete-channel-modal"
import { EditChannel } from "../modals/edit-channel-modal"
import { MessageFileModal } from "../modals/message-file-modal"
import { DeleteMessageModal } from "../modals/delete-message-modal"

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
            <LeaveServerModal/>
            <DeleteServerModal/>
            <DeleteChannelModal/>
            <EditChannel/>
            <MessageFileModal/>
            <DeleteMessageModal/>
        </>
    )
}