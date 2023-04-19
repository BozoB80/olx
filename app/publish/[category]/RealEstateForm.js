"use client";

import { useState } from "react";
import { auth, db, storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import { MapPinIcon } from "@heroicons/react/24/outline"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Timestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserName } from "@/redux/slice/authSlice";
import { toast } from "react-hot-toast";

const RealEstateForm = () => {
  const router = useRouter();
  const user = useSelector(selectUserName);
  const [toggleLocation, setToggleLocation] = useState(false);
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const [product, setProduct] = useState({
    title: "",
    region: "",
    availability: "",
    state: "",
    price: 0,
    type: "rent",
    furnished: true,
    address: "",
    imageURL: "",
    description: "",
    category: "Real Estate",
    createdBy: user,
  });

  const addRealEstate = (e) => {
    e.preventDefault();
    console.log(product);

    try {
      const docRef = addDoc(collection(db, "products"), {
        title: product.title,
        region: product.region,
        availability: product.availability,
        state: product.state,
        price: Number(product.price),
        type: product.type,
        furnished: Boolean(product.furnished),
        address: product.address,
        imageURL: product.imageURL,
        description: product.description,
        category: product.category,
        createdBy: product.createdBy,
        createdAt: Timestamp.now().toDate(),
        userRef: auth.currentUser.uid,
      });
      console.log("Real estate add created succesfully");
      router.push(`/add/${docRef.id}`);
      
    } catch (error) {
      console.log("You did not add new product");
      console.error(error);
    }

    toast.success('You succesfully published an add!')
    router.push('/')    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({...product, [name]: value})
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file);

    const storageRef = ref(storage, `images/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, 
        (error) => {
          console.log('upload error');
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({...product, imageURL: downloadURL})
            console.log('Image uploaded successfully');
          });
        }
      );
  }

  const handleBooleanChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    //Text or boolean
    if (!e.target.files) {
      setProduct((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  
  return (
    <div className="flex justify-center pt-3 sm:pt-10 w-full bg-gray-100 pb-3 sm:pb-10">
      <div className="w-full sm:w-[800px] h-full bg-white rounded-md px-1 sm:px-3 py-6">
        <form
          onSubmit={addRealEstate}
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full">
            <h1 className="text-2xl text-center font-normal mb-4">
              Real Estates
            </h1>
            <div>
              <p className="uppercase text-xs font-semibold">title</p>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Real estate"
                value={product.title}
                onChange={(e) => handleInputChange(e)}
                maxLength="32"
                minLength="10"
                className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
              />
            </div>

            <div className="w-full my-4">
              <label htmlFor="region" className="uppercase text-xs font-semibold">
                Location
              </label>
              <div className="flex space-x-1 sm:space-x-4">
                {!toggleLocation ? (
                  <input
                    id="region"
                    name="region"
                    type="text"
                    placeholder="West Hercegovina"
                    value={product.region}
                    onChange={(e) => handleInputChange(e)}
                    disabled
                    className="w-full rounded-md text-sm sm:text-base px-3 py-3 outline-none"
                  />
                ) : (
                  <select
                    id="region"
                    name="region"
                    value={product.region}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full bg-gray-100 text-xs sm:text-base rounded-md px-3 py-3 outline-none"
                  >
                    <option value="" disabled>
                      -- Choose region --
                    </option>
                    <option disabled className="text-red-400">
                      Federation BiH
                    </option>
                    <option value="West Hercegovina">West Hercegovina</option>
                    <option value="Hercegovačko-neretvanska">
                      Hercegovačko-neretvanska
                    </option>
                    <option value="Unsko-sanska">Unsko-sanska</option>
                    <option value="Posavska">Posavska</option>
                    <option value="Tuzlanska">Tuzlanska</option>
                    <option value="Zeničko-dobojska">Zeničko-dobojska</option>
                    <option value="Bosansko-podrinjska">
                      Bosansko-podrinjska
                    </option>
                    <option value="Srednja bosna">Srednja bosna</option>
                    <option value="Sarajevo">Sarajevo</option>
                    <option disabled className="text-red-400">
                      Republika Srpska
                    </option>
                    <option value="Banjalučka">Banjalučka</option>
                    <option value="Dobojsko-bijeljinska">
                      Dobojsko-bijeljinska
                    </option>
                    <option value="Sarajevsko-zvornička">
                      Sarajevsko-zvornička
                    </option>
                    <option value="Trebinjsko-fočanska">
                      Trebinjsko-fočanska
                    </option>
                    <option value="Brčko distrikt">Brčko distrikt</option>
                    <option value="Ouside of B&H">Ouside of B&H</option>
                  </select>
                )}
                <button
                  type="button"
                  value={toggleLocation}
                  onClick={() => setToggleLocation((prev) => !prev)}
                  className="w-full py-3 border-2 text-xs sm:text-base border-black rounded-md flex justify-center items-center"
                >
                  <MapPinIcon className="w-6 h-6" />
                  <h1>
                    {!toggleLocation
                      ? "Change location"
                      : "Back to the registered location"}
                  </h1>
                </button>
              </div>
            </div>

            <div className="w-full my-4 flex justify-between space-x-4">
                  <div className="flex w-full flex-col">
                    <h1 className="uppercase text-xs font-semibold">Availability</h1>
                    <fieldset className="flex justify-between items-center gap-4">
                      <div className="flex relative w-full">
                        <label 
                          htmlFor="available"
                          className="w-full cursor-pointer px-1 sm:px-3 py-1 sm:py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center"
                        >Available immediately
                        <input 
                          type="radio"
                          id="available"
                          name="availability"
                          value="Available immediately"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.availability === "Available immediately"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                        </label>
                      </div>

                      <div className="flex relative w-full">  
                        <label htmlFor="notAvailable" className="w-full cursor-pointer px-1 sm:px-5 py-1 sm:py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center">
                          Not available
                        <input 
                          type="radio"
                          id="notAvailable"
                          name="availability"
                          value="Not available now"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.availability === "Not available now"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                        </label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="flex w-full flex-col">
                    <h1 className="uppercase text-xs font-semibold">State</h1>
                    <fieldset className="flex justify-between items-center gap-4">
                      <div className="flex relative w-full">
                        <label 
                          htmlFor="new"
                          className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-center items-center"
                        >
                          New
                        </label>
                        <input 
                          type="radio"
                          id="new"
                          name="state"
                          value="New"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.state === "New"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </div>

                      <div className="flex relative w-full">  
                        <label htmlFor="used" className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center">Used</label>
                        <input 
                          type="radio"
                          id="used"
                          name="state"
                          value="Used"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.state === "Used"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </div>
                    </fieldset>                
                  </div>                
                </div>

            <div className="w-full mt-5 flex flex-col">
              <h1 className="uppercase text-xs font-semibold">Price</h1>
              <div className="flex space-x-4 sm:space-x-8 w-full justify-between items-center">
                <div className="flex w-full items-center justify-center">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="1"
                    max="20000000"
                    required
                    value={product.price}
                    onChange={(e) => handleInputChange(e)}
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
                      name="type"
                      value="Sale"
                      onClick={(e) => handleInputChange(e)}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            product.type === "sale"
                              ? "bg-[#f1f4f5] border-2 border-black"
                              : ""
                          }`}
                    >
                      Sale
                    </button>
                    <button
                      type="button"
                      id="type"
                      name="type"
                      value="Rent"
                      onClick={(e) => handleInputChange(e)}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            product.type === "rent"
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
                      name="furnished"
                      value={true}
                      onClick={(e) => handleBooleanChange(e)}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            product.furnished
                              ? "bg-[#f1f4f5] border-2 border-black"
                              : ""
                          }`}
                    >
                      Furnished
                    </button>
                    <button
                      type="button"
                      id="furnished"
                      name="furnished"
                      value={false}
                      onClick={(e) => handleBooleanChange(e)}
                      className={`w-full p-3 border text-xs sm:text-base border-gray-400 rounded-md flex justify-center items-center 
                          ${
                            !product.furnished
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
                name="address"
                required
                placeholder="Address"
                value={product.address}
                onChange={(e) => handleInputChange(e)}
                className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
              />
            </div>
            {/* {!geoLocationEnabled && (
              <div className="flex space-x-2 my-3 w-full">
                <div>
                  <p className="uppercase text-xs font-semibold">Latitude</p>
                  <input
                    type="number"
                    id="latitude"
                    value={product.latitude}
                    onChange={(e) => handleInputChange(e)}
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
                    value={product.longitude}
                    onChange={(e) => handleInputChange(e)}
                    required
                    min="-180"
                    max="180"
                    className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
                  />
                </div>
              </div>
            )} */}

            <div>
              <label className="uppercase text-xs font-semibold mt-5">
                Images
              </label>
              <div className="flex flex-col border-2 rounded-md gap-2">
                <input
                  type="file" 
                  placeholder="Category Image" 
                  accept="image/*"
                  name="image"
                  required
                  multiple
                  onChange={(e) => handleImageChange(e)}
                  className="p-5 border-2 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="uppercase text-xs font-semibold mt-5">
                Description
              </label>
              <textarea
                name="description"
                required
                value={product.description}
                onChange={(e) => handleInputChange(e)}
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
