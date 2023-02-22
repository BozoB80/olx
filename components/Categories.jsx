'use client'

import { db } from '@/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useDispatch } from 'react-redux'
import { storeCategories } from '@/redux/slice/categorySlice'


const Categories = () => {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()


  const getCategories = () => {
    try {
      const categoriesRef = collection(db, "categories");
      const q = query(categoriesRef, orderBy("createdAt", "asc"));
      
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs)
        const allCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setCategories(allCategories)
        dispatch(storeCategories({
          categories: allCategories
        }))
      });
      
    } catch (error) {
      console.log('No categories displayed');
    }
  }

  useEffect(() => {
    getCategories()
  }, [])
  
  return (
    <div className="flex justify-between items-center w-full px-3 py-4">
      {categories.map((category) => (
      <div key={category.id} className="flex flex-col w-36 justify-center items-center">
        <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-16 h-16 rounded-full">
          <Image 
            src={category.imageURL}
            alt={category.id}
            width={50}
            height={50}   
            className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"       
          />
        </div>
        <h3 className="text-sm mt-1 w-full text-center">{category.name}</h3>
      </div>  
      ))}
          
    </div>
  )
}

export default Categories
