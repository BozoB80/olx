import { Bars3Icon, ChatBubbleLeftIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline"
import { PlusCircleIcon } from "@heroicons/react/24/solid"


const FooterNav = () => {
  return (
    <section className="flex sm:hidden">
      <div className="flex fixed bottom-0 z-50 bg-white shadow-black shadow-xl w-full justify-around items-center py-2">
        <div className="flex flex-col justify-center items-center">
          <HomeIcon className="w-5 h-5" />
          <p className="text-xs">Home</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ChatBubbleLeftIcon className="w-5 h-5" />
          <p className="text-xs">Publish</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <PlusCircleIcon className="w-5 h-5" />
          <p className="text-xs">Home</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <UserIcon className="w-5 h-5" />
          <p className="text-xs">Profile</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Bars3Icon className="w-5 h-5" />
          <p className="text-xs">Menu</p>
        </div>
      </div>
    </section>
  )
}

export default FooterNav