'use client'

import Image from "next/image"
import logo from '../../../assets/logo.svg'
import Link from "next/link"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from '../../../firebase'
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "@/redux/slice/authSlice"
import { Timestamp, doc, setDoc } from "firebase/firestore"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { slideAnimation } from "@/utils/motion"


const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    gender: "",
    region: ""
  })
  const { displayName, email, password, gender, region } = formData
  const loggedIn = useSelector(selectIsLoggedIn)

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
        const formDataCopy = { ...formData }
        formDataCopy.createdAt = Timestamp.now().toDate()

        // Save to database
        setDoc(doc(db, "users", user.uid), formDataCopy)

        console.log(user)
        router.push('/auth/greetings')
        loggedIn(true)
        toast.success('Registration complete')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className='relative flex justify-center items-center w-full px-3 py-20 mx-auto bg-[#012f34]'>
      <motion.div {...slideAnimation('up')} className='flex flex-col justify-center w-[400px] h-auto items-center rounded-md p-4 z-10 bg-white'>
          <Link href="/">
            <Image 
              src={logo}
              alt="logo"
              width={130}
              height={130}
            />
          </Link>
          <h1 className="w-full items-start text-2xl mb-3">Registration</h1>
          <form
            onSubmit={handleSubmit} 
            className="flex flex-col w-full space-y-3"
          >
            <label htmlFor="email" className="uppercase text-xs font-semibold">Email or phone number</label>
            <input 
              type="email" 
              id="email"
              required
              value={email} 
              onChange={handleChange}
              className="w-full bg-gray-200 rounded-sm p-2" 
            />
            <label htmlFor="password" className="uppercase text-xs font-semibold">Password</label>
            <input 
              type="password" 
              id="password" 
              required
              value={password} 
              onChange={handleChange}
              className="w-full bg-gray-200 rounded-sm p-2" 
            />
            <label htmlFor="displayName" className="uppercase text-xs font-semibold">Your OLX name</label>
            <input 
              type="text" 
              id="displayName"
              required
              value={displayName} 
              onChange={handleChange} 
              className="w-full bg-gray-200 rounded-sm p-2" 
            />
            <label htmlFor="gender" className="uppercase text-xs font-semibold">Choose gender</label>
            <select
              value={gender} 
              onChange={handleChange}
              id="gender" 
              className="w-full bg-gray-200 rounded-sm p-2 outline-none"
            >
              <option value="" disabled>-- Choose gender --</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <label htmlFor="region" className="uppercase text-xs font-semibold">Region</label>
            <select 
              value={region} 
              onChange={handleChange}
              id="region" 
              className="w-full bg-gray-200 rounded-sm p-2 outline-none"
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
              <option value="Brčko distrikt">Brčko distrikt</option     >
              <option value="Ouside of B&H">Ouside of B&H</option>
            </select>

            <div>
              <input 
                type="checkbox" 
                id="terms"
                name="terms"
                required
                className="bg-gray-200 rounded-sm p-2 mr-3" 
              />
              <label htmlFor="terms">I consent to <span className="underline">Terms and conditions</span></label> 
            </div>

            <button
              type="submit"
              className="w-full items-center py-2 text-white bg-[#012f34] rounded-md"
            >
              Register
            </button>
          </form>
          <div className="flex w-full justify-around my-5">
            <h1 className="text-gray-500">Already have user account?</h1>
            <Link href="/auth/login" className="uppercase font-bold">Login</Link>
          </div>

      </motion.div>
    </div>
  )
}

export default Register