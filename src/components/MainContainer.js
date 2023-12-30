import React from 'react'
import { useSelector } from 'react-redux'
import VideoTtile from './VideoTtile';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);

    if (!movies) return;
    // do above step or do optional chaining as done below on movies array
    const mainMovie = movies?.[0];
    console.log(mainMovie);
    return (
        <div>
            <VideoTtile title={mainMovie?.title} overview={mainMovie?.overview} />
            <VideoBackground movieId={mainMovie?.id} />
        </div>
    )
}

export default MainContainer
