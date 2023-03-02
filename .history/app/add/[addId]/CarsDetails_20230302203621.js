'use client'

import { auth, db } from '@/firebase';
import { BuildingOfficeIcon, ChatBubbleLeftIcon, ClockIcon, EyeIcon, HeartIcon, InformationCircleIcon, MapPinIcon, PhoneIcon, RectangleStackIcon, ShareIcon, StarIcon, TagIcon } from '@heroicons/react/24/outline';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/navigation';
import olxMale from '../../../assets/olx-male.svg'
import medal1 from '../../../assets/medal1.png'
import medal2 from '../../../assets/medal2.png'
import { ArrowLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';


const CarsDetails = ({id}) => {
  const [details] = useDocumentData(doc(db, "products", id))
  const [user] = useAuthState(auth)
  const router = useRouter()
  
  console.log(details);
  console.log(user);
    
  return (
    <div className='bg-[#f1f4f5] w-full py-10 flex justify-center items-start gap-6 '>
      <div className='hidden sm:flex w-[1180px] gap-6'>
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
        <div className='flex flex-col space-y-4 sticky top-4'>
          <div className='w-[332px] bg-white p-4 rounded-[4px]'>
            <div className='flex flex-col w-full'>
              <h1 className='text-sm font-semibold mb-3'>USER</h1>
              <div className='flex justify-start items-center'>
                <Image
                  src={olxMale}
                  alt="avatarphoto"
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div className='flex flex-col ml-5'>
                  <h1 className='font-semibold'>{details?.createdBy}</h1>
                  <h1 className='text-gray-400'>Last signed in</h1>
                  <div className='flex gap-3'>
                    <Image src={medal1} alt="medal1" width={25} height={25} />
                    <Image src={medal2} alt="medal2" width={25} height={25} />
                  </div>
                </div>
              </div>
              <div className='mt-3 bg-[#f1f4f5] p-2 runded-md font-semibold '>
                <p className='text-sm'>Usual reply time 1 hour</p>
              </div>
            </div>
          </div>

          <div className='flex w-[332px] bg-white p-4 gap-3 rounded-[4px]'>
            <button className='flex w-full justify-center text-sm font-semibold gap-2 border border-black hover:border-4 rounded-[4px] p-3'>
              <PhoneIcon className='w-5 h-5' />
              <p>Phone</p>
            </button>
            <button className='flex w-full justify-center text-sm font-semibold gap-2 border border-black hover:border-4 rounded-[4px] p-3'>
              <ChatBubbleLeftIcon className='w-5 h-5' />
              <p>Message</p>
            </button>
          </div>
        </div>
      </div>

      {/* Small screen */}
      <div className='absolute top-0 w-full z-50 bg-white sm:hidden'>
        <div className='relative'>
          <Image 
            src={details?.imageURL}
            alt={details?.title}
            width={500}
            height={500}
            className='w-full h-full object-contain'
          />
          <div className='absolute w-full px-3 flex justify-between top-5'>
            <ArrowLeftIcon onClick={() => router.back()} className='w-6 h-6 text-white' />
            <div className='flex gap-3'>
              <StarIcon className='w-6 h-6 text-white' />
              <ShareIcon className='w-6 h-6 text-white' />
              <EllipsisVerticalIcon className='w-6 h-6 text-white' />
            </div>
          </div>
          <div className='flex flex-col p-2'>
            <div className='mb-3'>
              <h1 className='text-2xl capitalize'>{details?.title}</h1>
              <h1 className='text-2xl font-semibold mt-3 '>{details?.price} EUR</h1>
            </div>
            <div className='flex flex-wrap gap-3'>
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
                  2 hours ago
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <InformationCircleIcon className='w-5 h-5' />
                  ID: {id.slice(0, 8)}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <BuildingOfficeIcon className='w-5 h-5' />
                  {details?.manufacturer}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <RectangleStackIcon className='w-5 h-5' />
                  {details?.model}
                </h1>
            </div> 
          </div>

          <div className='bg-[#f1f4f5] p-2 w-full'>
            <div className='p-2 bg-white shadow-md rounded-[4px] w-full'>
              <div className='flex justify-start items-center'>
                <Image
                  src={olxMale}
                  alt="avatarphoto"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div className='flex flex-col ml-5'>
                  <h1 className='font-semibold'>{details?.createdBy}</h1>
                  <div className='flex gap-3'>
                    <Image src={medal1} alt="medal1" width={25} height={25} />
                    <Image src={medal2} alt="medal2" width={25} height={25} />
                  </div>
                  <p className='text-sm'>Usual reply time 1 hour</p>
                </div>
              </div>
            </div>

            <div className='p-2 my-2 bg-white shadow-md rounded-[4px] w-full'>
              <h4 className='uppercase text-sm'>Category</h4>
              <hr />
              <p className='text-sm mb-1'>{details?.category}</p>
              <h4 className='uppercase text-sm'>View count</h4>
              <hr />
              <p className='text-sm mb-1'>467</p>
              <h4 className='uppercase text-sm'>Created</h4>
              <hr />
              <p className='text-sm mb-1'>8 hours ago</p>
            </div>

            <div className='p-2 my-2 bg-white shadow-md rounded-[4px] w-full'>
              <h1 className='uppercase text-sm'>Characteristics</h1>
              <hr />
              <div className='p-1'>
          
              </div>
            </div>
          </div>

        </div>
      </div>

      
    </div>
  )
}

export default CarsDetails