'use client'

import { useState, useEffect } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import MobilesFilter from './mobilesComponents/MobilesFilter'
import MobilesList from './mobilesComponents/MobilesList'

const MobilesDisplay = () => {
  const [adds, setAdds] = useState([])

  const getAdds = () => {
    try {
      const addsRef = collection(db, "products");
      const q = query(addsRef, where("category", "==", "Mobile Phones"), orderBy("createdAt", "asc"));
      
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
        <MobilesFilter />
        <MobilesList adds={adds} />
      </div>      
    </section>
  )
}

export default MobilesDisplay