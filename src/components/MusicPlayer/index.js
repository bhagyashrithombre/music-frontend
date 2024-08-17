// import React, { useEffect, useRef, useState } from "react";
// import { setCurrentTimeToLS } from "../../utils/setLocalStorage";
// import { getCurrentTime } from "../../utils/getLocalStorage";

// const MusicPlayer = ({ song }) => {
//     const audioRef = useRef(null);
//     const [currentTime, setCurrentTime] = useState(0);

//     const handleTimeUpdate = () => {
//         const currentTime = audioRef.current.currentTime;
//         setCurrentTimeToLS(currentTime);
//     };

//     useEffect(() => {
//         const savedTime = getCurrentTime();
//         if (savedTime && song === audioRef.current.src) {
//             setCurrentTime(parseFloat(savedTime));
//         }
//     }, [song]);

//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.pause();
//             audioRef.current.load();

//             const savedTime = getCurrentTime();

//             if (savedTime && song === audioRef.current.src) {
//                 audioRef.current.currentTime = parseFloat(savedTime);
//                 setCurrentTime(parseFloat(savedTime));
//             } else {
//                 audioRef.current.currentTime = 0;
//                 setCurrentTime(0);
//                 setCurrentTimeToLS(0);
//             }

//             audioRef.current.play();
//         }
//     }, [song]);

//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.currentTime = currentTime;
//         }
//     }, [currentTime]);

//     return (
//         <div className="musicplayer">
//             <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={song} controls />
//             {/* <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button> */}
//         </div>
//     );
// };

// export default MusicPlayer;

import React, { useEffect, useRef, useState } from "react";
import { setCurrentTimeToLS } from "../../utils/setLocalStorage";
import { getCurrentTime } from "../../utils/getLocalStorage";

const MusicPlayer = ({ song }) => {
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [userInteracted, setUserInteracted] = useState(false);

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        setCurrentTimeToLS(currentTime);
    };

    // Track user interaction
    useEffect(() => {
        const handleUserInteraction = () => {
            setUserInteracted(true);
        };

        document.addEventListener("click", handleUserInteraction);
        document.addEventListener("keydown", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
            document.removeEventListener("keydown", handleUserInteraction);
        };
    }, []);

    useEffect(() => {
        const savedTime = getCurrentTime();
        if (savedTime && song === audioRef.current.src) {
            setCurrentTime(parseFloat(savedTime));
        }
    }, [song]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load(); // Load the new song
            const savedTime = getCurrentTime();
            if (savedTime && song === audioRef.current.src) {
                audioRef.current.currentTime = parseFloat(savedTime);
                setCurrentTime(parseFloat(savedTime));
            } else {
                audioRef.current.currentTime = 0; // Reset time for the new song
                setCurrentTime(0);
                setCurrentTimeToLS(0);
            }

            if (userInteracted) {
                audioRef.current.play().catch((error) => {
                    console.error("Error playing the audio:", error);
                });
            }
        }
    }, [song, userInteracted]);

    return (
        <div className="musicplayer">
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={song} controls />
        </div>
    );
};

export default MusicPlayer;
