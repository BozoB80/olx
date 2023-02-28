import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CarsItem = ({add, grid}) => {
  return (
    <div>
      <Link href={`/add/${add.id}`} key={add.id} className={`w-full flex ${grid && 'flex-col'} shadow-md h-[270px] rounded-md bg-white cursor-pointer`}>
          <Image 
            src={add.imageURL}
            alt={add.title}
            width={300}
            height={300}
            className="object-cover w-[274px] h-[160px] rounded-t-md"
          />
          <div className={`flex flex-col gap-2 p-2`}>
            <h1 className="pb-2">{add.title}</h1>
            <div className="flex gap-2">
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">Diesel</p>
              <p className="text-[10px] px-0.5 font-semibold border border-black rounded-sm">{add.mileage}</p>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xs">
                2 days ago
              </h1>
              <p className="font-semibold">{add.price} EUR</p>
            </div>
          </div>
        </Link>     
    </div>
  )
}

export default CarsItem
