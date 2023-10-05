"use client"

import { APIResponse } from '@/types/api'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogoutButton = () => {
    const router = useRouter()

    const logoutHandler = async ()=>{
        axios
            .post("/api/v1/sign-out")
            .then((res)=>{
                const { StatusCode }: APIResponse<null> = res.data

                if (StatusCode === 6000){
                    router.push('/sign-in')
                }
            })
            .catch((err: any)=>{
                console.log(err.message);
            })
    }

    return (
        <button 
            className="py-2 px-4 rounded bg-[#6dc7ff] text-[#111] font-bold"
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutButton