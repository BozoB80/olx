import React from 'react'
import CarsForm from './CarsForm'


const Publish = ({ params }) => {
  
  return (
    <div>
      {params.category === "Cars" ? <CarsForm /> : "Form not available yet"}
      
    </div>
  )
}

export default Publish
