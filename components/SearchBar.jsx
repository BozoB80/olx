'use client'

import { useState } from "react"
import { ArrowRightIcon, FolderPlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { selectIsLoggedIn } from "@/redux/slice/authSlice"
import PublishAdd from "./PublishAdd"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore"
import { db } from "@/firebase"
import Link from "next/link"
import { motion } from "framer-motion"
import { slideIn } from "@/utils/motion"


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchData, setSearchData] = useState(null);
  const [publish, setPublish] = useState(false)
  const [allAdds] = useCollection(collection(db, "/products"),
  {snapshotListenOptions: { includeMetadataChanges: true }})


  const loggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()

  const publishAdd = () => {
    loggedIn ? setPublish(true) : router.push('/auth/login')
  }

  const handleSearchChange = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    const filteredAdds = allAdds?.docs.filter((add) => {
      const {title, description} = add.data()

      return (
        `${title} ${description}`.toLowerCase().includes(term.toLowerCase())
      )
    })
    setSearchData(filteredAdds)
    
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
        {searchTerm ? <button><XMarkIcon onClick={() => setSearchTerm('')} className="h-6 w-6" /></button> : ''}

        {searchData && searchData.length !== 0 ? (
          <motion.div
            variants={slideIn('down', 'tween', 0, 0.5)}
            initial="hidden"
            whileInView="show"
            className="absolute w-full top-14 left-0 bg-slate-50 shadow-xl z-[9] p-3"
          >
            {searchData && searchData.map((item) => {
              const { category, title } = item.data()
              return (
                <Link href={`/add/${item.id}`} onClick={() => {setSearchData(''), setSearchTerm('')}} key={item.id}>
                  <div className="w-full flex items-center py-3">
                    <h1>{category}</h1>
                    <p className="ml-3"><ArrowRightIcon className="w-4 h-4" /></p>
                    <h1 className="ml-3 truncate">{title}</h1>
                  </div>
                </Link>      
              )
            })}
          </motion.div>
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
