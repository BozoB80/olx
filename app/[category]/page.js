import CarsDisplay from '@/components/adds/carsPage/CarsDisplay';
import MobilesDisplay from '@/components/adds/mobilesPage/MobilesDisplay'
import React from 'react'

const page = ({params}) => {
  
  return (
    <div>
      {params.category === 'Cars' ? <CarsDisplay /> :
       params.category === 'Mobile%20Phones' ? <MobilesDisplay /> :
       <h1>Not available yet</h1>}
    </div>
  )
}

export default page
