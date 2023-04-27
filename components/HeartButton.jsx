'use client'

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as Outline } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/slice/authSlice";

const HeartButton = ({ like, id }) => {
  const [clicked, setClicked] = useState(false)
  const [product, setProduct] = useState(null);
  const [likedAddsRef, setLikedAddsRef] = useState(null);
  const userId = useSelector(selectUserID)

  useEffect(() => {
    const docRef = doc(db, "products", id);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    });
  }, [id]);
  
  const toggleLike = async () => {
    // Check if the user is logged in
    if (!userId) {
      toast.error("Please login to like products.");
      return;
    }

    // Check if the product is already liked
    if (product && product.liked) {
      // Remove the product from likedAdds collection in Firestore
      if (likedAddsRef) {
        await deleteDoc(likedAddsRef);
      }
      // Update the product document in Firestore
      await updateDoc(doc(db, "products", id), { liked: false });
      // Update the product state
      setProduct({ ...product, liked: false });
      // Update the clicked state
      setClicked(false);
      toast.success("Product removed from liked list.");
    } else {
      // Add the product to likedAdds collection in Firestore
      if (!likedAddsRef) {
        const likedAddsCollectionRef = collection(
          db,
          "users",
          userId,
          "savedAdds"
        );
        const newLikedAddRef = await addDoc(likedAddsCollectionRef, { productId: id });
        setLikedAddsRef(newLikedAddRef);
      }
      // Update the product document in Firestore
      await updateDoc(doc(db, "products", id), { liked: true });
      // Update the product state
      setProduct({ ...product, liked: true });
      // Update the clicked state
      setClicked(true);
      toast.success("Product added to liked list.");
    }
  };

  return (
    <div onClick={toggleLike} className="flex justify-center items-center">
      {clicked || (product && product.liked) ?
        <HeartIcon className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110 text-red-600" /> :
        <Outline className="w-8 h-8 mx-1 cursor-pointer transition hover:scale-110" />
      }
    </div>
  );
}

export default HeartButton;