'use client'

import { db } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import Image from "next/image";
import { useCollectionData } from "react-firebase-hooks/firestore"



const Products = () => {
  const [adds] = useCollectionData(collection(db, "products"))
  console.log(adds);

  return (
    <div className="w-full p-5 grid grid-cols-2 xl:grid-cols-6">
      {adds?.map((add) => (
        <div key={add.id} className="flex flex-col">
          <Image 
            src={add.imageURL}
            alt={add.title}
            width={300}
            height={300}
          />
          <div className="flex flex-col p-2">
            <h1 className="pb-2">{add.title}</h1>
            <div className="flex gap-3">
              <p className="text-xs border border-black rounded-sm">Diesel</p>
              <p className="text-xs border border-black rounded-sm">Kilometer</p>
            </div>
            <div className="flex">
              <h1>
                
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Products