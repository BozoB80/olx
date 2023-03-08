'use client'

import { db, storage } from "@/firebase"
import { selectUserName } from "@/redux/slice/authSlice"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { collection } from "firebase/firestore"
import { useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useSelector } from "react-redux"

const MobilePhonesForm = () => {
  const [mobiles] = useCollectionData(collection(db, "/categories/j2zFFZEg3vvbq91jAQZh/manufacturer"))
  const user = useSelector(selectUserName)
  const [images, setImages] = useState([])
  const [toggleLocation, setToggleLocation] = useState(false)
  const [product, setProduct] = useState({
    title: "",
    manufacturer: "",
    region: "",
    availability: "",
    state: "",
    price: 0,
    flash: "",
    system: "",
    imageURL: "",
    category: "Mobile Phones",
    createdBy: user,
  })

  const addMobiles = (e) => {
    e.preventDefault()
    console.log(product);
    
    try {
      const docRef = addDoc(collection(db, "products"), {
        title: product.title,
        manufacturer: product.manufacturer,
        region: product.region,
        availability: product.availability,
        state: product.state,
        price: Number(product.price),
        flash: product.flash,
        system: product.system,
        imageURL: product.imageURL,
      })
    } catch (error) {
      console.log('You did not add new product');
    }
    
    setProduct({
      title: "",
      manufacturer: "",
      region: "",
      availability: "",
      state: "",
      price: 0,
      flash: "",
      system: "",
      imageURL: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({...product, [name]: value})
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const filename = file.name; // generate unique filename
    const uploadTask = storage.ref(`images/${filename}`).put(file); // upload file to cloud storage
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        // get download URL of the uploaded file
        storage
          .ref('images')
          .child(filename)
          .getDownloadURL()
          .then((url) => {
            setImages([...images, url]); // add the URL to the state
          });
      }
    );
  }



  return (
    <div className="flex justify-center pt-3 sm:pt-10 w-full bg-gray-100 pb-3 sm:pb-10">
      <div className="w-full sm:w-[800px] h-full bg-white rounded-md px-1 sm:px-3 py-6">
        <form
          onSubmit={addMobiles}
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full">
            <h1 className="text-2xl text-center font-normal mb-4">Mobile Phones</h1>
            <div className="flex justify-start items-center gap-4">
              <div className="flex flex-col w-full space-y-2">
                <div>
                  <label className="uppercase text-xs font-semibold">title</label>
                  <input 
                    type="text"
                    name="title"
                    required
                    placeholder="mobile phone"
                    value={product.title}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3 outline-none"
                  />                
                </div>
                <div>
                  <label htmlFor="make" className="uppercase text-xs font-semibold">Manufacturer</label>
                  <select 
                    id="make"
                    required
                    name="manufacturer"
                    value={product.manufacturer}
                    onChange={(e) => handleInputChange(e)}
                    className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3" 
                  > 
                    <option value="" disabled>-- Choose brand --</option>
                    {mobiles?.map((doc) => (
                      <option key={doc.name} value={doc.name}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full my-4">
                  <label htmlFor="make" className="uppercase text-xs font-semibold">Location</label>
                  <div className="flex space-x-1 sm:space-x-4">
                    {!toggleLocation ? (
                      <input  
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
                        <option value="" disabled>-- Choose region --</option>
                        <option disabled className="text-red-400">Federation BiH</option>
                        <option value="West Hercegovina">West Hercegovina</option>
                        <option value="Hercegovačko-neretvanska">Hercegovačko-neretvanska</option>
                        <option value="Unsko-sanska">Unsko-sanska</option>
                        <option value="Posavska">Posavska</option>
                        <option value="Tuzlanska">Tuzlanska</option>
                        <option value="Zeničko-dobojska">Zeničko-dobojska</option>
                        <option value="Bosansko-podrinjska">Bosansko-podrinjska</option>
                        <option value="Srednja bosna">Srednja bosna</option>
                        <option value="Sarajevo">Sarajevo</option>
                        <option disabled className="text-red-400">Republika Srpska</option>
                        <option value="Banjalučka">Banjalučka</option>
                        <option value="Dobojsko-bijeljinska">Dobojsko-bijeljinska</option>
                        <option value="Sarajevsko-zvornička">Sarajevsko-zvornička</option>
                        <option value="Trebinjsko-fočanska">Trebinjsko-fočanska</option>
                        <option value="Brčko distrikt">Brčko distrikt</option>
                        <option value="Ouside of B&H">Ouside of B&H</option>
                      </select>
                    )}
                    <button 
                      type="button"
                      value={toggleLocation}
                      onClick={() => setToggleLocation(prev => !prev)}
                      className="w-full py-3 border-2 text-xs sm:text-base border-black rounded-md flex justify-center items-center"
                    >
                      <MapPinIcon className="w-6 h-6" />
                      <h1>{!toggleLocation ? "Change location" : "Back to the registered location"}</h1>
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
                          className="w-full cursor-pointer px-1 sm:px-5 py-1 sm:py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center"
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
                        name="price"
                        min="1"
                        max="1000000"
                        required
                        value={product.price}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full bg-gray-100 text-sm sm:text-base rounded-l-md p-3 outline-none"
                      />
                      <h1 className="uppercase bg-gray-100 rounded-r-md border-l border-gray-300 text-sm sm:text-base p-3 font-semibold">EUR</h1>
                    </div>

                    <h1 className="uppercase bg-gray-100 p-4 rounded-full text-xs font-semibold">OR</h1>

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
                    <h1 className="uppercase text-xs font-semibold">OS</h1>
                    <fieldset className="flex justify-between items-center gap-4">
                      <div className="flex relative w-full">
                        <label 
                          htmlFor="ios"
                          className="w-full cursor-pointer px-1 sm:px-5 py-1 sm:py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center"
                        >iOS
                        <input 
                          type="radio"
                          id="ios"
                          name="system"
                          value="iOS"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.system === "iOS"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                        </label>
                      </div>

                      <div className="flex relative w-full">  
                        <label htmlFor="android" className="w-full cursor-pointer px-1 sm:px-5 py-1 sm:py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center">
                          Android
                        <input 
                          type="radio"
                          id="android"
                          name="system"
                          value="Android"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.system === "Android"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                        </label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="flex w-full flex-col">
                    <h1 className="uppercase text-xs font-semibold">Flash</h1>
                    <fieldset className="flex justify-between items-center gap-4">
                      <div className="flex relative w-full">
                        <label 
                          htmlFor="led"
                          className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-center items-center"
                        >
                          LED
                        </label>
                        <input 
                          type="radio"
                          id="led"
                          name="flash"
                          value="LED"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.flash === "LED"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </div>

                      <div className="flex relative w-full">  
                        <label htmlFor="dualLED" className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center">
                          Dual-LED</label>
                        <input 
                          type="radio"
                          id="dualLED"
                          name="flash"
                          value="Dual-LED"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.flash === "Dual-LED"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </div>
                    </fieldset>                
                  </div>                
                </div>  

                <div>
                  <label className="uppercase text-xs font-semibold mt-5">Image:</label>
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

                <button type="submit" className="w-full bg-black text-white active:bg-white active:text-black active:border-2 active:border-black mt-3 p-2 outline-none rounded-md font-semibold ">
                  Publish
                </button>      
              </div>              
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MobilePhonesForm
