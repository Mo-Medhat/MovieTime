import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function TvDetails() {
    let APIKey = "0c94118dda601b764e99fe9d2866db16";
    let imgUrl = "https://image.tmdb.org/t/p/original/"
    const [tvInfo, setTvInfo] = useState({});


    let {id} = useParams();

    async function getTvDetails() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIKey}&language=en-US`);
        setTvInfo(data)
    }
    
    useEffect(() => {
        getTvDetails();
    }, [])

  return <>
    <div className="container">
        <div className="row mt-3">

            <div className="col-md-4 mb-sm-2">
                <div className="tvImage">
                    <img className="w-100" src={`${imgUrl}${tvInfo.poster_path}`} alt={`${tvInfo.original_title} Poster`} />
                </div>
            </div>

            <div className="col-md-8">
                <div className="tvInfo">
                    <div className="titleName mb-3">
                        <h1>{tvInfo.original_title}</h1>
                        <h4 className="text-muted">{tvInfo.tagline}</h4>
                    </div>
                    <div className="genres d-flex flex-column flex-sm-row">
                    {tvInfo.genres?.map((genre, idx)=> <><span key={idx} className="bg-info text-white m-1 p-1 rounded-1">{genre.name}</span></>)}
                    </div>
                    <div className="information mt-3">
                        <p>Vote: {tvInfo.vote_average?.toFixed(1)}</p>
                        <p>Vote Count: {tvInfo.vote_count}</p>
                        <p>Popularity: {tvInfo.popularity}</p>
                        <p>Release Date: {tvInfo.release_date}</p>
                    </div>
                    <div className="description text-muted mb-3">{tvInfo.overview}</div>
                </div>
            </div>
        </div>
    </div>
  </>
}

export default TvDetails