import { NextRequest, NextResponse } from "next/server";
import type {APIResponse} from "@/types/api"


export const POST = async (request: NextRequest) => {
    let response_data: APIResponse<null>;
    
    const reqBody = await request.json()
    
    console.log(reqBody);
    

    response_data = {
        StatusCode:6000,
        data:{
            title:"success",
            message:"Success"
        }
    }

    return NextResponse.json(response_data)
}
