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
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        setData(allData);
        
      });
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data };
};

export default useFetchCollection;