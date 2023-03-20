import React from 'react'
import CarsDetails from './CarsDetails';

const page = ({ params }) => {
  console.log(params);
  return (
    <div>
      <CarsDetails id={params.addId} />
    </div>
  )
}

export default page