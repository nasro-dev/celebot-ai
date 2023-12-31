import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function PATCH(req: Request, 
    {params}:{params: {companionID:string}}){
    try{
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryID} = body;
        
        if (!params.companionID){
            return new NextResponse("Companion Id is required", { status: 400})
        }

        if(!user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized", { status: 401});
        }

        if(!src || !name || !description || !instructions || !seed || !categoryID){
            return new NextResponse("Missing required fields", { status: 400});
        }
        
        const companion = await prismadb.companion.update({
            where:{
                id: params.companionID
            },
            data: {
                categoryID,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
            }
        });
        return NextResponse.json(companion)
    }
    catch(error){
        console.log("[COMPANION_PATCH",error)
        return new NextResponse("Internal Error", {status: 500});
    }
}