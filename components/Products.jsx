'use client'

import Image from "next/image";
import Link from "next/link";
import { getTimeAgo } from "@/utils/dateUtils";
import { motion } from "framer-motion";
import { slideAnimation } from "@/utils/motion";
import useFetchCollection from "@/customHooks/useFetchCollection";

const Products = () => {
  const { data } = useFetchCollection('products')

  return (
    <div className="bg-[#f1f4f5] w-full p-2 sm:p-5 grid gap-2 sm:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {data?.map((add) => {
        
        const createdAt = add.createdAt.toDate();
        const timeAgo = getTimeAgo(createdAt);
        const furnished = add.furnished === true ? 'Furnished' : 'Not furnished'

        return (
        <motion.div {...slideAnimation('up')}>
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
                <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm capitalize">{add.fuel || add.type || add.state}</p>
                <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.mileage || add.ram || furnished}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs">
                  {timeAgo}
                </h1>
                <p className="font-semibold text-sm sm:text-base">{add.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</p>
              </div>
            </div>
          </Link>
        </motion.div>
      )})}
    </div>
  )
}

export default Products