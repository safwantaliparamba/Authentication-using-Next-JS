import mongoose from "mongoose";


export const connect = async ()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URI!)

        const connection = mongoose.connection

        connection.on("connection",()=>{
            console.log("Database connected successfully");
        })

        connection.on("error",(err)=>{
            console.log("Database connection failed",err);
            process.exit()
        })

    } catch (e: any){
        console.log("Database connection failed due to",e);
    }
}