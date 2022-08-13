import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const ApiContext = createContext();

export function ApiContextProvider(props) {

    // https://api.themoviedb.org/3/search/movie?api_key=0c94118dda601b764e99fe9d2866db16&language=en-US&query=Test&page=1&include_adult=false
    let APIKey = "0c94118dda601b764e99fe9d2866db16";
    
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [trendingTv, setTrendingTv] = useState(null);
    const [trendingPersons, setTrendingPersons] = useState(null);
    
    
    async function getTrendingMovies() {
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKey}`);
      setTrendingMovies(data.results);
    }
    
    async function getTrendingTv() {
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKey}`);
      setTrendingTv(data.results);
    }
      
    
    async function getTrendingPersons() {
      let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=${APIKey}`);
      setTrendingPersons(data.results);
    };
    
    useEffect(() => {
      getTrendingMovies()
      getTrendingTv()
      getTrendingPersons()
    }, []);
    
      

    return <ApiContext.Provider value={{trendingMovies:trendingMovies, trendingTv:trendingTv, trendingPersons:trendingPersons}}>
        {props.children}
    </ApiContext.Provider>
}
 