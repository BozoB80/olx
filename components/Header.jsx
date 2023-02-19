'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import logo from '../assets/logo.svg'
import Link from "next/link"
import { ChevronDownIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, CircleStackIcon } from '@heroicons/react/24/outline'
import SearchBar from "./SearchBar";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"


const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()

  const logoutUser = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful")
        router.push('/')
      }).catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const uid = user.uid;
        console.log(user)
        setUserName(user.displayName)
        
      } else {
        // User is signed out
        setUserName('')
      }
    });
  }, [])
  


  return (
    <header className="flex flex-col w-full p-4">

      <div className="flex">
        <div className="flex w-full">
          <Link href="/">
            <Image 
              src={logo}
              alt="logo"
              width={70}
              height={70}
            />
          </Link>
          <div className="flex w-full justify-between mx-auto">
            <div className="flex justify-between items-center ml-5 text-sm font-semibold gap-5">
              <Link href="/">Shops</Link>
              <Link href="/">Marketing</Link>
              <Link href="/">Blog</Link>
              <Link href="/">Create Add</Link>
              <Link href="/" className="flex">
                Other
                <ChevronDownIcon className="h-6 w-6" />
              </Link>
            </div>

            <div className="flex justify-center items-center">
              <div className="font-semibold">
                <Link href="/auth/login" className=" mr-2">{userName ? userName : "Sign In"}</Link>
                <Link href="/auth/register" className="border-l border-gray-400 pl-2">Registration</Link>
              </div>
            </div>


            {/* <div className="flex justify-center items-center gap-3">
              <Link href="/">
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              </Link>
              <button type="button" className="flex pl-2 gap-2 border-l border-gray-400">
                <CircleStackIcon className="h-6 w-6"  />
                <p className="px-1 rounded-sm bg-orange-300">56</p>
              </button>
              <div className="flex pl-2 gap-2 border-l border-gray-400">
                <UserCircleIcon className="h-6 w-6"  />
                <h2>My Account</h2>
                <ChevronDownIcon className="h-6 w-6" />
              </div>
            </div> */}

          </div>
        </div>
      </div>

      <div>
        <SearchBar />
      </div>
      
      
    </header>
  )
}

export default Header
