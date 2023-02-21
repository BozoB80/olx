'use client'

import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from '@/firebase'
import { Timestamp, addDoc, collection } from 'firebase/firestore'

const AddCategories = () => {
  const [category, setCategory] = useState({
    name: "",
    imageURL: ""
  })
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCategory({...category, [name]: value})
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file);

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress)
        }, 
        (error) => {
          console.log('upload error');
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCategory({...category, imageURL: downloadURL})
            console.log('Image uploaded successfully');
          });
        }
      );
  }

  const addCategory = (e) => {
    e.preventDefault()
    console.log(category);

    try {
      const docRef = addDoc(collection(db, "categories"), {
        name: category.name,
        imageURL: category.imageURL,
        createdAt: Timestamp.now().toDate(),
      });

      console.log('Category uploaded successfully')
      
    } catch (error) {
      console.log(error.message);
    }
  } 

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl font-bold">Add New Category</h1>

      <form
        onSubmit={addCategory}
        className="flex flex-col w-full sm:w-[500px] my-3 p-3 shadow-2xl rounded-md"
      >
        <label className="font-semibold">Category Name:</label>
        <input
          type="text"
          placeholder='Category Name'
          required
          name="name"
          value={category.name}
          onChange={(e) => handleInputChange(e)}
          className="px-1 py-2 border-2 rounded-md"
        />

        <label className="font-semibold mt-2">Category Image:</label>
        <div className="flex flex-col border-2 rounded-md gap-2">
          {uploadProgress === 0 ? null : (
            <div className="border border-solid border-transparent bg-[#aaa] rounded-xl">
              <div className={`bg-blue-300 border rounded-xl text-sm pl-2 w-${uploadProgress}`}>
                {uploadProgress < 100 ? `Uploading ${uploadProgress}%` : `Upload Complete ${uploadProgress}%`}
              </div>              
            </div>
          )}
          
          <input 
            type="file" 
            placeholder="Category Image" 
            accept="image/*"
            name="image" 
            onChange={(e) => handleImageChange(e)}
            className="px-1 py-2 border-2 rounded-md"
          />
          {category.imageURL === "" ? null : (
            <input 
              type="text" 
              // required 
              disabled
              value={category.imageURL}
              name="imageURL" 
              className="px-1 py-2 border-2 rounded-md"
            />
          )}
        </div>

        <button type="submit" className="button mt-3 p-2 border-4 rounded-md font-semibold ">
          Save Category
        </button>

      </form>
      
    </div>
  )
}

export default AddCategories
