import React from 'react'
import CarsForm from './CarsForm'


const Publish = ({ params }) => {
  
  return (
    <div>
      {params.category === "Cars" ? <CarsForm /> : "Not here"}
      
    </div>
  )
}

export default Publish
