'use client'

import { db } from '@/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Image from "next/image"
import { useDispatch } from 'react-redux'
import { storeCategories } from '@/redux/slice/categorySlice'
import Link from 'next/link'


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
    <div className="grid grid-cols-7 sm:flex justify-between items-center sm:w-full px-3 py-4 overflow-x-scroll gap-5 md:gap-0">
      {categories.map((category) => (
      <Link href={`/${category.name}`} key={category.id} className="flex flex-col sm:w-36 justify-center items-center">
        <div style={{ backgroundColor: category.bgColor }} className="flex justify-center items-center border w-12 sm:w-16 h-12 sm:h-16 rounded-full">
          <Image 
            src={category.imageURL}
            alt={category.id}
            width={50}
            height={50}   
            className="object-contain bg-transparent hover:scale-110 transition-all cursor-pointer"       
          />
        </div>
        <h3 className="text-xs sm:text-sm mt-1 w-full text-center truncate">{category.name}</h3>
      </Link>  
      ))}
          
    </div>
  )
}

export default Categories
