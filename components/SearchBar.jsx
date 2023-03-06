'use client'

import { useState } from "react"
import { FolderPlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { selectIsLoggedIn } from "@/redux/slice/authSlice"
import PublishAdd from "./PublishAdd"


const SearchBar = () => {
  const [search, setSearch] = useState('')
  const [publish, setPublish] = useState(false)

  const loggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()

  const publishAdd = () => {
    loggedIn ? setPublish(true) : router.push('/auth/login')
  }

  return (
    <div className='relative flex justify-between items-center w-full sm:gap-5 sm:mt-5'>
      <form
       className="flex justify-center bg-gray-100 sm:bg-white items-center border-2 border-gray-200 w-full p-3 rounded-md shadow-md"
      >
        <div className="mr-3">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search'
          className="w-full focus:outline-none bg-gray-100 sm:bg-white"
        />
        {search ? <button onClick={() => setSearch('')}><XMarkIcon className="h-6 w-6" /></button> : ''}
        
      </form> 
      <button 
        type="button"
        onClick={publishAdd}
        className="hidden sm:flex justify-center items-center gap-2 h-14 w-60 bg-black text-white py-2.5 px-8 rounded-md"
      >
        <FolderPlusIcon className="h-6 w-6" />
        <h1>Publish Add</h1>
      </button>

      {publish && <PublishAdd setPublish={setPublish} />}

    </div>
  )
}

export default SearchBar
