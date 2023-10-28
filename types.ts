import { Server, Member, Profile } from "@prisma/client";
import {Server as NetServer, Socket} from "net"
import { NextApiResponse } from "next";
import {Server as ServerIo} from "socket.io"

export type ServerWithMembersWithProfile = Server & {
    members: (Member & {profile: Profile})[];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIo
        }
    }
}