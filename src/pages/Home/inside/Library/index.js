import React, { useContext } from "react";

import { AppContext } from "../../../../context/AppContext";
import { setCurrentSongToLS } from "../../../../utils/setLocalStorage";

const Library = () => {
    const { songs, setCurrentSong } = useContext(AppContext);

    return (
        <div className="songRoot">
            <h1>Library</h1>
            {songs.length > 0 ? (
                <ul className="songUlList">
                    {songs.map((song, index) => (
                        <div key={song.name} className="songWrapper">
                            <li>
                                {index + 1 + ". "}
                                {song.name}
                            </li>
                            <button
                                onClick={() => {
                                    setCurrentSong(song.url);
                                    setCurrentSongToLS(song.url);
                                }}
                                className="playButton"
                            >
                                Play
                            </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No Songs Available</p>
            )}
        </div>
    );
};

export default Library;
