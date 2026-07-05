"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/app/lib/db";


export async function onBoardUser() {
    const { userId } = await auth()

    if (!userId) {
        return
    }

    const clerkUser = await currentUser()

    if (!clerkUser) {
        return
    }


    const email =
        clerkUser!.primaryEmailAddress?.emailAddress ??
        clerkUser!.emailAddresses[0]?.emailAddress ??
        null;


    if (!email) {
        return { error: "Failed to get email" }
    }

    const name = clerkUser!.fullName ?? ([clerkUser!.firstName, clerkUser!.lastName].filter(Boolean).join(" ") || null)


    if (!name) {
        return { error: "Failed to get name" }
    }

    //Update the record if it exists; otherwise, create a new one.

    await prisma.user.upsert({
        where: {
            clerkId: userId
        },
        create: {
            clerkId: userId,
            email: email,
            name: name,
            imageUrl: clerkUser!.imageUrl
        },
        update: {
            email: email,
            name: name,
            imageUrl: clerkUser!.imageUrl,
        }
    })

}

export async function getCurrentUser() {
 try {
    const user = await currentUser()

    if(!user){

    }

    const dbUser = await prisma.user.findUnique({
        where : {
            clerkId : user?.id
        } , 
        select : {
            id : true ,
            email : true ,
            name : true ,
            imageUrl : true,
        }
    })

    if(!dbUser){
        throw new Error("No user was found ")
    }

    return dbUser


 } catch (error) {
     console.error("❌ Error fetching current user:", error);
      return null;
 }
}