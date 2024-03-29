'use client'

import { useRouter } from "next/navigation"
import MenuItem from "./MenuItem"
import { CircleStackIcon, ArrowLeftOnRectangleIcon, BuildingStorefrontIcon, TrophyIcon, NewspaperIcon, ExclamationCircleIcon, EyeSlashIcon, MinusCircleIcon, ArrowPathIcon, TruckIcon, UserIcon, MagnifyingGlassIcon, LifebuoyIcon, MegaphoneIcon, KeyIcon, ArrowTrendingUpIcon, LockClosedIcon, Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'


const MenuItemList = ({ logoutUser, setToggleMenu }) => {
  const router = useRouter()

  return (
    <>
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
      <MenuItem label="Saved Adds" onClick={() => {router.push('/myolx/saved/adds?tab=adds'), setToggleMenu(false)}} icon={<NewspaperIcon className="w-6 h-6" />} />
      <MenuItem label="Saved Users" onClick={() => {router.push('/myolx/saved/users?tab=users'), setToggleMenu(false)}} icon={<UserIcon className="w-6 h-6" />} />
      <MenuItem label="Saved Searches" onClick={() => {router.push('/myolx/saved/searches?tab=searches'), setToggleMenu(false)}} icon={<MagnifyingGlassIcon className="w-6 h-6" />} />
      <h1 className="bg-gray-100 p-3 my-1 text-xs">OTHER LINKS</h1>
      <MenuItem label="OLX shops" onClick={() => {}} icon={<BuildingStorefrontIcon className=" bg-red-600 rounded-md text-white p-1 w-6 h-6"/>} />
      <MenuItem label="User Support" onClick={() => {}} icon={<LifebuoyIcon className="w-6 h-6" />} />
      <MenuItem label="Activate OLX Pro" onClick={() => {}} icon={<KeyIcon className="w-6 h-6" />} />
      <MenuItem label="Marketing" onClick={() => {}} icon={<ArrowTrendingUpIcon className="w-6 h-6" />} />
      <MenuItem label="Blocked Users" onClick={() => {}} icon={<LockClosedIcon className="w-6 h-6" />} />
      <MenuItem label="Settings" onClick={() => {}} icon={<Cog8ToothIcon className="w-6 h-6" />} />
      <MenuItem label="Logout" onClick={() => logoutUser()} icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />} />
    </>
  )
}

export default MenuItemList;