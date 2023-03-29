"use client";

import Image from "next/image";
import olxMale from "../../../assets/olx-male.svg";
import { ChatBubbleLeftIcon, ChevronDownIcon, ChevronUpIcon, HeartIcon, MapPinIcon, NoSymbolIcon, PhoneIcon } from "@heroicons/react/24/outline";
import medal1 from "../../../assets/medal1.png";
import medal2 from "../../../assets/medal2.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "@/redux/slice/authSlice";
import { auth } from "@/firebase";

const Profile = ({ name }) => {
  const [toggleInfo, setToggleInfo] = useState(false)
  const user = useSelector(selectUserName)


  return (
    <div className="w-full p-5">
      <div className="flex flex-col w-1/6">
        <div className="flex gap-3">
          <Image
            src={olxMale}
            alt="avatarphoto"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center text-sm">
            <p>{name}</p>
            <div className="flex gap-2">
              <MapPinIcon className="w-5 h-5" />
              <p>User region</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Image src={medal1} alt="medal1" width={25} height={25} />
          <Image src={medal2} alt="medal2" width={25} height={25} />
        </div>

        <div className="flex bg-white py-5 gap-3 rounded-[4px]">
          <button className="flex w-full justify-center text-sm font-semibold gap-2 border border-black hover:border-4 rounded-[4px] p-3">
            <PhoneIcon className="w-5 h-5" />
            <p>Phone</p>
          </button>
          <button className="flex w-full justify-center text-sm font-semibold gap-2 border border-black hover:border-4 rounded-[4px] p-3">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <p>Message</p>
          </button>
        </div>

        <div className="relative">
          {!toggleInfo && (
            <div onClick={() => setToggleInfo(true)} className="flex justify-between">
              <h1>Information</h1>
              <ChevronDownIcon className="w-5 h-5 cursor-pointer" />
            </div>
          )}

          {toggleInfo && (
            <>
              <div onClick={() => setToggleInfo(false)} className="flex justify-between">
                <h1>Information</h1>
                <ChevronUpIcon  className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="absolute top-10 left-0 w-full">
                <div className="flex flex-col text-sm ">
                  <div className="flex justify-between items-center">
                    <p>Registered</p>
                    <p>{user}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>OLX ID</p>
                    <p>{auth?.currentUser.uid}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Online</p>
                    <p>an hour ago</p>
                  </div>                  
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col space-y-3 py-3">
            <HeartIcon className="w-8 h-8 cursor-pointer" />
            <button className="flex w-full justify-center text-sm font-semibold gap-2 border border-black hover:border-4 rounded-[4px] p-3">
              <NoSymbolIcon className="w-5 h-5" />
              <p>Block user</p>
            </button>
          </div>          
        </div>
      </div>

      
    </div>
  );
};

export default Profile;
