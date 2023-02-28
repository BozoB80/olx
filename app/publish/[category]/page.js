import React from 'react'
import Cars from './Cars'


const Publish = ({ params }) => {
  
  return (
    <div>
      {params.category === "Cars" ? <Cars /> : "Not here"}
      
    </div>
  )
}

export default Publish
