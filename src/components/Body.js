import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom"
import GptSearch from './GptSearch'
import Player from './Player'
import MoviePage from './MoviePage'
import GenrePage from './GenrePage'
import UserMovies from './UserMovies'



const Body = () => {


    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/auth.user
    //             const { uid, email, displayName, photoURL } = user;
    //             dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));


    //             // navigate("/browse");
    //             // You can not use navigate inside the paarent component where the routing is happening, and can only be used in the children components, so you can add the useeffect to a place which is ther in the whole app. but is also inside the router provider. So here, it can be placed within the header component
    //         } else {
    //             // User is signed out
    //             dispatch(removeUser());
    //             // navigate("/");
    //         }
    //     });
    // }, []);

    return (
        <>
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<Login />} />
                        <Route exact path='/browse' element={<Browse />} />
                        <Route exact path='/player' element={<Player />} />
                        <Route exact path='/search/:query' element={<GptSearch />} />
                        <Route exact path='/:id' element={<MoviePage />} />
                        <Route path="/genre/:genreId/:genreName" element={<GenrePage />} />
                        <Route exact path="/mylist" element={<UserMovies />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default Body
