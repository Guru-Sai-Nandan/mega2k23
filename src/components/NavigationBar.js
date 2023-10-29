import React from "react";
import { Link } from "react-router-dom"
const NavigationBar = () => {
  return (
    <div className="d-flex items-center my-2 p-4">
      <div>
        <Link>
          <img style={{width:"222px"}} src="https://i.imgur.com/LxSiQyR.png" alt="konnectnxt" />

        </Link>
      </div>
        <Link className="me-4 ms-3 fs-4 text-decoration-none text-dark">Jobs</Link>
        <Link className="me-4 fs-4 text-decoration-none text-dark">Post Jobs</Link>
        <Link className="me-4 fs-4 text-decoration-none text-dark">About Us</Link>
      <div className="ms-auto">
        <Link className="btn btn-primary me-4">Sign In</Link>
        <Link className="btn btn-danger me-4">Sign Up</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
