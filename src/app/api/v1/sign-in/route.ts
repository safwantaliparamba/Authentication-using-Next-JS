import { NextRequest, NextResponse } from "next/server";
import type {APIResponse} from "@/types/api"
import { User } from "@/models/user";
import bcryptjs from "bcryptjs"
import { connect } from "@/config/dbConfig";
import jwt from "jsonwebtoken"


connect()

export const POST = async (request: NextRequest) => {
    let response_data: APIResponse<null>;
    
    const reqBody = await request.json()
    const { email, password } = reqBody;

    const user = await User.findOne({email,isDeleted: false})

    console.log(user);

    if (!user){
        response_data = {
            StatusCode: 6001,
            data:{
                title: "Not Found",
                message: "User not found",
            }
        }
    }else{
        const isMatch = await bcryptjs.compare(password,user.password)

        if (!isMatch){
            response_data = {
                StatusCode: 6001,
                data:{
                    title: "Validation Error",
                    message: "Password is incorrect",
                }
            }
        }else{
            const jwtData = {
                id: user._id,
                name: user.name,
                email: user.email,
            }

            const token = jwt.sign(jwtData,process.env.TOKEN_SECRET!, {
                expiresIn:"2d"
            })

            const response = NextResponse.json({
                StatusCode: 6000,
                data:{
                    title: "Success",
                    message: "Login Success",
                    name: user.name,
                    email: user.email,
                }
            })
            response.cookies.set("token",token,{
                httpOnly: true,
            })

            return response
        }
    }

    return NextResponse.json(response_data)
}
