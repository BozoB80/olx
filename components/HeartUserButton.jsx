"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as Outline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HeartUserButton = ({ id, small }) => {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const userId = useSelector(selectUserID);

  const toggleLike = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    const savedUsersRef = doc(db, "users", userId, "savedUsers", id);
    const savedUsersDoc = await getDoc(savedUsersRef);

    if (savedUsersDoc.exists()) {
      // Remove like if product is already liked
      await deleteDoc(savedUsersRef);
      toast.success("User removed from favorites");
      setClicked(false);
    } else {
      // Add like if product is not already liked
      const newLike = { likedRef: id };
      await setDoc(doc(db, "users", userId, "savedUsers", id), newLike);
      toast.success("You saved user to favorites");
      setClicked(true);
    }
  }

  useEffect(() => {
    const checkLikedStatus = async () => {
      if (!userId) {
        return;
      }
      const savedUsersRef = doc(db, "users", userId, "savedUsers", id);
      const savedUsersDoc = await getDoc(savedUsersRef);
      if (savedUsersDoc.exists()) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    };
    checkLikedStatus();
  }, [userId, id])

  return (
    <div onClick={toggleLike} className="flex justify-center items-center">
      {clicked ? (
        <HeartIcon className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 text-red-600" />
      ) : (
        <Outline className={`w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 ${small ? 'text-white' : ''}`} />
      )}
    </div>
  )
}

export default HeartUserButton;
