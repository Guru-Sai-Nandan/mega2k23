import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function validateEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}



function HomePage() {
  let [personid, setpersonid] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div className="d-flex border homepage mx-4 p-5">
      <div className="leftside me-3 my-auto">
        <div class="flex flex-col ">
          <h1 class="mb-4 font-bold  text-center lg:text-left text-2xl md:text-4xl  leading-10 flex flex-col md:gap-1">
            <span class="">Optimize Your Talent</span>
            <span class="text-primary -mt-2 md:mt-0">
              Database Intelligently!
            </span>
          </h1>
          <h2 class="text-base md:text-xl font-bold text-center lg:text-left mb-4">
            <span class="text-primary">Quick &amp; Smart Hiring&nbsp;</span>
            starts with Re-usage of the
            <span class="text-primary">existing data</span>… Interview without
            Calling the NXT Talent.
          </h2>
          <p class="text-sm md:text-lg text-center lg:text-left mb-4">
            KonnectNXT provides an AI-assisted Technology for Data
            Re-utilization that reduces the cost per hire. KonnectNXT ensures
            that the companies get Resume of the NXT hire with overall profile
            insights &amp; due diligence even before they schedule the first
            call with the potential NXT hire.
          </p>
          {/* <a
            target="_blank"
            rel="noreferrer"
            class="px-5 btn  w-fit text-base md:text-lg font-semibold lg:mx-0 text-white cursor-pointer py-2 bg-primary hover:bg-blue-600 rounded-[5px] justify-center items-center gap-2.5 inline-flex"
            href="https://bit.ly/41MBWVi"
          >
            Request a demo
          </a> */}
        </div>
      </div>
      <div className="d-flex flex-column rightside justify-content-center h-100 border-start">
        <h4 className="text-center">Enter Candidates Email</h4>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control w-50 mx-auto m-3"
          placeholder="Email"
          onChange={(e) => {
            setpersonid(e.target.value);
          }}
        />
        <button
          className="btn btn-success m-3 w-25 mx-auto"
          onClick={() => {
            if (validateEmail(personid)) {
              localStorage.setItem('email', personid);
              navigate('/profile')
            }
            else
              alert("Enter Valid Email")
          }}
        >
          Know Details
        </button>
      </div>
    </div>
  );
}

export default HomePage;