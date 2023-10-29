import React, { useEffect, useState } from 'react'
import Profile from './Profile';
import Skills from './Skills';
import Linkedin from './Linkedin';
import axios from 'axios';
import Quiz from '../Quiz'
import {Link } from 'react-router-dom'
function ProfilePage() {
  const email = localStorage.getItem('email');
  const [sentimentResults, setSentimentResults] = useState(null);

  useEffect(() => {
    console.log(email, 'email....')
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/sentiment-analysis`, {
          params: {
            email: email,
          },
        });
        setSentimentResults(response.data);
        console.log(response.data, 'frontend........')
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [email])

  return (
    <div className='row'>
      <div className="col-sm-3 m-0 p-0">
        <div className='p-5'>
          <div className='mx-5 mb-5 mt-0' >
            <img src={"https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} alt="" />
          </div>
          <p>Profile</p>
          <p>description: {sentimentResults?.description}</p>
          <p>email: {sentimentResults?.mail_id}</p>
          <p>DOB: {sentimentResults?.DOB}</p>
          <p>location: {sentimentResults?.location}</p>
          <p>id: {sentimentResults?.user_id}</p>
        </div>
      </div>
      <div className="col-sm-9 m-0 p-0">
        <div className="skills border rounded my-4 py-2">
          <h1>{sentimentResults?.message}</h1>
          <h1>{sentimentResults?.overallSentiment}</h1>
          <h1>{sentimentResults?.category}</h1>
        </div>
        <hr />
        <div className="linkedin">
          <Linkedin />
          <Link to={'/quiz'}>Take Test</Link>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage