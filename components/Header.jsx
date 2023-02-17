'use client'

import Image from "next/image"
import logo from '../assets/logo.svg'
import Link from "next/link"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AccountCircleOutlined, ChatOutlined, SavingsOutlined } from "@mui/icons-material";
import SearchBar from "./SearchBar";


const Header = () => {
  return (
    <header className="flex flex-col w-full p-4">

      <div className="flex">
        <div className="flex w-full">
          <Image 
            src={logo}
            alt="logo"
            width={70}
            height={70}
          />
          <div className="flex w-full justify-between mx-auto">
            <div className="flex justify-between items-center ml-5 text-sm font-semibold gap-5">
              <Link href="/">Shops</Link>
              <Link href="/">Marketing</Link>
              <Link href="/">Blog</Link>
              <Link href="/">Create Add</Link>
              <Link href="/">
                Other
                <KeyboardArrowDownIcon />
              </Link>
            </div>
            <div className="flex justify-center items-center gap-3">
              <Link href="/">
                <ChatOutlined />
              </Link>
              <button type="button" className="flex pl-2 gap-2 border-l border-gray-400">
                <SavingsOutlined  />
                <p className="px-1 rounded-sm bg-orange-300">56</p>
              </button>
              <div className="flex pl-2 gap-2 border-l border-gray-400">
                <AccountCircleOutlined  />
                <h2>My Account</h2>
                <KeyboardArrowDownIcon />
              </div>
            </div>
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
