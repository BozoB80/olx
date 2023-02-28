'use client'

import { useState, useEffect } from 'react'
import CarsFilter from './carsComponents/CarsFilter'
import CarsList from './carsComponents/CarsList'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'

const CarsDisplay = () => {
  const [adds, setAdds] = useState([])

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
      });
      
    } catch (error) {
      console.log('No adds displayed');
    }
  }

  useEffect(() => {
    getAdds()
  }, [])
  
  
  return (
    <section>
      <div className='flex flex-col w-full'>        
        <CarsFilter />
        <CarsList adds={adds} />
      </div>      
    </section>
  )
}

export default CarsDisplay
