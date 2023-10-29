import React, { useState } from 'react'
import Skills from './Skills';

function Linkedin() {


//Name & short
const [name , setname] = useState('Abhjith');
const [disc , setdisc] = useState('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, iusto!')
//Summary
const [summary,setsummary] = useState('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla cumque consequatur ipsam et! Laboriosam sunt ducimus asperiores quos id ut amet velit, fuga aliquid perspiciatis aliquam, facilis deleniti, neque alias.')
//Linkedin  link
const [linkedin,setlinkedin] = useState('https://konnectnxt.com/')
//endorsement Array
const [Endoresement,setEndoresement]=useState(["Next.js","Next.js","Next.js","Next.js","Next.js","Next.js","Next.js","Next.js","Next.js",]);
//Expierences
const [Experiences,setExperiences]=useState(["Amazon","Amazon","Amazon","Amazon","Amazon","Amazon","Amazon","Amazon","Amazon","Amazon",])

  return (
    <div className='h-100'>
       <h4 className='text-center fw-bold'>LinkedIn</h4>

       {/* Row-1 */}
       <div className="row my-4">
        <div className="col-sm-4 m-auto border rounded my-2">
          <h3 className='text-center'>{name}</h3>
          <p>{disc}</p>
        </div>
        <div className="col-sm-1"></div>
        <div className="col-sm-7 m-auto border rounded my-2">
          <h3 className='text-center'>Summary</h3>
          <p>{summary}</p>

        </div>
       </div>

       {/* Row-2 */}
       <div className="row my-4">
        <div className="col-sm-4 m-auto border rounded my-2">{
          <Skills/>
        }</div>
        <div className="col-sm-1"></div>
        <div className="col-sm-7 my-auto"><button className='btn bg-success'>Linkedin</button></div>
      </div>
      {/* Row-3 */}
        <div className="row my-4 gap-1 border rounded">
          <h3 className='text-center'>Endrosements</h3>
          {Endoresement.map((ed)=>
            <div className="col-sm-3 mx-auto my-2 bg-light text-center border rounded ">
              {ed}
            </div>
          )}
        </div>

        {/* Row-4 */} 
        {/* <div className="row my-4 border rounded ">
          <h3 className='text-center'>Most Recent Expierences</h3>
            {Experiences.map((ed)=>
            <div className="col-sm-5 mx-auto my-2 bg-light text-center border rounded">
              {ed}
            </div>
          )}
        </div> */}
       </div>
  )
}

export default Linkedin