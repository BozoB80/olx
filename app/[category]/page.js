import CarsDisplay from '@/components/adds/carsPage/CarsDisplay';
import MobilesDisplay from '@/components/adds/mobilesPage/MobilesDisplay'
import RealEstateDisplay from '@/components/adds/realEstatePage/RealEstateDisplay';
import React from 'react'

const page = ({params}) => {
  
  return (
    <div>
      {params.category === 'Cars' ? <CarsDisplay /> :
       params.category === 'Mobile%20Phones' ? <MobilesDisplay /> :
       params.category === 'Real%20Estate' ? <RealEstateDisplay /> :
       <h1>Not available yet</h1>}
    </div>
  )
}

export default page
