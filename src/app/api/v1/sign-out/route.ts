import  { APIResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest)=>{
    let response_data: APIResponse<null>;

    try {
        response_data = {
            StatusCode: 6000,
            data:{
                title: "Success",
                message: "Successfully Logged Out"
            }
        }
        const response = NextResponse.json(response_data)
        response.cookies.set("token","",{
            httpOnly: true,
        })
        return response

    } catch (error: any) {
        response_data = {
            StatusCode: 6001,
            data:{
                title: "Error",
                message: error.message,
            }
        }
    }

    return NextResponse.json(response_data)
}