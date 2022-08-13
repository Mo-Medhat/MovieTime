import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return <>
  <div className="mt-5 pt-5">
    <div className="container d-flex justify-content-center align-items-center">
      <div className="notFound text-center">
        <h2 className="my-4">Page Not Found<br /></h2>
        <h1 className="my-4">4 0 4</h1>
        <p className="my-4">You Can Go Back To <Link to="/MovieTime">Home</Link></p>
      </div>
    </div>
  </div>
  </>
}

export default PageNotFound