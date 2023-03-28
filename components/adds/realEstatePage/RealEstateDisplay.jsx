'use client'

import { useState, useEffect } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

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
    <div>RealEstateDisplay</div>
  )
}

export default RealEstateDisplay