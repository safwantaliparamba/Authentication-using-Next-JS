import { APIResponse } from "@/types/api";
import { NextResponse,NextRequest } from "next/server"
 

export const POST = async (request: NextRequest)=>{
    let response_data: APIResponse<null> ;
    const reqBody = await request.json()

    console.log(reqBody);

    response_data = {
        StatusCode: 6000,
        data:{
            title:"Success",
        }
    }

    return NextResponse.json(response_data)
}