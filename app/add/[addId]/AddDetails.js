'use client'

import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

const AddDetails = ({id}) => {
  const [adds, setAdds] = useState(null)

  const [details] = useDocumentData(doc(db, "products", id))
    
  return (
    <div>
      <h1>{details?.title}</h1>
      AddDetails
    </div>
  )
}

export default AddDetails