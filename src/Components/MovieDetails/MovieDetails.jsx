import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function MovieDetails() {
    let APIKey = "0c94118dda601b764e99fe9d2866db16";
    const [movieInfo, setMovieInfo] = useState({});
    let imgUrl = "https://image.tmdb.org/t/p/original/"


    let {id} = useParams();

    async function getMovieDetails() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US`);
        console.log(data)
        setMovieInfo(data)
    }
    
    useEffect(() => {
        getMovieDetails();
    }, [])

  return <>
    <div className="container">
        <div className="row mt-3">

            <div className="col-md-4 mb-sm-2">
                <div className="movieImage">
                    <img className="w-100" src={`${imgUrl}${movieInfo.poster_path}`} alt={`${movieInfo.original_title} Poster`} />
                </div>
            </div>

            <div className="col-md-8">
                <div className="movieInfo">
                    <div className="titleName mb-3">
                        <h1>{movieInfo.original_title}</h1>
                        <h4 className="text-muted">{movieInfo.tagline}</h4>
                    </div>
                    <div className="genres d-flex flex-column flex-sm-row">
                    {movieInfo.genres?.map((genre, idx)=> <><span key={idx} className="bg-info text-white m-1 p-1 rounded-1">{genre.name}</span></>)}
                    </div>
                    <div className="information mt-3">
                        <p>Vote: {movieInfo.vote_average?.toFixed(1)}</p>
                        <p>Vote Count: {movieInfo.vote_count}</p>
                        <p>Popularity: {movieInfo.popularity}</p>
                        <p>Release Date: {movieInfo.release_date}</p>
                    </div>
                    <div className="description text-muted mb-3">{movieInfo.overview}</div>
                </div>
            </div>
        </div>
    </div>
  </>
}

export default MovieDetails