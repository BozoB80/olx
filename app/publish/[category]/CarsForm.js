'use client'

import { auth, db, storage } from "@/firebase"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import ChildrenList from "./ChildrenList"
import { useState } from "react"
import { MapPinIcon } from "@heroicons/react/24/outline"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from "react-redux"
import { selectUserName } from "@/redux/slice/authSlice"

const CarsForm = () => {
  const query = collection(db, "/categories/PE2j37QZeo1UwY4TKZPJ/manufacturer")
  const [docs] = useCollectionData(query)
  const [toggleLocation, setToggleLocation] = useState(false)
  const user = useSelector(selectUserName)
  const [models] = useCollection(collection(db, "/categories/PE2j37QZeo1UwY4TKZPJ/manufacturer"),
  {snapshotListenOptions: { includeMetadataChanges: true }})
  
  const [product, setProduct] = useState({
    manufacturer: "",
    model: "",
    price: 0,
    title: "",
    region: "",
    availability: "",
    state: "",
    year: 0,
    doors: "",
    mileage: 0,
    fuel: "",
    cubic: "",
    kilowatts: 0,
    drive: "",
    emission: "",
    transmission: "",
    type: "",
    color: "",
    imageURL: "",
    description: "",
    category: "Cars",
    createdBy: user,
  })

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

  const handleLocation = () => {
    setToggleLocation(prev => !prev)
  }

  const addCars = (e) => {
    e.preventDefault()
    console.log(product);

    try {
      const docRef = addDoc(collection(db, "products"), {
        manufacturer: product.manufacturer,
        model: product.model,
        price: Number(product.price),
        title: product.title,
        region: product.region,
        availability: product.availability,
        state: product.state,
        year: Number(product.year),
        doors: product.doors,
        mileage: Number(product.mileage),
        fuel: product.fuel,
        cubic: product.cubic,
        kilowatts: Number(product.kilowatts),
        drive: product.drive,
        emission: product.emission,
        transmission: product.transmission,
        type: product.type,
        color: product.color,
        imageURL: product.imageURL,
        description: product.description,
        category: product.category,
        createdBy: product.createdBy,
        createdAt: Timestamp.now().toDate()
      });
    } catch (error) {
      console.log('You did not add new product');
    }

    setProduct({
      manufacturer: "",
      model: "",
      price: 0,
      title: "",
      region: "",
      availability: "",
      state: "",
      year: 0,
      doors: "",
      mileage: 0,
      fuel: "",
      cubic: "",
      kilowatts: 0,
      drive: "",
      emission: "",
      transmission: "",
      type: "",
      color: "",
      imageURL: "",
      description: "",
    })
  }

  return (
    <div className="flex justify-center pt-3 sm:pt-10 w-full bg-gray-100 pb-3 sm:pb-10">
      <div className="w-full sm:w-[800px] h-full bg-white rounded-md px-1 sm:px-3 py-6">
        <form
          onSubmit={addCars}
          className="flex flex-col justify-center items-center"
        >
          <div className="w-full">
            <h1 className="text-2xl text-center font-normal mb-4">Make and Model</h1>
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
              {docs?.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>

            <label htmlFor="model" className="uppercase text-sm font-semibold">Model</label>
            <select 
              id="model"
              name="model"
              required
              value={product.model}
              onChange={(e) => handleInputChange(e)}
              className="w-full bg-gray-100 text-sm sm:text-base rounded-md p-3" 
            > 
              <option value="" disabled>-- Choose model --</option>
              {models?.docs.map((doc) => (
                <ChildrenList key={doc.id} path={`categories/PE2j37QZeo1UwY4TKZPJ/manufacturer/${doc.id}/model`} />
              ))}
            </select>

            <div className="w-full my-4">
              <h1 className="uppercase text-sm sm:text-base font-semibold">LOCATION</h1>
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
                  onClick={handleLocation}
                  className="w-full py-3 border-2 text-xs sm:text-base border-black rounded-md flex justify-center items-center"
                >
                  <MapPinIcon className="w-6 h-6" />
                  <h1>{!toggleLocation ? "Change location" : "Back to the registered location"}</h1>
                </button>
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
            </div>

            <div className="w-full">
              <div className="flex justify-start items-center gap-4">
                <div className="flex flex-col w-full">
                  <h1 className="uppercase text-xs font-semibold">title</h1>
                  <input 
                      type="text"
                      name="title"
                      required
                      value={product.title}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full bg-gray-100 rounded-md p-3 outline-none"
                    />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="year" className="uppercase text-xs font-semibold">Production year</label>
                  <select 
                    name="year"
                    id="year" 
                    value={product.year} 
                    onChange={(e) => handleInputChange(e)}                   
                    className="w-full bg-gray-100 rounded-md text-sm sm:text-base px-3 py-3 outline-none"
                  >
                    <option value="" disabled>-- Choose year --</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>                    
                    <option value="2013">2013</option>                    
                    <option value="2012">2012</option>                    
                    <option value="2011">2011</option>                    
                    <option value="2010">2010</option>                    
                    <option value="2009">2009</option>                    
                    <option value="2008">2008</option>                    
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>                   
                  </select>
                </div>
              </div>

              <div className="w-full my-4 flex space-x-4">
                <div className="flex w-full flex-col">
                  <h1 className="uppercase text-xs font-semibold">Number of doors</h1>
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="doors1"
                        className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-center items-center"
                      >
                        2/3
                        <input 
                          type="radio"
                          id="doors1"
                          name="doors"
                          value="2/3"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.doors === "2/3"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">  
                      <label htmlFor="doors2" className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-center items-center">
                        4/5
                        <input 
                          type="radio"
                          id="doors2"
                          name="doors"
                          value="4/5"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.doors === "4/5"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col">
                <h1 className="uppercase text-xs font-semibold">mileage</h1>
                  <input 
                      type="number"
                      name="mileage"
                      min="1"
                      max="500000"
                      required
                      value={product.mileage}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full bg-gray-100 text-sm sm:text-base rounded-l-md p-3 outline-none"
                    />
                </div>                
              </div>

              <div className="w-full my-4 flex space-x-4">
                <div className="w-full flex flex-col">
                  <h1 className="uppercase text-xs font-semibold">Fuel</h1>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="fuel1"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Diesel
                        <input 
                          type="radio"
                          id="fuel1"
                          name="fuel"
                          value="Diesel"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.fuel === "Diesel"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="fuel2"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-start items-center"
                      >
                        Petrol
                        <input 
                          type="radio"
                          id="fuel2"
                          name="fuel"
                          value="Petrol"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.fuel === "Petrol"}
                          className="absolute right-2 top-0 bottom-0 w-3"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="fuel3"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-start items-center"
                      >
                        Gas
                        <input 
                          type="radio"
                          id="fuel3"
                          name="fuel"
                          value="Gas"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.fuel === "Gas"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="fuel4"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-start items-center"
                      >
                        Hybrid
                        <input 
                          type="radio"
                          id="fuel4"
                          name="fuel"
                          value="Hybrid"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.fuel === "Hybrid"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="fuel5"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-start items-center"
                      >
                        Electric
                        <input 
                          type="radio"
                          id="fuel5"
                          name="fuel"
                          value="Electric"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.fuel === "Electric"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center w-full gap-4">
                  <div className="w-full">
                    <label htmlFor="cubic" className="uppercase text-xs font-semibold">Cubic capacity</label>
                    <select 
                      id="cubic" 
                      name="cubic"
                      value={product.cubic} 
                      onChange={(e) => handleInputChange(e)}                    
                      className="w-full bg-gray-100 rounded-md text-xs sm:text-sm px-3 py-3 outline-none"
                    >
                      <option value="" disabled>-- Choose capacity --</option>                    
                      <option value="1.0">1.0</option>                     
                      <option value="1.2">1.2</option>                     
                      <option value="1.5">1.5</option>
                      <option value="1.6">1.6</option>
                      <option value="1.9">1.9</option>
                      <option value="2.0">2.0</option>
                      <option value="2.2">2.2</option>
                      <option value="2.5">2.5</option>
                      <option value="3.0">3.0</option>
                      <option value="3.5">3.5</option>
                      <option value="4.0">4.0</option>
                      <option value="5.0">5.0</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label htmlFor="kilowatts" className="uppercase text-xs sm:text-sm font-semibold">kilowatts</label>
                    <input 
                      type="number"
                      name="kilowatts"
                      min="1"
                      max="1000"
                      required
                      value={product.kilowatts}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full bg-gray-100 text-sm sm:text-base rounded-l-md p-3 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full my-4 flex space-x-4">
                <div className="flex w-full flex-col">
                  <h1 className="uppercase text-xs font-semibold">Drive</h1>
                  <fieldset className="flex justify-between items-center gap-4">
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="front"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Front
                        <input 
                          type="radio"
                          id="front"
                          name="drive"
                          value="Front"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.drive === "Front"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="rear"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Rear
                        <input 
                          type="radio"
                          id="rear"
                          name="drive"
                          value="Rear"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.drive === "Rear"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>                 
                  </fieldset>
                </div>
                <div className="flex w-full flex-col">
                  <h1 className="uppercase text-xs font-semibold">Emission</h1>
                  <fieldset className="grid grid-cols-2 justify-between items-center gap-4">
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="euro3"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Euro 3
                        <input 
                          type="radio"
                          id="euro3"
                          name="emission"
                          value="Euro 3"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.emission === "Euro 3"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="euro4"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Euro 4
                        <input 
                          type="radio"
                          id="euro4"
                          name="emission"
                          value="Euro 4"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.emission === "Euro 4"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="euro5"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Euro 5
                        <input 
                          type="radio"
                          id="euro5"
                          name="emission"
                          value="Euro 5"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.emission === "Euro 5"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="euro6"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400 rounded-md flex justify-start items-center"
                      >
                        Euro 6
                        <input 
                          type="radio"
                          id="euro6"
                          name="emission"
                          value="Euro 6"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.emission === "Euro 6"}
                          className="absolute right-2 top-0 bottom-0"
                        />
                      </label>
                    </div>                 
                  </fieldset>                
                </div>                
              </div>

              <div className="w-full my-4 flex space-x-4">
                <div className="w-full flex flex-col">
                  <h1 className="uppercase text-xs font-semibold">Transmission</h1>
                  <fieldset className="grid grid-cols-2 gap-4">
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="trans1"
                        className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-center items-center"
                      >
                        Automatic
                        <input 
                          type="radio"
                          id="trans1"
                          name="transmission"
                          value="Automatic"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.transmission === "Automatic"}
                          className="absolute right-2 top-2 "
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="trans2"
                        className="w-full cursor-pointer px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-center items-center"
                      >
                        Semi-automatic
                        <input 
                          type="radio"
                          id="trans2"
                          name="transmission"
                          value="Semi-automatic"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.transmission === "Semi-automatic"}
                          className="absolute right-2 top-2"
                        />
                      </label>
                    </div>
                    <div className="flex relative w-full">
                      <label 
                        htmlFor="trans3"
                        className="w-full cursor-pointer px-2 sm:px-5 py-3 border-2 text-xs sm:text-sm border-gray-400 text-gray-400  rounded-md flex justify-start items-center"
                      >
                        Manual
                        <input 
                          type="radio"
                          id="trans3"
                          name="transmission"
                          value="Manual"
                          onChange={(e) => handleInputChange(e)} 
                          checked={product.transmission === "Manual"}
                          className="absolute right-2 top-2"
                        />
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div className="flex flex-col justify-start items-center w-full gap-4">
                  <div className="w-full">
                    <label htmlFor="type" className="uppercase text-xs font-semibold">Type</label>
                    <select 
                      id="type" 
                      name="type"                     
                      value={product.type} 
                      onChange={(e) => handleInputChange(e)}                    
                      className="w-full bg-gray-100 text-xs sm:text-sm rounded-md px-3 py-3 outline-none"
                    >
                      <option value="" disabled>-- Choose type --</option>                    
                      <option value="Limousine">Limousine</option>                     
                      <option value="Small Car">Small car</option>
                      <option value="Caravan">Caravan</option>
                      <option value="Van">Van</option>
                      <option value="SUV">SUV</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Sports-car">Sports Car</option>
                      <option value="Off-Road">Off Road</option>
                      <option value="Caddy">Caddy</option>
                      <option value="Pickup">Pick-up</option>
                      <option value="Oldtimer">Oldtimer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label htmlFor="color" className="uppercase text-xs font-semibold">color</label>
                    <select 
                      id="color" 
                      name="color"
                      value={product.color} 
                      onChange={(e) => handleInputChange(e)}                    
                      className="w-full bg-gray-100 text-xs sm:text-sm rounded-md px-3 py-3 outline-none"
                    >
                      <option value="" disabled>-- Choose color --</option>                    
                      <option value="beige">Beige</option>                     
                      <option value="black">Black</option>
                      <option value="blue">Blue</option>
                      <option value="brown">Brown</option>
                      <option value="gold">Gold</option>
                      <option value="gray">Gray</option>
                      <option value="green">Green</option>
                      <option value="orange">Orange</option>
                      <option value="purple">Purple</option>
                      <option value="red">Red</option>
                      <option value="silver">Silver</option>
                      <option value="white">White</option>
                      <option value="yellow">Yellow</option>
                    </select>
                  </div>
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
                    onChange={(e) => handleImageChange(e)}
                    className="p-5 border-2 rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="uppercase text-xs font-semibold mt-5">Product Description</label>
                <textarea
                  name="description"
                  required
                  value={product.description}
                  onChange={(e) => handleInputChange(e)}
                  cols="30"
                  rows="10"
                  className="p-2 border-2 rounded-md"
                />
              </div>

              <button type="submit" className="w-full bg-black text-white active:bg-white active:text-black active:border-2 active:border-black mt-3 p-2 outline-none rounded-md font-semibold ">
                Publish
              </button>
                  
            </div>      

          </div>        
        </form>
      </div>      
    </div>
  )
}

export default CarsForm
