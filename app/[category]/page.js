import CarsDisplay from '@/components/adds/carsPage/CarsDisplay';
import React from 'react'

const page = ({params}) => {
  
  return (
    <div>
      {params.category === 'Cars' ? <CarsDisplay /> : <h1>No way</h1>}
    </div>
  )
}

export default page
