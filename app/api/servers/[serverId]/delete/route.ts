import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    {params}: {params: {serverId: string}}
){
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!params.serverId){
            return new NextResponse("Server Id missing", {status: 400})
        }

        const server = await db.server.delete({
            where:{
                id: params.serverId,
                profileId: profile.id,
            },
        })

        return NextResponse.json(server);
    }
    catch(err){
        console.log("LEAVE_SERVER_PATCH", err);
        return new NextResponse("Internal server error", {status: 500})
    }
}