"use client"

import { useRouter } from 'next/navigation'
import React from 'react'


const Home = () => {
  const router = useRouter()
  
  return (
    <div className="flex justify-center items-center  h-[100vh]">
      <button 
		className='mr-[20px]' 
	  	onClick={e => router.push("/sign-in")}
	  >
		Login
		</button>
      <button 
		className='' 
	  	onClick={e => router.push("/sign-up")}
	  >
		Signup
		</button>
    </div>
  )
}

export default Home