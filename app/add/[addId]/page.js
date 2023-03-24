'use client'

import React from 'react'
import CarsDetails from './CarsDetails';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import MobileDetails from './MobileDetails';


const page = ({ params }) => {
  const id = params.addId
  const [details] = useDocumentData(doc(db, "products", id))

  return (
    <div>
      {details?.category === "Cars" ? <CarsDetails id={params.addId} />
      : details?.category === "Mobile Phones" ? <MobileDetails id={params.addId} details={details} />
      : "Not constructed yet" }
      
    </div>
  )
}

export default page