import React from 'react'
import Profile from './Profile'

const ProfilePage = ({ params }) => {
  
  return (
    <div>
      <Profile name={params.name} />
    </div>
  )
}

export default ProfilePage