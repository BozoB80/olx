'use client'

import { useState } from "react"
import { CloseOutlined, PlaylistAdd, SearchOutlined } from "@mui/icons-material"


const SearchBar = () => {
  const [search, setSearch] = useState('')

  return (
    <div className='flex justify-between items-center w-full gap-5 mt-5'>
      <form
       className="flex justify-center items-center border-2 border-gray-200 w-full p-3 rounded-md shadow-md"
      >
        <div className="mr-3">
          <SearchOutlined />
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search for items ex. Audi A3....'
          className="w-full focus:outline-none"
        />
        {search ? <button onClick={() => setSearch('')}><CloseOutlined /></button> : ''}
        
      </form> 
      <button 
          type="button"
          className="flex justify-center items-center gap-2 h-14 w-60 bg-black text-white py-2.5 px-8 rounded-md"
        >
          <PlaylistAdd />
          <h1>Publish Add</h1>
        </button>     
    </div>
  )
}

export default SearchBar
