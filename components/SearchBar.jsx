'use client'

import { useState } from "react"
import { FolderPlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { selectCategories } from "@/redux/slice/categorySlice"
import Image from "next/image"
import ostalo from '../assets/ostalo.svg'
import { useRouter } from "next/navigation"
import { selectIsLoggedIn } from "@/redux/slice/authSlice"


const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [publish, setPublish] = useState(false)
  const categoryList = useSelector(selectCategories)
  const loggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()



  return (
    <div className='relative flex justify-between items-center w-full gap-5 mt-5'>
      <form
       className="flex justify-center items-center border-2 border-gray-200 w-full p-3 rounded-md shadow-md"
      >
        <div className="mr-3">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search'
          className="w-full focus:outline-none"
        />
        {search ? <button onClick={() => setSearch('')}><XMarkIcon className="h-6 w-6" /></button> : ''}
        
      </form> 
      <button 
        type="button"
        onClick={() => setPublish(true)}
        className="flex justify-center items-center gap-2 h-14 w-60 bg-black text-white py-2.5 px-8 rounded-md"
      >
        <FolderPlusIcon className="h-6 w-6" />
        <h1>Publish Add</h1>
      </button>

      {publish && (
        <div className="absolute -top-20 -left-5 right-0 bottom-0 w-screen h-screen bg-slate-400/50">
          <div className="absolute inset-1/3 w-[550px] h-[550px] bg-white rounded-md">
            <div className="flex flex-col w-full justify-center items-center p-3">
              <div className="flex w-full justify-between items-center">
                <h1 className="text-xl">Publish add</h1>
                <button type="button" onClick={() => setPublish(false)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 mt-5 gap-5 w-full pb-8 border-b">
                {categoryList.slice(1, 5).map((category) => (
                  <div onClick={() => router.push(`/publish/${category.name}`)} key={category.id} className="flex w-full justify-items-start items-center cursor-pointer">
                    <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-16 h-16 rounded-full">
                      <Image 
                        src={category.imageURL}
                        alt="imagecat"
                        width={50}
                        height={50}
                        className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                      />  
                    </div>
                    <h1 className="pl-5">{category.name}</h1>
                  </div>
                ))}
              </div>
              <div className=" flex w-full justify-start items-center my-5">
                <div className="flex justify-center items-center border w-16 h-16 rounded-full">
                  <Image 
                    src={ostalo}
                    alt="ostalo"
                    width={40}
                    height={40}
                    className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"
                  />  
                </div>
                <h1 className="pl-5">Publish something else</h1>
              </div>

              <div className="bg-gray-100 w-full rounded-md mb-3">
                <div className="flex flex-col p-2">
                  <h1 className="text-xl font-semibold mb-3">Remaining number of ads</h1>
                  <div className="flex justify-between items-center">
                    <h1>Cars</h1>
                    <h1 className="font-semibold">0 of 3</h1>                    
                  </div>
                  <div className="flex justify-between items-center">
                    <h1>Real estates</h1>
                    <h1 className="font-semibold">0 of 2</h1>                    
                  </div>
                  <div className="flex justify-between items-center">
                    <h1>Other</h1>
                    <h1 className="font-semibold">1 of 85</h1>                    
                  </div>
                </div>                
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md">
                Become OLX pro
              </button>
            </div>
          </div>
        </div>
        )} 
    </div>
  )
}

export default SearchBar
