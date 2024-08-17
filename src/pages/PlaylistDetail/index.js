import React, { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { setCurrentSongToLS } from "../../utils/setLocalStorage";

const PlaylistDetail = () => {
    const params = useParams();
    const playlistId = params.id;
    const { setCurrentSong, playlists } = useContext(AppContext);

    const playlist = useMemo(() => playlists.find((playlist) => playlist._id === playlistId), [playlistId, playlists]);

    return (
        <div className="playlistDetail">
            <Link to="/" className="link">
                ⏪ Back
            </Link>
            <h3>{playlist.name}</h3>
            {playlist?.songs?.length > 0 ? (
                <ul className="songUlList">
                    {playlist.songs.map((song, index) => (
                        <div key={song.name} className="songWrapper">
                            <li>{index + 1 + ". " + song.name}</li>
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
                <p>No songs</p>
            )}
        </div>
    );
};

export default PlaylistDetail;
