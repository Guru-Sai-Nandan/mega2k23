import React from 'react'

function Profile() {

    const description="loremepmmm";
    const userImg = "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
  return (
    <div className='h-100 p-5'>
   
        <img src={userImg} height={'20px'} alt="" />
        <p>Profile</p>
        <p>description:{description}</p>
        <p>email:{description}</p>
        <p>DOB:{description}</p>
        <p>mail:{description}</p>
        <p>id:{description}</p>
    </div>
  )
}

export default Profile