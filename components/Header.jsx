'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import logo from '../assets/logo.svg'
import Link from "next/link"
import { ChevronDownIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, CircleStackIcon, XMarkIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline'
import SearchBar from "./SearchBar";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setActiveUser, removeActiveUser } from "@/redux/slice/authSlice"


const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const logoutUser = () => {
    signOut(auth).then(() => {
        console.log("Sign-out successful")
        router.push('/')
        localStorage.clear()
      }).catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        const uid = user.uid;
        setUserName(user.displayName)

        dispatch(setActiveUser({
          email: user.email,
          userName: user.displayName,
          userID: user.uid,
        }))
        
      } else {
        // User is signed out
        setUserName('')
        dispatch(removeActiveUser())
      }
    });
  }, [])
  


  return (
    <>
    <header className="hidden sm:flex flex-col w-full p-4">
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

            {!userName ? (
            <div className="flex justify-center items-center">
              <div className="font-semibold">
                <Link href="/auth/login" className=" mr-2">{userName ? userName : "Sign In"}</Link>
                <Link href="/auth/register" className="border-l border-gray-400 pl-2">Registration</Link>
              </div>
            </div>
            ) : (
            <div className="relative flex">
              <div className="flex justify-center items-center gap-3">
                <Link href="/">
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                </Link>
                <button type="button" className="flex pl-2 gap-2 border-l border-gray-400">
                  <CircleStackIcon className="h-6 w-6"  />
                  <p className="px-1 rounded-sm bg-orange-300">56</p>
                </button>
                <div className="flex justify-center items-center pl-2 gap-3 border-l border-gray-400">
                  <UserCircleIcon className="h-10 w-10"  />
                  <button type="button">{userName}</button>
                  <button type="button" onClick={() => setToggleMenu(true)}><Bars3Icon className="h-6 w-6" /></button>
                </div>
              </div>

              {toggleMenu && (
                <div className="absolute right-0 top-0 h-screen border-l bg-white p-3 z-50 w-[350px]">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className=" text-xl font-bold">My OLX</h1>
                    <button type="button" onClick={() => setToggleMenu(false)}><XMarkIcon className="w-8 h-8" /></button>
                  </div>
                  <div onClick={logoutUser} className="flex gap-2 p-1 hover:bg-black hover:text-white hover:cursor-pointer">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <h1 className="font-semibold">Logout</h1>
                  </div>
                </div>
              )}
              </div>
            )}

          </div>
        </div>
      </div>

      <div>
        <SearchBar />
      </div> 
    </header>

                {/* Small navbar */}
    <header className="flex sm:hidden justify-center items-center gap-4 p-3 w-full">
      <Link href="/">
        <Image 
          src={logo}
          alt="logo"
          width={42}
          height={42}
        />
      </Link>
      <SearchBar />               
    </header>
    </>
  )
}

export default Header
