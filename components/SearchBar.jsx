'use client'

import { useState } from "react"
import { FolderPlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { selectIsLoggedIn } from "@/redux/slice/authSlice"
import PublishAdd from "./PublishAdd"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { db } from "@/firebase"
import Link from "next/link"
import Image from "next/image"


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchData, setSearchData] = useState(null);
  const [publish, setPublish] = useState(false)
  const [allAdds] = useCollectionData(collection(db, "/products"),
  {snapshotListenOptions: { includeMetadataChanges: true }})


  const loggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()

  const publishAdd = () => {
    loggedIn ? setPublish(true) : router.push('/auth/login')
  }

  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    const filteredAdds = allAdds?.filter((add) =>
      add.title && add.description.toLowerCase().includes(term.toLowerCase())
    )
    setSearchData(filteredAdds)
    console.log(filteredAdds);
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
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='Search'
          className="w-full focus:outline-none bg-gray-100 sm:bg-white"
        />
        {searchTerm ? <button onClick={() => setSearchTerm('')}><XMarkIcon className="h-6 w-6" /></button> : ''}

        {searchData && searchData.length !== 0 ? (
          <div className="absolute w-full top-14 left-0 bg-slate-50 shadow-sm-2 z-[9] p-3">
            {searchData && searchData.map((item) => {
              
              return (
                <Link href="/">
                  <div className="w-full flex items-center py-3">
                    <Image 
                      src={item.imageURL}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="w-14 h-14 object-cover"
                    />
                    <h1 className="ml-3">{item.title}</h1>
                  </div>
                </Link>      
              )
            })}
          </div>
        ) : null}
        
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
