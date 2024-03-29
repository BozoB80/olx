'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import logo from '../assets/logo.svg'
import Link from "next/link"
import { ChevronDownIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, CircleStackIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import SearchBar from "./SearchBar";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setActiveUser, removeActiveUser } from "@/redux/slice/authSlice"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { slideAnimation } from "@/utils/motion"
import MenuItemList from "./navbar/MenuItemList"



const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const logoutUser = () => {
    signOut(auth).then(() => {
        toast.success("You are signed out")
        router.push('/')
        localStorage.clear()
        setToggleMenu(false)
      }).catch((error) => {
        console.error(error);
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
              <Link href="/" className="flex items-center">
                Other
                <ChevronDownIcon className="h-5 w-5" />
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
                <Link href="/messages">
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                </Link>
                <button type="button" className="flex pl-2 gap-2 border-l border-gray-400">
                  <CircleStackIcon className="h-6 w-6"  />
                  <p className="px-1 rounded-sm bg-orange-300">56</p>
                </button>
                <div className="flex justify-center items-center pl-2 gap-3 border-l border-gray-400">
                  <Link href={`/profile/${auth.currentUser.uid}`} className="flex gap-3">
                    <UserCircleIcon className="h-10 w-10"  />
                    <button type="button">{userName}</button>
                  </Link>
                  <button type="button" onClick={() => setToggleMenu(true)}><Bars3Icon className="h-6 w-6" /></button>
                </div>
              </div>

              {toggleMenu && (
                <motion.div {...slideAnimation('right')} className="absolute right-0 top-0 h-screen border-l bg-white p-3 z-50 w-[350px]">        
                  <MenuItemList logoutUser={logoutUser} setToggleMenu={setToggleMenu} />                  
                </motion.div>
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
