'use client'

import { db } from '@/firebase'
import { collection, doc, getDoc, orderBy, query } from 'firebase/firestore'
import { useState } from 'react'

const TestCategories = () => {
  const [categories, setCategories] = useState([])

  const getCategories = () => {

    try {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, orderBy("createdAt", "desc"));
      
      const docRef = doc(db, "cities", "SF");
      const docSnap = getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      
    } catch (error) {
      
    }
  }

  return (
    <div>
      
    </div>
  )
}

export default TestCategories
