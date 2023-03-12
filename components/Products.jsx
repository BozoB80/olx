'use client'

import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeAdds } from "@/redux/slice/addsSlice";
import { getTimeAgo } from "@/utils/dateUtils";


const Products = () => {
  const [adds, setAdds] = useState([])
  const dispatch = useDispatch()

  const getAdds = () => {
    try {
      const addsRef = collection(db, "products");
      const q = query(addsRef, orderBy("createdAt", "asc"));
      
      onSnapshot(q, (snapshot) => {
        const allAdds = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setAdds(allAdds)
        dispatch(storeAdds({
          adds: allAdds
        }))

        
      });
      
    } catch (error) {
      console.log('No adds displayed');
    }
  }

  useEffect(() => {
    getAdds()
  }, [])


  return (
    <div className="bg-[#f1f4f5] w-full p-2 sm:p-5 grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {adds?.map((add) => {

        const createdAt = add.createdAt.toDate();
        const timeAgo = getTimeAgo(createdAt);

        return (
        <Link href={`/add/${add.id}`} key={add.id} className="flex flex-col h-[270px] rounded-md bg-white cursor-pointer">
          <Image 
            src={add.imageURL}
            alt={add.title}
            width={300}
            height={300}
            className="object-cover w-[274px] h-[160px] rounded-t-md"
          />
          <div className="flex flex-col gap-2 p-2">
            <h1 className="pb-2 truncate">{add.title}</h1>
            <div className="flex gap-2">
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.fuel}</p>
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.mileage}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xs">
                {timeAgo}
              </h1>
              <p className="font-semibold text-sm sm:text-base">{add.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</p>
            </div>
          </div>
        </Link>
      )})}
    </div>
  )
}

export default Products