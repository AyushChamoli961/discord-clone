import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
    children,// children is the content of the page
    params,
}: {
    children:React.ReactNode,//this line is saying that children is a react node and react node is a type of react component.

    params: {serverId: string},// reads whats in the url
}) => {
    const profile = await currentProfile();

    if(!profile) redirectToSignIn();

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            
            members: {
                some:{
                    profileId: profile?.id 
                }
            }
            //we are checking members to see if the profile id is in the members array because if we only check for id then anyone one the server can access the channel

        }
    })
    if(!server){
        return redirect("/")
    }

    return(
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId = {params.serverId}/>
            </div>
            <main className="h-full md:pl-60">
                 {children}
            </main>
           
        </div>
    )
}

export default ServerIdLayout;