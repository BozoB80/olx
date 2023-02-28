'use client'

import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

const CarsDetails = ({id}) => {
  const [details] = useDocumentData(doc(db, "products", id))
  console.log(details);
    
  return (
    <div className='bg-[#f1f4f5] w-full py-10 justify-center flex'>
      <div className='w-[1180px] flex flex-col space-y-4'>
        {/* Main details */}
        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <div className='flex flex-col w-full space-y-3'>
            <h1 className='text-2xl uppercase'>{details?.title}</h1>
            <h1 className='text-3xl font-bold'>{details?.price} EUR</h1>
            <p>{details?.category}</p>
            <Image 
              src={details?.imageURL}
              alt={details?.title}
              width={500}
              height={500}
              className='w-full h-[550px] object-contain'
            />
          </div>       
        </div>

        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <p>Something</p>
        </div>

        <h1>Details here</h1>
      </div>
    </div>
  )
}

export default CarsDetails