import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from './../Context/ApiContext';

function People() {

  let imgUrl = "https://image.tmdb.org/t/p/original/";
  
  const {trendingPersons} = useContext(ApiContext)

  return <>

  {trendingPersons? <>
  
    <div className="homeContent">
        <div className="container">

          <div className="row mt-4 g-2">
            <div className="col-sm-12 mb-sm-2 col-md-4 d-flex align-items-center">
                <div className="movieText position-relative py-2">
                <h4 className="fw-bold mt-3">Trending <br /> TV <br /> to watch now</h4>
                <p className="text-muted">Most watched movies by days</p>
                </div>
              </div>

              {trendingPersons.map((person ,idx)=> <>
              <div key={idx} className="col-sm-4 col-md-2 contentArea">
              <Link to={`/PeopleDetails/${person.id}`}>
              <div className="personPoster text-center position-relative">
                {person.profile_path? <img className="w-100" src={`${imgUrl}${person.profile_path}`} alt={`${person.original_name} Profile`} /> : "Has not a profile image" }
                <h5 className="my-1">{person.original_name}</h5>
              </div>
              </Link>
              </div>
            </>)}

            </div>
        </div>
  </div>
  </> : <>
    <div className="vh-100 d-flex justify-content-center align-items-center">
    <i className="fa-solid fa-spin fa-spinner fa-5x text-white"></i>
  </div>
  </>}



</>
}

export default People
