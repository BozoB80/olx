'use client'

import { useState, useEffect } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import RealEstateList from './realEstateComponents/RealEstateList'
import RealEstateFilter from './realEstateComponents/RealEstateFilter'

const RealEstateDisplay = () => {
  const [adds, setAdds] = useState([])

  const getAdds = () => {
    try {
      const addsRef = collection(db, "products");
      const q = query(addsRef, where("category", "==", "Real Estate"), orderBy("createdAt", "asc"));
      
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
      <div className='flex flex-col sm:flex-row w-full'>        
        <RealEstateFilter />
        <RealEstateList adds={adds} />
      </div>      
    </section>
  )
}

export default RealEstateDisplay