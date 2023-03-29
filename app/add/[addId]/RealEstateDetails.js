'use client'

import { auth, db } from '@/firebase';
import { BuildingOfficeIcon, ChatBubbleLeftIcon, ClockIcon, EyeIcon, HeartIcon, InformationCircleIcon, MapPinIcon, PhoneIcon, RectangleStackIcon, ShareIcon, StarIcon, TagIcon } from '@heroicons/react/24/outline';
import { ArrowLeftIcon, ChatBubbleLeftRightIcon, EllipsisVerticalIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/navigation';
import olxMale from '../../../assets/olx-male.svg'
import medal1 from '../../../assets/medal1.png'
import medal2 from '../../../assets/medal2.png'
import { getTimeAgo } from '@/utils/dateUtils';

const RealEstateDetails = ({ id, details }) => {
  
  const router = useRouter()

  // const createdAt = details?.createdAt.toDate();
  // const timeAgo = getTimeAgo(createdAt);


  return (
    <div className='bg-[#f1f4f5] w-full py-10 flex justify-center items-start gap-6 '>
      <div className='hidden sm:flex w-[1180px] gap-6'>
      <div className=' flex flex-col space-y-4'>
        {/* Main details */}
        <div className='w-[832px] bg-white p-4 rounded-[4px]'>
          <div className='flex flex-col w-full space-y-3'>
            <h1 className='text-2xl uppercase'>{details?.title}</h1>
            <h1 className='text-3xl font-bold'>{details?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</h1>
            <div className='flex justify-between items-center'>
              <p>{details?.category}</p>
              <div className='flex gap-3'>
                <ShareIcon className='w-6 h-6' />
                <HeartIcon className='w-6 h-6' />
              </div>
            </div>
            <Image 
              src={details?.imgUrls[0]}
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
                {details?.address}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <TagIcon className='w-5 h-5' />
                {details?.type}
              </h1>
              <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                <ClockIcon className='w-5 h-5' />
                Created: 
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
                  <td className='text-black/80'>{details?.furnished}</td>
                </tr>                
                {/* <tr className='flex justify-between py-2'>
                  <td>Memory:</td>
                  <td className='text-black/80'>{details?.memory}</td>
                </tr>                
                <tr className='flex justify-between py-2'>
                  <td>RAM:</td>
                  <td className='text-black/80'>{details?.ram}</td>
                </tr>                
                <tr className='flex justify-between py-2'>
                  <td>Flash:</td>
                  <td className='text-black/80'>{details?.flash}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Color:</td>
                  <td className='text-black/80'>{details?.color}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Operating System:</td>
                  <td className='text-black/80'>{details?.system}</td>
                </tr>
                <tr className='flex justify-between py-2'>
                  <td>Screen size:</td>
                  <td className='text-black/80'>{details?.screen}"</td>
                </tr> */}
              </tbody>
            </table>

            <div>
              <h1 className='text-2xl'>Detailed description:</h1>
              <h1 className='py-2'>{details?.description}</h1>
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
                  {/* <h1 className='font-semibold'>{details?.createdBy}</h1> */}
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
            src={details?.imgUrls}
            alt={details?.title}
            width={500}
            height={500}
            className='w-full h-[300px] object-contain'
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
              <h1 className='text-2xl font-semibold mt-3'>{details?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} EUR</h1>
            </div>
            <div className='flex flex-wrap gap-3'>
                {/* <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <MapPinIcon className='w-5 h-5' />
                  {details?.region}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <TagIcon className='w-5 h-5' />
                  {details?.state}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <ClockIcon className='w-5 h-5' />
                  {timeAgo}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <InformationCircleIcon className='w-5 h-5' />
                  ID: {id.slice(0, 8)}
                </h1>
                <h1 className='flex items-center text-xs gap-1 border border-black p-1 rounded-[4px]'>
                  <BuildingOfficeIcon className='w-5 h-5' />
                  {details?.manufacturer}
                </h1> */}
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
                  {/* <h1 className='font-semibold'>{details?.createdBy}</h1> */}
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
              {/* <p className='text-sm mb-1'>{timeAgo}</p> */}
            </div>

            {/* <div className='p-2 my-2 bg-white shadow-md rounded-[4px] w-full'>
              <h1 className='uppercase text-sm'>Characteristics</h1>
              <hr />
              <table className='flex w-full'>
                <tbody className='grid grid-cols-1 w-full text-xs capitalize'>
                  <tr className='flex justify-between px-1'>
                    <td>Flash:</td>
                    <td className='text-black/80'>{details?.flash}</td>
                  </tr>
                  <tr className='flex justify-between bg-[#f1f4f5] px-1 rounded-sm'>
                    <td>Color:</td>
                    <td className='text-black/80'>{details?.color}</td>
                  </tr>
                  <tr className='flex justify-between px-1'>
                    <td>Operating System:</td>
                    <td className='text-black/80'>{details?.system}</td>
                  </tr>
                  <tr className='flex justify-between bg-[#f1f4f5] px-1 rounded-sm'>
                    <td>Screen size:</td>
                    <td className='text-black/80'>{details?.screen}</td>
                  </tr>
                  <tr className='flex justify-between px-1'>
                    <td>Memory:</td>
                    <td className='text-black/80'>{details?.memory}</td>
                  </tr>
                  <tr className='flex justify-between bg-[#f1f4f5] px-1 rounded-sm'>
                    <td>RAM:</td>
                    <td className='text-black/80'>{details?.ram}</td>
                  </tr>
                </tbody>
              </table>
            </div> */}

            <div className='p-2 my-2 bg-white shadow-md rounded-[4px] w-full'>
              <h4 className='uppercase text-sm'>Detailed description</h4>
              <h1 className='text-xs'>{details?.description}</h1>
            </div>

            <button className='flex w-full py-1 gap-3 justify-center items-center border border-black rounded-[4px]'>
              <ChatBubbleLeftRightIcon className='w-5 h-5' />
              <h1 className='uppercase text-sm'>Questions & Answers (0)</h1>
            </button>

            <div className='p-2 my-4 bg-white shadow-md rounded-[4px] w-full'>
              <h4 className='uppercase text-xs'>Similar adds</h4>
            </div>

            <button className='flex w-full py-1 gap-3 justify-center items-center border border-black rounded-[4px]'>
              <ExclamationCircleIcon className='w-5 h-5' />
              <h1 className='uppercase text-xs'>Report add</h1>
            </button>


          </div>
        </div>
      </div>    
    </div>
  )
}

export default RealEstateDetails