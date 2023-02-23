import { db } from '@/firebase'
import { collection } from 'firebase/firestore'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const ChildrenList = ({ path }) => {
  const query = collection(db, path)
  const [docs, loading, error] = useCollectionData(query)

  return (
    <>
      {docs?.map((doc) => (
        <option key={doc.id}>
          {doc.model}
        </option>
      ))}
        
    </>
  )
}

export default ChildrenList
