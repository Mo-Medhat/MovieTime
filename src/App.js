import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Movies from './Components/Movies/Movies';
import TvShow from './Components/TvShow/TvShow';
import People from './Components/People/People';
import About from './Components/About/About';
import Networks from './Components/Networks/Networks';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import TvDetails from './Components/TvDetails/TvDetails';
import PeopleDetails from './Components/PeopleDetails/PeopleDetails';
import PageNotFound from './Components/PageNotFound/PageNotFound';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { ApiContextProvider } from './Components/Context/ApiContext';


function App() {
  let navigate = useNavigate();
  const [crruntUser, setcrruntUser] = useState(null)

  function GuardRoute(props) {
    if (localStorage.getItem("userToken") == null) {
      return <Navigate to="/Login" />
    }else{
      return props.children;
    }
  }

  function decodeToken() {
    let decodeToken = jwtDecode(localStorage.getItem("userToken"));
    setcrruntUser(decodeToken);
  }
  function clearUserData() {
    localStorage.removeItem("userToken");
    setcrruntUser(null);
    navigate("/Login")
  }
  
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      decodeToken()
    }
  }, [])
  

  return <>

  <ApiContextProvider>
  <Navbar crruntUser={crruntUser} clearUserData={clearUserData} />  
  <Routes>

  <Route path="Register"  element={<Register/>} />
  <Route path="Login"  element={<Login decodeToken={decodeToken}/>} />
  
  <Route path="/"  element={<Home/> } />
  <Route path="MovieTime"  element={ <Home/> } />
  
  <Route path="Movies"  element={<GuardRoute> <Movies/> </GuardRoute>} />
  <Route path="MovieDetails"  element={<GuardRoute><MovieDetails/></GuardRoute>  } >
  <Route path=":id"  element={<MovieDetails/>} />
  </Route>
  
  <Route path="TvShow"  element={ <GuardRoute> <TvShow/> </GuardRoute>} />
  <Route path="TvDetails"  element={<TvDetails/>} >
  <Route path=":id"  element={<TvDetails/>} />
  </Route>

  <Route path="People"  element={<GuardRoute> <People/> </GuardRoute>} />
  <Route path="PeopleDetails" element={<PeopleDetails/>}>
  <Route path=":id"  element={<PeopleDetails/>} />
  </Route>

  <Route path="About"  element={<About/>} />
  <Route path="Networks"  element={<Networks/>} />

  <Route path="*"  element={<PageNotFound/>} />

  </Routes>
  </ApiContextProvider>
  
  </>
}

export default App;
