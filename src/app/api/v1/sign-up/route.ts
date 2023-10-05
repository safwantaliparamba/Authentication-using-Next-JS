import { connect } from "@/config/dbConfig";
import { User } from "@/models/user";
import { APIResponse } from "@/types/api";
import { NextResponse,NextRequest } from "next/server"
import bcryptjs from "bcryptjs"
 

connect()

export const POST = async (request: NextRequest)=>{
    let response_data: APIResponse<null> ;

    const reqBody = await request.json()

    try {
        const { name, email, password } = reqBody

        const existingUser = await User.findOne({ email, isDeleted:false })

        if (existingUser) {
            response_data = {
                StatusCode: 6001,
                data:{
                    title: "Failed",
                    message: "User already exists"
                }
            }
        }else{
            const salt = await bcryptjs.genSalt(10)
            const encrypted_password = await bcryptjs.hash(password, salt)

            const savedUser = await User.create({
                name,
                email,
                password: encrypted_password,
            })
            
            console.log(savedUser);

            response_data = {
                StatusCode: 6000,
                data:{
                    title: "Success",
                    message: "User created successfully.",
                }
            }
        }
    } catch (error: any) {

        response_data = {
            StatusCode: 6001,
            data:{
                title: "Something went wrong",
                message: error.message
            }
        }
    }

    return NextResponse.json(response_data,{ status:200 })
}