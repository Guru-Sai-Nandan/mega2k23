import React, { useEffect, useState } from 'react'
import Skills from './Skills';
import Linkedin from './Linkedin';
import axios from 'axios';
import Modal from 'react-modal';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';
import Quiz from '../Quiz'
import { Link } from 'react-router-dom'
import './ProfilePage.css'
import { BsFillPersonFill } from 'react-icons/bs'

function ProfilePage() {
  const email = localStorage.getItem('email');
  const [sentimentResults, setSentimentResults] = useState(null);
  const [loading, setLoading] = useState(false);


  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  `;

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/sentiment-analysis`, {
          params: {
            email: email,
          },
        });
        setSentimentResults(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    }
    fetchData();
  }, [email])

  return (
    <div className='row' style={{ backgroundColor: '#F4F2EE66' }}>
      <Modal className="items-center w-100 h-100 my-auto d-flex align-items-center justify-content-center"
        isOpen={loading}
        contentLabel="Loading Modal"
        ariaHideApp={false}
      >
        <div className="loading-modal">
          <PropagateLoader color="#00BFFF" css={override} />
          <h4 className='mr-2'>Loading...</h4>
        </div>
      </Modal>
      <div className="col-sm-3 border rounded bg-light">
        <div className='p-5'>
          <div className='mx-5 mb-2 mt-0' >
            <img src={"https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} alt="" />
          </div>
          <div className='d-flex align-items-center'>
            <BsFillPersonFill className='fs-2 ms-auto mb-1 me-2' />
            <h2 className='text-center me-auto'>Profile</h2>
          </div>
          <p> <span className='fw-semibold fs-5'> Name: </span>{sentimentResults?.name}</p>
          <p> <span className='fw-semibold fs-5'> Description: </span>{sentimentResults?.description}</p>
          <p><span className='fw-semibold fs-5'> Mail: </span>{sentimentResults?.mail_id}</p>
          <p><span className='fw-semibold fs-5'> DOB: </span>{sentimentResults?.DOB}</p>
          <p><span className='fw-semibold fs-5'> Location: </span>{sentimentResults?.location}</p>
          <p><span className='fw-semibold fs-5'> Connections: </span>{sentimentResults?.connections}</p>
        </div>
      </div>
      <div className="col-sm-8 ms-4 p-0">
        <hr />
        <div className="d-flex justify-content-around">
          <div className='skills col-5 border rounded p-3'>
            <h3 className='text-center'>Skills</h3>
            <div className="row">
              {sentimentResults?.skills.map((ele) => {
                return (
                  <div className='col-5  text-center border rounded m-2'>
                    <p className='fs-5 my-auto'>{ele}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='certifications col-5 border rounded p-3'>
            <h3 className='text-center'>Certifications</h3>
            <div className="row">
              {sentimentResults?.Certificates?.map((ele) => {
                return (
                  <div className='col-5 text-center border rounded m-2'>
                    <p className='fs-5 my-auto'>{ele}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div>

          </div>

        </div>

        <hr />

        <div>
          <h2>Social Media Analysis</h2>
          <div className='d-flex'>
            <h4 className='my-auto'>LinkedIn Comments: </h4>
            {
              sentimentResults?.overallSentiment === 'Negative' ?
                <h5 className='my-auto ms-2 mt-1 text-danger'>{sentimentResults?.overallSentiment}</h5>
                :
                <h5 className='my-auto ms-2 mt-1 text-success'>{sentimentResults?.overallSentiment}</h5>
            }
          </div>
          <div className='d-flex justify-content-around mt-3'>
            <div>
              <h5 className='my-auto'>Positive Comments: {sentimentResults?.positiveCount}</h5>
            </div>
            <div>
              <h5 className='my-auto'>Neutral Comments: {sentimentResults?.neutralCount}</h5>
            </div>
            <div>
              <h5 className='my-auto'>Negative Comments: {sentimentResults?.negativeCount}</h5>

            </div>
          </div>

        </div>

        <hr />

        <div className='d-flex justify-items-center'>
          <h4 className='my-auto'>Suitable Job Role for the Candidate: </h4>
          <h5 className='my-auto ms-2 mt-1'>{sentimentResults?.category}</h5>

        </div>

        <div className='d-flex justify-items-center mt-2'>
          <h4 className='my-auto'>Psychometric Test Results: </h4>
          {
            localStorage.getItem('score') ?
              <h5 className='my-auto ms-2 mt-1'>{localStorage.getItem('score')} / 25</h5> :
              (<div className='mt-2 d-flex'>
                <h5 className='my-auto ms-2'>Not Attempted</h5>
                <Link className='btn btn-primary ms-3' to={'/Quiz'}>Take Test Now</Link>
              </div>
              )
          }
        </div>
        <div className='d-flex mt-3'>
          <h4 className='my-auto'>Final Verdict: </h4>
          {localStorage.getItem('score') ? (
            (sentimentResults?.overallSentiment === 'Positive' && localStorage.getItem('score') >= 16) ? (
              <h5 className='my-auto ms-2 mt-1 text-success'>Can Be Hired</h5>
            ) : (
              <h5 className='my-auto ms-2 mt-1 text-danger'>Can Be Rejected</h5>
            )
          ) : (
            <h5 className='my-auto ms-2 mt-1'>Will be decided based on Test Result</h5>
          )}
        </div>


      </div>
    </div>
  )
}

export default ProfilePage