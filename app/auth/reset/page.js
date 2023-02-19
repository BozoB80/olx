'use client'

import { useState } from "react"
import Image from "next/image"
import logo from '../../../assets/logo.svg'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import padlock from '../../../assets/padlock.svg'
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase"

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const resetPassword = (e) => {
    e.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div className='relative flex justify-center items-center w-full h-screen mx-auto bg-[#012f34]'>
      <div className='flex flex-col justify-center w-[400px] h-auto items-center rounded-md p-4 z-10 bg-white'>
          <button
            onClick={() => router.back()}
            className="w-full flex"
          >
            <ChevronLeftIcon className="h-6 w-6" />
            <p>Back</p>
          </button>
          <Link href="/">
            <Image 
              src={logo}
              alt="logo"
              width={130}
              height={130}
            />
          </Link>
          <div className="w-full">
            <Image 
                src={padlock}
                alt="padlock"
                width={70}
                height={70}
                className="items-start"
              />
          </div>
          <h1 className="w-full items-start text-2xl mb-3">Forgotten password</h1>

          <form
            onSubmit={resetPassword} 
            className="flex flex-col w-full space-y-3"
          >
            <label htmlFor="email" className="uppercase text-xs font-semibold">Email</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-gray-200 rounded-sm py-2" 
            />

            <p className="w-full text-center">or</p>

            <label htmlFor="text" className="uppercase text-xs font-semibold">Phone number</label>
            <input 
              type="text" 
              id="text" 
              className="w-full bg-gray-200 rounded-sm py-2" 
            />
            

            <button
              type="submit"
              className="w-full items-center py-2 text-white bg-[#012f34] rounded-md"
            >
              Send request
            </button>
          </form>
      </div>
    </div>
  )
}

export default ResetPassword