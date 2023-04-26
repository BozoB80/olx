'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import logo from '../assets/logo.svg'
import Link from "next/link"
import { ChevronDownIcon, UserCircleIcon, ChatBubbleBottomCenterTextIcon, CircleStackIcon, XMarkIcon, ArrowLeftOnRectangleIcon, Bars3Icon, BuildingStorefrontIcon, TrophyIcon, NewspaperIcon, ExclamationCircleIcon, EyeSlashIcon, MinusCircleIcon, ArrowPathIcon, TruckIcon, UserIcon, MagnifyingGlassIcon, LifebuoyIcon, MegaphoneIcon, KeyIcon, ArrowTrendingUpIcon, LockClosedIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import SearchBar from "./SearchBar";
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setActiveUser, removeActiveUser } from "@/redux/slice/authSlice"
import { toast } from "react-hot-toast"
import MenuItem from "./navbar/MenuItem"


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
                  <Link href={`/profile/${auth.currentUser.uid}`} className="flex gap-3">
                    <UserCircleIcon className="h-10 w-10"  />
                    <button type="button">{userName}</button>
                  </Link>
                  <button type="button" onClick={() => setToggleMenu(true)}><Bars3Icon className="h-6 w-6" /></button>
                </div>
              </div>

              {toggleMenu && (
                <div className="absolute right-0 top-0 h-screen border-l bg-white p-3 z-50 w-[350px]">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className=" text-xl font-bold">My OLX</h1>
                    <button type="button" onClick={() => setToggleMenu(false)}><XMarkIcon className="w-8 h-8" /></button>
                  </div>
                  <MenuItem label="OLX CREDIT" onClick={() => {}} icon={<CircleStackIcon className="w-6 h-6"/>} />
                  <MenuItem label="Register OLX shop" onClick={() => {}} icon={<BuildingStorefrontIcon className=" bg-red-600 rounded-md text-white p-1 w-6 h-6"/>} />
                  <h1 className="bg-gray-100 p-3 my-1 text-xs">MY ADDS</h1>
                  <MenuItem label="Active adds" onClick={() => {router.push(`/profile/${auth.currentUser.uid}`), setToggleMenu(false)}} icon={<MegaphoneIcon className="w-6 h-6" />} />
                  <MenuItem label="Ended adds" onClick={() => {}} icon={<NewspaperIcon className="w-6 h-6" />} />
                  <MenuItem label="Non-active adds" onClick={() => {}} icon={<ExclamationCircleIcon className="w-6 h-6" />} />
                  <MenuItem label="Hidden adds" onClick={() => {}} icon={<EyeSlashIcon className="w-6 h-6" />} />
                  <MenuItem label="Expired adds" onClick={() => {}} icon={<MinusCircleIcon className="w-6 h-6" />} />
                  <MenuItem label="Renewable adds" onClick={() => {}} icon={<ArrowPathIcon className="w-6 h-6" />} />
                  <MenuItem label="Promotions" onClick={() => {}} icon={<TrophyIcon className="w-6 h-6" />} />
                  <MenuItem label="Orders" onClick={() => {}} icon={<TruckIcon className="w-6 h-6" />} />
                  <h1 className="bg-gray-100 p-3 my-1 text-xs">SAVED</h1>
                  <MenuItem label="Saved Adds" onClick={logoutUser} icon={<NewspaperIcon className="w-6 h-6" />} />
                  <MenuItem label="Saved Users" onClick={logoutUser} icon={<UserIcon className="w-6 h-6" />} />
                  <MenuItem label="Saved Searches" onClick={logoutUser} icon={<MagnifyingGlassIcon className="w-6 h-6" />} />
                  <h1 className="bg-gray-100 p-3 my-1 text-xs">OTHER LINKS</h1>
                  <MenuItem label="OLX shops" onClick={() => {}} icon={<BuildingStorefrontIcon className=" bg-red-600 rounded-md text-white p-1 w-6 h-6"/>} />
                  <MenuItem label="User Support" onClick={logoutUser} icon={<LifebuoyIcon className="w-6 h-6" />} />
                  <MenuItem label="Activate OLX Pro" onClick={logoutUser} icon={<KeyIcon className="w-6 h-6" />} />
                  <MenuItem label="Marketing" onClick={logoutUser} icon={<ArrowTrendingUpIcon className="w-6 h-6" />} />
                  <MenuItem label="Blocked Users" onClick={logoutUser} icon={<LockClosedIcon className="w-6 h-6" />} />
                  <MenuItem label="Settings" onClick={logoutUser} icon={<Cog8ToothIcon className="w-6 h-6" />} />
                  <MenuItem label="Logout" onClick={logoutUser} icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} />
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
