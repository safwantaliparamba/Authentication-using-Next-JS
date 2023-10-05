"use client"

import { APIResponse, Error } from '@/types/api'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


const SignUp = () => {
    const router = useRouter()

    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
    })

    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        if(e.target.name in inputs) {
            setInputs({
                ...inputs,
                [e.target.name]:e.target.value
            })
        }
    }

    const onSignup = ()=>{
        try {
            setLoading(true);
            axios
                .post('/api/v1/sign-up/',{...inputs})
                .then((res)=>{
                    const {StatusCode,data}: APIResponse<null> = res.data

                    if (StatusCode === 6000){
                        router.push("/sign-in")
                    }else{
                        console.log(data?.message);
                        
                        toast(data?.message,{
                            type:"error"
                        })
                    }
                })
                .catch((err: Error)=>{
                    console.log(err.message);
                })   
        } catch (error: any) {
            console.log(error.message);
        }finally{
            setLoading(false)
        }  
    }

    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className="border  w-[500px]  p-6 rounded">
                <h3 className="text-center text-[22px] mb-[32px]">Sign Up</h3>
                <div className="">
                    <input 
                        type="text"
                        className="w-full text-[#000] p-1 outline-none mb-[20px] text-[14px]" 
                        placeholder='Name'
                        name="name"
                        onChange={onChange}
                        value={inputs.name}
                    />
                </div>
                <div className="">
                    <input 
                        type="email"
                        className="w-full text-[#000] p-1 outline-none text-[14px] mb-[20px]" 
                        placeholder='Email'
                        name="email"
                        onChange={onChange}
                        value={inputs.email}
                    />
                </div>
                <div className="">
                    <input 
                        type="password"
                        className="w-full text-[#000] p-1 outline-none text-[14px] mb-[32px]" 
                        placeholder='Password'
                        name="password"
                        onChange={onChange}
                        value={inputs.password}
                    />
                </div>
                <button 
                    className="px-3 py-1 bg-[#7f50ff] text-[#000] w-full rounded font-bold"
                    onClick={!isLoading ? onSignup : ()=>{}}
                >
                    {isLoading ? "loading" : "Submit"}
                </button>
                <p className="text-center mt-6 text-[14px]">Already have an account? <Link href="/sign-in">Sign In</Link></p>
            </div>
        </div>
    )
}

export default SignUp