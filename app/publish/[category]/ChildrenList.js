import { db } from '@/firebase'
import { collection } from 'firebase/firestore'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const ChildrenList = ({ path }) => {

  const [docs] = useCollectionData(collection(db, path))

  return (
    <>
      {docs?.map((doc) => (
        <option key={doc.id}>
          {doc.name}
        </option>
      ))}
        
    </>
  )
}

export default ChildrenList
