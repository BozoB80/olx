'use client'

import { useEffect, useState } from "react"
import { Bars3Icon, ChatBubbleLeftIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "@/redux/slice/authSlice"
import PublishAdd from "./PublishAdd"
import { debounce } from "@/utils/debounce"

const FooterNav = () => {
  const [publish, setPublish] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  const loggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()

  const publishAdd = () => {
    loggedIn ? setPublish(true) : router.push('/auth/login')
  }

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  return (
    <section className="flex sm:hidden">
      <div className={`flex fixed ${visible ? 'bottom-0 z-50' : '-bottom-50 -z-10'} bg-white shadow-black shadow-xl w-full justify-around items-center py-2`}>
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
        <div className="flex flex-col justify-center items-center">
          <UserIcon className="w-5 h-5" />
          <p className="text-xs">Profile</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Bars3Icon className="w-5 h-5" />
          <p className="text-xs">My OLX</p>
        </div>
      </div>

      {publish && <PublishAdd setPublish={setPublish} />}
    </section>
  )
}

export default FooterNav