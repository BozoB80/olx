'use client'

import { db } from "@/firebase"
import { collection } from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChildrenList from "./ChildrenList"
import { useState } from "react"
import { MapPinIcon } from "@heroicons/react/24/outline"

const Cars = () => {
  const query = collection(db, "cars")
  const [docs, loading, error] = useCollectionData(query)
  const [toggleLocation, setToggleLocation] = useState(false)
  const [region, setRegion] = useState('')
  const [year, setYear] = useState(Number)

  const handleLocation = () => {
    setToggleLocation(prev => !prev)
  }

  return (
    <div className="flex justify-center pt-10 w-full bg-gray-100 h-screen">
      <div className="w-[800px] h-[600px] bg-white rounded-md px-3 pt-6">
        <form
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full">
            <h1 className="text-2xl text-center font-normal mb-4">Make and Model</h1>
            <label htmlFor="make" className="uppercase text-xs font-semibold">Manufacturer</label>
            <select 
              id="make"
              required
               className="w-full bg-gray-100 rounded-md p-3" 
            > 
              {docs?.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>

            <label htmlFor="model" className="uppercase text-xs font-semibold">Model</label>
            <select 
              id="model"
              required
               className="w-full bg-gray-100 rounded-md p-3" 
            > 
              {docs?.map((doc) => (
                <ChildrenList key={doc.id} path={`cars/${doc.name}/model`} />
              ))}
            </select>

            <div className="w-full my-4">
              <h1 className="uppercase text-xs font-semibold">LOCATION</h1>
              <div className="flex space-x-4">
                {!toggleLocation ? (
                  <input  
                    type="text"
                    placeholder="Posušje"
                    disabled
                    className="w-full rounded-md px-3 py-3 outline-none"
                  />
                ) : (
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    id="region" 
                    className="w-full bg-gray-100 rounded-md px-3 py-3 outline-none"
                  >
                    <option defaultValue disabled>Choose region</option>
                    <option disabled className="text-red-400">Federation BiH</option>
                    <option>West Herzegowina</option>
                    <option disabled className="text-red-400">Srpska</option>
                    <option>Banjalučka</option>
                    <option>Ouside of B&H</option>
                  </select>
                )}
                <button 
                  type="button"
                  value={toggleLocation}
                  onClick={handleLocation}
                  className="w-full py-3 border-2 border-black rounded-md flex justify-center items-center"
                >
                  <MapPinIcon className="w-6 h-6" />
                  <h1>{!toggleLocation ? "Change location" : "Back to the registered location"}</h1>
                </button>
              </div>
              <div className="w-full my-4 flex space-x-4">
                <div className="flex w-full flex-col">
                  <h1 className="uppercase text-xs font-semibold">Availability</h1>
                  <div className="flex justify-between items-center gap-4">
                    <button 
                      type="button"
                      className="w-full py-3 border-2 text-sm border-gray-400 text-gray-400 focus:border-black focus:text-black focus:bg-gray-200 rounded-md flex justify-center items-center"
                    >
                      <h1>Available immediately</h1>
                    </button>
                    <button 
                      type="button"
                      className="w-full py-3 border-2 text-sm border-gray-400 text-gray-400 focus:border-black focus:text-black focus:bg-gray-200 rounded-md flex justify-center items-center"
                    >
                      <h1>Not available now</h1>
                    </button>
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <h1 className="uppercase text-xs font-semibold">State</h1>
                  <div className="flex justify-between items-center gap-4">
                    <button 
                      type="button"
                      className="w-full py-3 border-2 text-sm border-gray-400 text-gray-400 focus:border-black focus:text-black focus:bg-gray-200 rounded-md flex justify-center items-center"
                    >
                      <h1>New</h1>
                    </button>
                    <button 
                      type="button"
                      className="w-full py-3 border-2 text-sm border-gray-400 text-gray-400 focus:border-black focus:text-black focus:bg-gray-200 rounded-md flex justify-center items-center"
                    >
                      <h1>Used</h1>
                    </button>
                  </div>
                </div>                
              </div>

              <div className="w-full mt-5 flex flex-col">
                <h1 className="uppercase text-xs font-semibold">Price</h1>
                <div className="flex space-x-8 w-full justify-between items-center">
                  <div className="flex w-full items-center justify-center">
                    <input 
                      type="text"
                      className="w-full bg-gray-100 rounded-l-md p-3 outline-none"
                    />
                    <h1 className="uppercase bg-gray-100 rounded-r-md border-l border-gray-300 text-xs p-4 font-semibold">EUR</h1>
                  </div>

                  <h1 className="uppercase bg-gray-100 p-4 rounded-full text-xs font-semibold">OR</h1>

                  <button 
                      type="button"
                      className="w-full py-3 text-sm bg-gray-100 text-black focus:border-2 focus:border-black rounded-md flex justify-center items-center"
                    >
                      <h1>Price on inquiry</h1>
                  </button>
                </div>
              </div>       
            </div>

            <div className="w-full">
              <div className="flex justify-start items-center gap-10">
                <div className="flex flex-col w-full">
                  <h1 className="uppercase text-xs font-semibold">title</h1>
                  <input 
                      type="text"
                      className="w-full bg-gray-100 rounded-l-md p-3 outline-none"
                    />
                </div>
                <div className="flex flex-col w-full">
                  <h1 className="uppercase text-xs font-semibold">Production year</h1>
                  <select 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)}
                    id="region" 
                    className="w-full bg-gray-100 rounded-md px-3 py-3 outline-none"
                  >
                    <option defaultValue disabled>Choose year</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>                    
                  </select>
                </div>

              </div>
                  
            </div>      

          </div>        
        </form>
      </div>      
    </div>
  )
}

export default Cars
