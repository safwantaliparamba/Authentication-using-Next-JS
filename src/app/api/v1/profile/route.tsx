import { connect } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { User, UserType } from "@/models/user";
import { APIResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";


connect()

export const GET = async (request: NextRequest) => {
    let response_data: APIResponse<UserType> ;
    const { id } = getDataFromToken(request)

    console.log(id);
    
    const user = await User.findOne({ _id: id,isDeleted: false }).select("-password")

    console.log(user);

    if (!user){
        response_data = {
            StatusCode: 6001,
            data:{
                title: "Not Exists",
                message: "User does not exist"
            }
        }
    }else{
        response_data = {
            StatusCode: 6000,
            data:{
                title: "Success",
                data: user
            }
        }
    }
    

    return NextResponse.json(response_data)
}