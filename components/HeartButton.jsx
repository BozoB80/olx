'use client'

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as Outline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";

const HeartButton = ({ like, id }) => {
  const [clicked, setClicked] = useState(false)
  const [likedAdds] = useDocumentData(doc(db, "products", id))

  console.log(likedAdds)
  
  const handleLike = () => {
    setClicked(prev => !prev)

    try {
      
    } catch (error) {
      
    }

  }

  return (
    <div onClick={() => setClicked(!clicked)} className="flex justify-center items-center">
      {clicked ?
        <Outline className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110" /> :
        <HeartIcon className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 text-red-600" />
      }
    </div>
  );
}

export default HeartButton;