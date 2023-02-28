'use client'

import { auth, db } from '@/firebase';
import { ClockIcon, EyeIcon, HeartIcon, InformationCircleIcon, MapPinIcon, ShareIcon, TagIcon } from '@heroicons/react/24/outline';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import olxMale from '../../../assets/olx-male.svg'


const CarsDetails = ({id}) => {
  const [details] = useDocumentData(doc(db, "products", id))
  const [user] = useAuthState(auth)
  
  console.log(details);
  console.log(user);
    
  return (
    <div className='bg-[#f1f4f5] w-full py-10 flex justify-center items-start gap-6 '>
      <div className='flex w-[1180px] gap-6'>
      <div className=' flex flex-col space-y-4'>
        {/* Main details */}
        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <div className='flex flex-col w-full space-y-3'>
            <h1 className='text-2xl uppercase'>{details?.title}</h1>
            <h1 className='text-3xl font-bold'>{details?.price} EUR</h1>
            <div className='flex justify-between items-center'>
              <p>{details?.category}</p>
              <div className='flex gap-3'>
                <ShareIcon className='w-6 h-6' />
                <HeartIcon className='w-6 h-6' />
              </div>
            </div>
            <Image 
              src={details?.imageURL}
              alt={details?.title}
              width={500}
              height={500}
              className='w-full h-[550px] object-contain'
            />
          </div>       
        </div>

        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <div className='flex flex-col w-full space-y-3'>
            <div className='flex gap-3'>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <MapPinIcon className='w-5 h-5' />
                {details?.region}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <TagIcon className='w-5 h-5' />
                Used
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <ClockIcon className='w-5 h-5' />
                Renewed: 2 hours ago
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <InformationCircleIcon className='w-5 h-5' />
                {id.slice(0, 8)}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <EyeIcon className='w-5 h-5' />
                Views: 264
              </h1>            
            </div>
            <h1 className='text-2xl'>Characteristics:</h1>
            <table className='flex w-full'>
              <tbody className='grid grid-cols-2 w-full text-sm capitalize gap-x-16'>
                <tr className='flex justify-between py-2'>
                  <td>Manufacturer:</td>
                  <td className='text-black/80'>{details?.manufacturer}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Model:</td>
                  <td className='text-black/80'>{details?.model}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Doors:</td>
                  <td className='text-black/80'>4/5</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Fuel:</td>
                  <td className='text-black/80'>Diesel</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Year:</td>
                  <td className='text-black/80'>{details?.year}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Mileage:</td>
                  <td className='text-black/80'>{details?.mileage}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Cubics:</td>
                  <td className='text-black/80'>{details?.cubic}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Kilowatts:</td>
                  <td className='text-black/80'>{details?.kilowatts}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Horsepower:</td>
                  <td className='text-black/80'>{Math.floor(details?.kilowatts/0.73549) + 1}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Drive:</td>
                  <td className='text-black/80'>Rear</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Emission:</td>
                  <td className='text-black/80'>Euro 5</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Transmission:</td>
                  <td className='text-black/80'>{details?.transmission}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Color:</td>
                  <td className='text-black/80'>{details?.color}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Type:</td>
                  <td className='text-black/80'>{details?.type}</td>
                </tr>
              </tbody>
            </table>

            <div>
              <h1 className='text-2xl'>Detailed description:</h1>
              <h1 className='p-2'>{details?.description}</h1>
            </div>
          </div>
        </div>

        <div className=' flex flex-col w-[832px] space-y-3 bg-white p-4 rounded-[4px]'>
          <h1 className='text-2xl'>Ask a question:</h1>
          <textarea 
            cols="30"
            rows="5"
            placeholder='Ask a question to the user'
            className="p-3 w-full mt-2 bg-[#f1f4f5] border-2 rounded-md"
          />
          <button className='px-3 py-2 border-2 w-40 border-black rounded-[4px]'>
            Ask a question
          </button>
        </div>

        
      </div>
        {/* User */}
        <div className='flex flex-col space-y-4'>
          <div className='w-[332px] bg-white p-4 rounded-[4px]'>
            <div className='flex flex-col w-full'>
              <h1 className='text-sm font-semibold'>USER</h1>
              <div className='flex justify-center items-center'>
                <Image
                  src={olxMale}
                  alt="avatarphoto"
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div className='flex flex-col'>
                  <h1>{details?.createdBy}</h1>
                  <h1>Last signed in</h1>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      
    </div>
  )
}

export default CarsDetails