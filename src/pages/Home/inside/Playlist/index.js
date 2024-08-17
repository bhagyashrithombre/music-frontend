import React, { useContext, useState } from "react";
import { getToken } from "../../../../utils/getLocalStorage";
import axios, { isAxiosError } from "axios";
import { useNotification } from "react-notifywave";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";

const Playlist = () => {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const [platlistName, setPlaylistName] = useState("");
    const { playlists, fetchPlaylists } = useContext(AppContext);

    const handleCreatePlaylist = async (event) => {
        try {
            event.preventDefault();

            const token = getToken();
            const url = `${process.env.REACT_APP_API_BASE}/api/playlist`;
            const response = await axios(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                data: { name: platlistName },
            });

            if (response.status === 201) {
                notify(response.data.message, "success", 3000, "contained");
                setPlaylistName("");
                fetchPlaylists(token);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                const errMsg = error.response?.data?.message || "An error occurred during create playlist";
                notify(errMsg, "error", 3000, "contained");
            } else {
                notify("An unexpected error occurred", "error", 3000, "contained");
            }
        }
    };

    return (
        <div className="playlist">
            <h1>Playlists</h1>
            <form onSubmit={handleCreatePlaylist} className="playlistForm">
                <input
                    className="input"
                    type="text"
                    placeholder="Playlist Name"
                    value={platlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
                <button type="submit" className="createButton">
                    Create
                </button>
            </form>

            <div className="playlistWrapper">
                {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <div
                            key={playlist._id}
                            className="playlistBox"
                            style={{}}
                            onClick={() => navigate(`/playlist/${playlist._id}`)}
                        >
                            <p>{playlist.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No Playlist Found</p>
                )}
            </div>
        </div>
    );
};

export default Playlist;
