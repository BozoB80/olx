import React from 'react'
import CarsForm from './CarsForm'
import MobilePhonesForm from './MobilePhonesForm'
import RealEstateForm from './RealEstateForm'


const Publish = ({ params }) => {

  return (
    <>
      {
        params.category === "Cars" ? <CarsForm /> :
        params.category === "Mobile%20Phones" ? <MobilePhonesForm /> :
        params.category === "Real%20Estate" ? <RealEstateForm /> :
        "Form not available yet"
      }
    </>
  )
}

export default Publish
