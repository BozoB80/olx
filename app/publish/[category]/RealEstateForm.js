"use client";

import { useState } from "react";
import { auth, db, storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const RealEstateForm = () => {
  const router = useRouter()
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    type: "rent",
    furnished: false,
    address: "",
    latitude: 0,
    longitude: 0,
    images: {},
    description: "",
  });

  const {
    title,
    price,
    type,
    furnished,
    address,
    latitude,
    longitude,
    images,
    description,
  } = formData;

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    //Images
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //Text or boolean
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const addRealEstates = async (e) => {
    e.preventDefault();

    if (images.length > 7) {
      console.error("maximum 7 images are allowed");
      return;
    }

    let geolocation = {};
    let location;
    if (geoLocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        console.error("Please enter a correct address");
        return;
      } else {
        geolocation.lat = latitude;
        geolocation.lng = longitude;
      }
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      
      console.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid
    }
    delete formDataCopy.images
    delete formDataCopy.latitude
    delete formDataCopy.longitude
    const docRef = await addDoc(collection(db, "products"), formDataCopy)
    console.log("Listing created succesfully");
    router.push(`/add/${docRef.id}`)
    
  };

  return (
    <div className="flex justify-center pt-3 sm:pt-10 w-full bg-gray-100 pb-3 sm:pb-10">
      <div className="w-full sm:w-[800px] h-full bg-white rounded-md px-1 sm:px-3 py-6">
        <form
          onSubmit={addRealEstates}
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full">
            <h1 className="text-2xl text-center font-normal mb-4">
              Real estates
            </h1>
            <div>
              <p className="uppercase text-xs font-semibold">title</p>
              <input
                type="text"
                id="title"
                required
                placeholder="Real estate"
                value={title}
                onChange={handleChange}
                maxLength="32"
                minLength="10"
                className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
              />
            </div>

            <div className="w-full mt-5 flex flex-col">
              <h1 className="uppercase text-xs font-semibold">Price</h1>
              <div className="flex space-x-4 sm:space-x-8 w-full justify-between items-center">
                <div className="flex w-full items-center justify-center">
                  <input
                    type="number"
                    id="price"
                    min="1"
                    max="20000000"
                    required
                    value={price}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-sm sm:text-base rounded-l-md p-3 outline-none"
                  />
                  <h1 className="uppercase bg-gray-100 rounded-r-md border-l border-gray-300 text-sm sm:text-base p-3 font-semibold">
                    EUR
                  </h1>
                </div>

                <h1 className="uppercase bg-gray-100 p-4 rounded-full text-xs font-semibold">
                  OR
                </h1>

                <button
                  type="button"
                  className="w-full py-3 text-sm bg-gray-100 text-black focus:border-2 focus:border-black rounded-md flex justify-center items-center"
                >
                  <h1>Price on inquiry</h1>
                </button>
              </div>
            </div>

            <div className="w-full my-4 flex justify-between space-x-4">
              <div className="flex w-full flex-col">
                <h1 className="uppercase text-xs font-semibold">Type</h1>
                <fieldset className="flex justify-between items-center gap-4">
                  <div className="flex relative w-full gap-2">
                    <button
                      type="button"
                      id="type"
                      value="sale"
                      onClick={handleChange}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            type === "sale"
                              ? "bg-[#f1f4f5] border-2 border-black"
                              : ""
                          }`}
                    >
                      Sale
                    </button>
                    <button
                      type="button"
                      id="type"
                      value="rent"
                      onClick={handleChange}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            type === "rent"
                              ? "bg-[#f1f4f5] border-2 border-black"
                              : ""
                          }`}
                    >
                      Rent
                    </button>
                  </div>
                </fieldset>
              </div>
              <div className="flex w-full flex-col">
                <h1 className="uppercase text-xs font-semibold">Furnished</h1>
                <fieldset className="flex justify-between items-center gap-4">
                  <div className="flex relative w-full gap-2">
                    <button
                      type="button"
                      id="furnished"
                      value={true}
                      onClick={handleChange}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            furnished
                              ? "bg-[#f1f4f5] border-2 border-black"
                              : ""
                          }`}
                    >
                      Furnished
                    </button>
                    <button
                      type="button"
                      id="furnished"
                      value={false}
                      onClick={handleChange}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            !furnished
                              ? "bg-[#f1f4f5] border-2 border-black"
                              : ""
                          }`}
                    >
                      Not Furnished
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>

            <div>
              <p className="uppercase text-xs font-semibold">Address</p>
              <input
                type="text"
                id="address"
                required
                placeholder="Address"
                value={address}
                onChange={handleChange}
                className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
              />
            </div>
            {!geoLocationEnabled && (
              <div className="flex space-x-2 my-3 w-full">
                <div>
                  <p className="uppercase text-xs font-semibold">Latitude</p>
                  <input
                    type="number"
                    id="latitude"
                    value={latitude}
                    onChange={handleChange}
                    required
                    min="-90"
                    max="90"
                    className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
                  />
                </div>
                <div>
                  <p className="uppercase text-xs font-semibold">Longitude</p>
                  <input
                    type="number"
                    id="longitude"
                    value={longitude}
                    onChange={handleChange}
                    required
                    min="-180"
                    max="180"
                    className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="uppercase text-xs font-semibold mt-5">
                Images
              </label>
              <div className="flex flex-col border-2 rounded-md gap-2">
                <input
                  type="file"
                  id="images"
                  placeholder="Image"
                  accept="image/*"
                  required
                  multiple
                  onChange={handleChange}
                  className="p-5 border-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="uppercase text-xs font-semibold mt-5">
                Description
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={handleChange}
                placeholder="Description"
                cols="30"
                rows="10"
                className="p-2 border-2 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white active:bg-white active:text-black active:border-2 active:border-black mt-3 p-2 outline-none rounded-md font-semibold "
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RealEstateForm;
