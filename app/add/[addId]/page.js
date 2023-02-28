import React from 'react'
import AddDetails from './AddDetails';

const page = ( {params} ) => {
  
  return (
    <div>
      <AddDetails id={params.addId} />
    </div>
  )
}

export default page