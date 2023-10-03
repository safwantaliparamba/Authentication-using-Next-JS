"use client"

import { APIResponse } from '@/types/api'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'


function SignIn() {
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
        axios
            .post("/api/v1/sign-in/", { ...inputs })
            .then((res) => {
                const { StatusCode, data }:APIResponse<null> = res.data

                console.log(res.data)
            })
            .then((err: any) => {
                console.log(err)
            })
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
                    onClick={onSubmit}
                >
                    Submit
                </button>
                <p className="text-center mt-6 text-[14px]">Dont have an account? <Link href="/sign-up">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default SignIn