'use client'

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/firebase"; 

const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  
  const getCollection = () => {
    
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setData(allData)        
      })
    } catch (error) {
      console.log('No adds displayed')
    }
  }

  useEffect(() => {
    getCollection()
  }, [])

  return { data }
}

export default useFetchCollection;