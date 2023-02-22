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
          <div className="w-full">
            <h1 className="text-2xl text-center font-normal mb-4">Make and Model</h1>
            <label htmlFor="manufacturer" className="uppercase text-xs font-semibold">Manufacturer</label>
            <select 
              id="manufacturer"
              className="w-full bg-gray-100 rounded-md p-2" 
            />
            <label htmlFor="model" className="uppercase text-xs font-semibold">Model</label>
            <select 
              id="model"
              className="w-full bg-gray-100 rounded-md p-2" 
            />
          </div>
          <div className="w-full">
            <div>
              {}
            </div>

          </div>
        </form>
      </div>      
    </div>
  )
}

export default Cars
