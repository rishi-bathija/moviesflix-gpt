import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constants'
// import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';

const VideoBackground = ({ movieId }) => {
    // fetch trailer 

    const [trailerId, setTrailerId] = useState(null);

    // const trailerVideo = useSelector(store => store.movies?.trailerVideo);
    // const dispatch = useDispatch();

    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const result = await data.json();
        console.log(result.results);

        const fiterData = result.results.filter((video) => video.type === "Trailer");
        const trailer = fiterData.length ? fiterData[0] : result.results[0];
        console.log(trailer);

        setTrailerId(trailer.key);

        // dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMovieVideos();
    }, []);
    // console.log('Trailer Video Key:', trailerVideo?.key);
    // to show the trailer of different movies, 1) you can either use the useState hook to change the movie trailer accordingly, OR 2) you can put the trailer into the store, and get it from there when required
    return (
        <div className='w-screen'>
            <iframe className='w-screen aspect-video' src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0`
            } title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    )
}

export default VideoBackground