import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from './../Context/ApiContext';

function Home() {
  let imgUrl = "https://image.tmdb.org/t/p/original/";

  const {trendingMovies, trendingTv, trendingPersons} = useContext(ApiContext)

  return <>


    {trendingMovies&&trendingTv&&trendingPersons? <>
    
      <div className="homeContent">
          <div className="container">
            <div className="row mt-4 g-2">
              
              <div className="col-sm-12 mb-sm-2 col-md-4 d-flex align-items-center">
                <div className="movieText position-relative py-2">
                <h4 className="fw-bold mt-3">Trending <br /> Movies <br /> to watch now</h4>
                <p className="text-muted">Most watched movies by days</p>
                </div>
              </div>


              {trendingMovies.map((movie ,idx)=> <>
                <div key={idx} className="col-sm-4 col-md-2 contentArea">
                  <Link to={`/MovieDetails/${movie.id}`}>
                <div className="moviePoster text-center position-relative">
                  <div className="rate bg-info p-1 position-absolute top-0 end-0">{movie.vote_average.toFixed(1)}</div>
                  <img className="w-100" src={`${imgUrl}${movie.poster_path}`} alt={`${movie.original_title} poster`} />
                  <h5 className="my-1">{movie.original_title}</h5>
                </div>
                </Link>
                </div>
              </>)}
            </div>

            <div className="row mt-4 g-2">

                <div className="col-sm-12 mb-sm-2 col-md-4 d-flex align-items-center">
                  <div className="movieText position-relative py-2">
                  <h4 className="fw-bold mt-3">Trending <br /> TV <br /> to watch now</h4>
                  <p className="text-muted">Most watched movies by days</p>
                  </div>
                </div>

                {trendingTv.map((tv ,idx)=> <>
                  <div key={idx} className="col-sm-4 col-md-2 contentArea">
                  <Link to={`/TvDetails/${tv.id}`}>
                  <div className="tvPoster text-center position-relative">
                    <div className="rate bg-info p-1 position-absolute top-0 end-0">{tv.vote_average.toFixed(1)}</div>
                    <img className="w-100" src={`${imgUrl}${tv.poster_path}`} alt={`${tv.original_name} poster`} />
                    <h5 className="my-1">{tv.original_name}</h5>
                  </div>
                  </Link>
                  </div>
                </>)}

              </div>

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

export default Home