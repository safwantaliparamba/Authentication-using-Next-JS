import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"
import { type } from "os";

export interface TokenDataType {
    id: string,
}
// type DecodedToken = jwt.JwtPayload | string | TokenDataType

export const getDataFromToken = (request: NextRequest): TokenDataType => {
    try {
        const token = request.cookies.get("token")?.value || "";

        const decodedToken: any = jwt.verify(token,process.env.TOKEN_SECRET!)

        return decodedToken

    } catch (error) {
        throw new Error("Something went wrong while fetching the token data")
    }
}