import React, { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import MovieListRedux from './MovieListRedux';
import { setWatchlist } from '../utils/movieSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserMovies = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const watchlist = useSelector((state) => state.movies.watchlist);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const idToken = await user.getIdToken();
                    console.log('User ID Token:', idToken); // Log the ID token

                    const response = await fetch('https://moviesflix-gpt-backend.vercel.app/api/user/watchlist', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${idToken}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Fetched watchlist:', data); // Log the response data
                        dispatch(setWatchlist(data.movies || [])); // Assuming the response has a 'movies' field
                    } else {
                        console.error('Failed to fetch watchlist, status:', response.status);
                    }
                } else {
                    console.error('User not authenticated');
                }
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            } finally {
                setLoading(false);
            }
        };

        // Check the authentication state before fetching the watchlist
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchWatchlist();
            } else {
                console.error('User not authenticated');
                setLoading(false);
            }
        });

        // Cleanup the subscription
        return () => unsubscribe();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Filter watchlist into movies and TV shows
    const movies = watchlist.filter(item => item.selectedCategory === 'movie');
    const tvShows = watchlist.filter(item => item.selectedCategory === 'tv');

    return (
        <div className='bg-black text-white h-screen w-screen overflow-x-hidden'>
            <div className="watchlist">
                {movies.length > 0 ? (
                    <MovieListRedux title={"Watchlist Movies"} movies={movies} userSelected={'movie'} isAdded={'true'} />
                ) : (
                    <p className='text-2xl flex justify-center items-center h-[200px]'>No movies in your watchlist.</p>
                )}
                {tvShows.length > 0 ? (
                    <MovieListRedux title={"Watchlist TV Shows"} movies={tvShows} userSelected={'tv'} isAdded={'true'} />
                ) : (
                    <p className='text-2xl flex justify-center items-center h-[200px]'>No TV shows in your watchlist.</p>
                )}
            </div>
        </div>
    );
};

export default UserMovies;
