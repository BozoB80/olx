'use client'

import { useEffect, useState } from "react"
import { Bars3Icon, ChatBubbleLeftIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectUserID, setActiveUser } from "@/redux/slice/authSlice"
import PublishAdd from "./PublishAdd"
import { debounce } from "@/utils/debounce"
import { motion } from "framer-motion"
import { slideIn } from "@/utils/motion"
import MenuItemList from "./navbar/MenuItemList"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase"
import { toast } from "react-hot-toast"


const FooterNav = () => {
  const [publish, setPublish] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  const [toggleMenu, setToggleMenu] = useState(false)
  const loggedIn = useSelector(selectIsLoggedIn)
  const userId = useSelector(selectUserID)
  const router = useRouter()

  const publishAdd = () => {
    loggedIn ? setPublish(true) : router.push('/auth/login')
  }
  
  const isLoggedIn = () => {
    loggedIn ? setToggleMenu(true) : router.push('/auth/login')
  }

  const profileLink = () => {
    loggedIn ? router.push(`/profile/${userId}`) : router.push('/auth/login')
  }
  

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);


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

  return (
    <section className="flex sm:hidden">
      <motion.div 
        variants={slideIn('up', 'spring', 0.2, 0.5)}
        initial="hidden"
        whileInView="show"
        className={`flex fixed ${visible ? 'bottom-0 z-50' : '-bottom-96 -z-50'} bg-white shadow-black shadow-2xl w-full justify-around items-center py-2`}
      >
        <Link href="/" className="flex flex-col justify-center items-center">
          <HomeIcon className="w-5 h-5" />
          <p className="text-xs">Home</p>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <p className="text-xs">Messages</p>
        </div>
        <div onClick={publishAdd} className="flex flex-col justify-center items-center">
          <PlusCircleIcon className="w-5 h-5" />
          <p className="text-xs">Publish</p>
        </div>
        <div onClick={profileLink} className="flex flex-col justify-center items-center">
          <UserIcon className="w-5 h-5" />
          <p className="text-xs">Profile</p>
        </div>
        <div onClick={isLoggedIn} className="flex flex-col justify-center items-center">
          <Bars3Icon className="w-5 h-5" />
          <p className="text-xs">My OLX</p>
        </div>
      </motion.div>

      {toggleMenu && (
        <motion.div 
           variants={slideIn('right', 'tween', 0.2, 0.5)}
           initial="hidden"
           whileInView="show"
           className="absolute right-0 top-0 max-h-fit border-l bg-white p-3 z-50 w-full"
         >
           <MenuItemList logoutUser={logoutUser} setToggleMenu={setToggleMenu} />                  
         </motion.div>
       )}


      {publish && <PublishAdd setPublish={setPublish} />}
    </section>
  )
}

export default FooterNav