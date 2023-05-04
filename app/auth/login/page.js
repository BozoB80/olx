'use client'

import { useState } from "react"
import Image from "next/image"
import logo from '../../../assets/logo.svg'
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { slideAnimation } from "@/utils/motion"


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const loginUser = (e) => {
    e.preventDefault()
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        router.push('/')
        toast.success(`Welcome ${user.displayName}`)
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

  }

  return (
    <div className='relative flex justify-center items-center w-full px-3 py-20 mx-auto bg-[#012f34]'>
      <motion.div {...slideAnimation('up')} className='flex flex-col justify-center w-[400px] h-auto items-center rounded-md p-4 z-10 bg-white'>
          <Link href="/">
            <Image 
              src={logo}
              alt="logo"
              width={130}
              height={130}
            />
          </Link>
          <h1 className="w-full items-start text-2xl mb-3">Sign In</h1>
          <form
            onSubmit={loginUser} 
            className="flex flex-col w-full space-y-3"
          >
            <label htmlFor="email" className="uppercase text-xs font-semibold">User Name or Email</label>
            <input 
              type="email" 
              id="email"
              autoComplete="username"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-gray-200 rounded-sm py-2 px-2" 
            />
            <label htmlFor="password" className="uppercase text-xs font-semibold">Password</label>
            <input 
              type="password" 
              id="password"
              autoComplete="current-password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-gray-200 rounded-sm py-2 px-2" 
            />
            <Link href="/auth/reset" className="w-full text-right text-base mb-3">Forgot Password?</Link>

            <button
              type="submit"
              className="w-full items-center py-2 text-white bg-[#012f34] rounded-md"
            >
              Sign In
            </button>
          </form>
          <div className="flex w-full justify-around my-5">
            <h1 className="text-gray-500">No user account?</h1>
            <Link href="/auth/register" className="uppercase font-bold">Register</Link>
          </div>

      </motion.div>
    </div>
  )
}

export default Login