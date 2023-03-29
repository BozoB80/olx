import React from 'react'
import Profile from './Profile'

const ProfilePage = ({ params }) => {
  const name = params.name
  
  return (
    <div>
      <Profile name={params.name} />
    </div>
  )
}

export default ProfilePage