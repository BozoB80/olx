import React from 'react'
import CarsDetails from './CarsDetails';

const page = ({ params }) => {
  
  return (
    <div>
      <CarsDetails id={params.addId} />
    </div>
  )
}

export default page