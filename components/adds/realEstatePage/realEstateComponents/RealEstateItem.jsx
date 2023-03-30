import { getTimeAgo } from '@/utils/dateUtils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RealEstateItem = ({add, grid}) => {
  const createdAt = add.createdAt.toDate();
  const timeAgo = getTimeAgo(createdAt);

  return (
    <div>
      <Link href={`/add/${add.id}`} key={add.id} className={`w-full flex ${grid && 'flex-col h-[270px]'} shadow-md h-[100px] rounded-md bg-white cursor-pointer`}>
          <Image 
            src={add.imageURL}
            alt={add.title}
            width={300}
            height={300}
            className={`object-cover ${grid && 'w-[274px] h-[160px] rounded-t-md'} w-[100px] h-[100px] rounded-l-md `}
          />
          <div className="flex flex-1 flex-col w-full overflow-hidden gap-2 p-2">
            <h1 className="pb-2 truncate">{add.title}</h1>
            <div className="flex gap-2">
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.type}</p>
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.furnished}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xs">
                {timeAgo}
              </h1>
              <p className="font-semibold">{add.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</p>
            </div>
          </div>
        </Link>     
    </div>
  )
}

export default RealEstateItem