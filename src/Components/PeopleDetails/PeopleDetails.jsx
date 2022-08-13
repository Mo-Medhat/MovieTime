import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function PeopleDetails() {
    let APIKey = "0c94118dda601b764e99fe9d2866db16";
    let imgUrl = "https://image.tmdb.org/t/p/original/"
    const [person, setperson] = useState({})
    console.log(person)

    let {id} = useParams()

    async function getPersonDetails() {
        let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${APIKey}&language=en-US`)
        setperson(data)
    }

    useEffect(() => {
        getPersonDetails()
    }, [])

    function seeMoreFunc() {

        let moreText = document.querySelector("#more");
        let seeMore = document.querySelector("#seeMore");
        let description = document.querySelector(".description");

        if (seeMore.innerHTML == "See More") {
            moreText.style.display = "inline";
            description.style.color = "rgba(255, 255, 255, 0.800)";
            seeMore.innerHTML = "See Less";
        }else{
            moreText.style.display = "none";
            description.style.color = "#6c757d";
            seeMore.innerHTML = "See More";
        }
        
    }
    
  return <>
    <div className="container">
        <div className="row mt-3">  
            <div className="col-md-4 mb-sm-2">
                    <div className="peopleImage">
                        <img className="w-100" src={`${imgUrl}${person.profile_path}`} alt={`${person.name} Profile Picture`} />
                    </div>
                </div>

                <div className="col-md-8">
                <div className="peopleInfo">
                    <div className="titleName mb-3">
                        <h1>{person.name}</h1>
                    </div>
                    <span className="bg-info text-white m-1 p-1 rounded-1">{person.known_for_department}</span>
                    <div className="information mt-3">
                        <p>Birthday: {person.birthday}</p>
                        <p>Place Of Birth: {person.place_of_birth}</p>
                        <p>Popularity: {person.popularity}</p>
                        <p>Gender: {person.gender == 1 ? "Female" : "Male" }</p>
                    </div>
                    <div className="description mb-3"><> {person.biography && person.biography.length > 150?
                     <div>{person.biography.slice(0,150)}<span id="more">{person.biography.slice(150,)}</span> <span onClick={seeMoreFunc} id="seeMore" className="fw-bolder">See More</span></div>

                    : ""}
                    </>
                    </div>

                </div>
            </div>

        </div>
    </div>
  </>
}

export default PeopleDetails