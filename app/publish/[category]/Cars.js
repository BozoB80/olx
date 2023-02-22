'use client'

import { useState } from "react"

const Cars = () => {
  const [make, setMake] = useState('')

  return (
    <div className="flex justify-center pt-10 w-full bg-gray-100 h-screen">
      <div className="w-[800px] h-[600px] bg-white rounded-md px-3 pt-6">
        <form
          className="flex flex-col justify-center items-center"
        >
          <div>
            <h1 className="text-3xl font-normal mb-4">Make and Model</h1>
            <label htmlFor="manufacturer" className="uppercase text-xs font-semibold">Manufacturer</label>
            <select 
              type="email" 
              id="manufacturer"
              autoComplete="manufacturer"
              value={make} 
              onChange={(e) => setMake(e.target.value)} 
              className="w-full bg-gray-200 rounded-sm py-2 px-2" 
            />
          </div>
        </form>
      </div>      
    </div>
  )
}

export default Cars
