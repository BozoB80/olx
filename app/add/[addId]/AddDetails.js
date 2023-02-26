import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

const AddDetails = () => {
  const [data] = useCollection("products")
  console.log(data);
  return (
    <div>AddDetails</div>
  )
}

export default AddDetails