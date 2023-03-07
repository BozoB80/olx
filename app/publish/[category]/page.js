import React from 'react'
import CarsForm from './CarsForm'
import MobilePhonesForm from './MobilePhonesForm'


const Publish = ({ params }) => {

  return (
    <>
      {
        params.category === "Cars" ? <CarsForm /> :
        params.category === "Mobile%20Phones" ? <MobilePhonesForm /> :
        "Form not available yet"
      }
    </>
  )
}

export default Publish
