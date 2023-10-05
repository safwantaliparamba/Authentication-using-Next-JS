"use client"

import { APIResponse } from '@/types/api'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


function SignIn() {
    const router = useRouter()

    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.name in inputs) {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }

    const onSubmit = () => {
        try{
            setLoading(true)

            axios
                .post("/api/v1/sign-in/", { ...inputs })
                .then((res) => {
                    const { StatusCode, data }:APIResponse<null> = res.data
                    
                    if (StatusCode === 6000){
                        router.push("/profile")
                    }
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }catch (e: any){
            console.log(e.message);
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className="border  w-[500px]  p-6 rounded">
                <h3 className="text-center text-[22px] mb-[32px]">Sign In</h3>
                <div className="">
                    <input
                        value={inputs.email}
                        onChange={onChange}
                        name='email'
                        type="email"
                        className="w-full text-[#000] p-1 outline-none text-[14px] mb-[20px]"
                        placeholder='Email' />
                </div>
                <div className="">
                    <input
                        onChange={onChange}
                        value={inputs.password}
                        name='password'
                        type="password"
                        className="w-full text-[#000] p-1 outline-none text-[14px] mb-[32px]"
                        placeholder='Password' />
                </div>
                <button
                    className="px-3 py-1 bg-[#7f50ff] text-[#000] w-full rounded font-bold"
                    onClick={!isLoading ? onSubmit : ()=>{}}
                >
                    {isLoading ? "loading" : "Submit"}
                </button>
                <p className="text-center mt-6 text-[14px]">Dont have an account? <Link href="/sign-up">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default SignIn