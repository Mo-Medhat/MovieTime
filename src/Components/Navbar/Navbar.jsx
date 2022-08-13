import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function Navbar( {crruntUser, clearUserData} ) {



  return <>
  <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div class="container-fluid ">
    <Link class="navbar-brand" to="MovieTime">NOXE</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="text-white">
      <i class="fa-solid fa-bars"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {crruntUser?  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="MovieTime">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="Movies">Movies</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="TvShow">Tv Show</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="People">People</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="About">About</Link>
        </li>
      </ul> : ''}
     
      <div className="logSide ms-auto">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {crruntUser? <> <div className="d-flex align-items-center">
            <div className="mediaIcons d-flex mx-2">
                <span className="mx-1 px-1"><i class="fa-brands fa-facebook"></i></span>
                <span className="mx-1 px-1"><i class="fa-brands fa-spotify"></i></span>
                <span className="mx-1 px-1"><i class="fa-brands fa-instagram"></i></span>
                <span className="mx-1 px-1"><i class="fa-brands fa-youtube"></i></span>
            </div>
            <span onClick={clearUserData} className="logoutBtn mx-2">Logout</span>
        </div> </>: <>
          <li class="nav-item d-flex align-items-center">
              <p className='mb-0 me-5 fw-bold'>Login to get some new features </p>
            </li>
          <li class="nav-item">
              <Link class="nav-link" to="Login">Login</Link>
            </li>
          <li class="nav-item">
              <Link class="nav-link" to="Register">Register</Link>
            </li>
        </>}

       

        
      </ul>
      </div>


    </div>
  </div>
</nav>
  </>
}

export default Navbar