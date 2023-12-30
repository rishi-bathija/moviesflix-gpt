import React from 'react'
// Import necessary components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const VideoTtile = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-12 absolute bg-gradient-to-r from-black">
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="py-4 text-lg mt-2 max-w-screen-sm text-white">{overview}</p>
            <div className="flex mt-4">
                <button className="mr-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600 focus:outline-none text-white">
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                    Play
                </button>
                <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none text-white">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    More Info
                </button>
            </div>
        </div>
    )
}

export default VideoTtile
