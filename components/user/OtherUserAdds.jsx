'use client'

import { auth } from '@/firebase';
import useFetchUserAdds from '../../customHooks/useFetchUserAdds'
import AddCardOther from '../adds/AddCardOther';


const OtherUserAdds = ({ id }) => {
  const { userItems } = useFetchUserAdds(auth?.currentUser?.uid)

  const filteredItems = userItems.filter((item) => item.id !== id)
  
  return (
    <div className="bg-white w-[832px] p-1 sm:p-4 rounded-[4px] flex justify-between gap-8">
      <AddCardOther adds={filteredItems} />        
    </div>
  )
}

export default OtherUserAdds;