'use client'

import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

import logo2 from '../../../assets/static_logo2.svg'
import izgled from '../../../assets/izgled.svg'
import katanac from '../../../assets/katanac.svg'
import objavi from '../../../assets/objavi.svg'
import { selectUserName } from '@/redux/slice/authSlice'

const Greetings = () => {
  const user = useSelector(selectUserName)

  return (
    <div className='relative flex justify-center items-start w-full h-screen mx-auto bg-white'>
      <div className='flex flex-col justify-center sm:w-[50%] h-auto items-center rounded-md p-4 z-10'>
        <Image
          src={logo2}
          alt="logo2"
          width={200}
          height={200}  
          className='w-full h-auto'      
        />
        <div className='flex flex-col w-full my-5'>
          <h1 className='text-4xl font-bold'>Hello {user}!</h1>
          <p>Welcome to OLX. For beginning we recommend you to:</p>
        </div>

        <div className='flex flex-col w-full gap-8'>
          <div className='flex'>
            <Image
              src={katanac}
              alt="katanac"
              className='w-28 mr-10'
            />
            <div className='flex flex-col justify-between items-start gap-8'>
              <h1 className='text-xl'>Verify Your account for increased safety</h1>
              <h1>For greater trust among members and greater security, verify your email and mobile number. After free verification, you will receive free SMS and email notifications.</h1>
              <button type="button" className='p-3 border-2 border-black rounded-md hover:border-4'>Settings</button>
            </div>
          </div>
          <hr />
          <div className='flex'>
            <Image
              src={izgled}
              alt="izgled"
              className='w-28 mr-10'
            />
            <div className='flex flex-col justify-between items-start gap-8'>
              <h1 className='text-xl'>Change your OLX profile settings</h1>
              <h1>A way of showing ads, loading with or without pages, audio notification for new messages... you can adjust the new OLX to the smallest detail.</h1>
              <button type="button" className='p-3 border-2 border-black rounded-md hover:border-4'>Settings</button>
            </div>
          </div>
          <hr />
          <div className='flex'>
            <Image
              src={objavi}
              alt="objavi"
              className='w-28 mr-10'
            />
            <div className='flex flex-col justify-between items-start gap-8'>
              <h1 className='text-xl'>Publish your first advertisement</h1>
              <h1>Have you set up your profile and added information? Start trading, publish your first ad!</h1>
              <button type="button" className='p-3 border-2 border-black rounded-md hover:border-4'>Publish</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Greetings
