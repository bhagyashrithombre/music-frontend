import React, { useContext, useMemo, useState } from "react";
import { useNotification } from "react-notifywave";
import { getToken } from "../../../../utils/getLocalStorage";
import axios, { isAxiosError } from "axios";
import { AppContext } from "../../../../context/AppContext";

const AddSong = () => {
    const { notify } = useNotification();
    const [selectedSongId, setSelectedSongId] = useState("");
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const { playlists, fetchSongs, songs, fetchPlaylists } = useContext(AppContext);

    const handleAddSong = async (event) => {
        try {
            event.preventDefault();
            const token = getToken();
            const url = `${process.env.REACT_APP_API_BASE}/api/playlist/add/${selectedPlaylistId}`;
            const response = await axios(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                data: { songId: selectedSongId },
            });

            if (response.status === 200) {
                fetchSongs(token);
                fetchPlaylists(token);

                notify(response.data.message, "success", 3000, "contained");
                setSelectedSongId("");
                setSelectedPlaylistId("");
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

    const songOptions = useMemo(() => {
        if (selectedPlaylistId) {
            const playlist = playlists.find((playlist) => {
                return playlist._id === selectedPlaylistId;
            });

            if (playlist) {
                const songIds = playlist.songs.map((song) => song._id);
                console.log("🚀 ~ songOptions ~ songIds:", songIds);
                return songs.filter((song) => !songIds.includes(song._id));
            }
        }
        return [];
    }, [selectedPlaylistId, playlists, songs]);

    return (
        <div className="addSongRoot">
            <h3>Add Song</h3>
            <form onSubmit={handleAddSong} className="songForm">
                <select value={selectedPlaylistId} onChange={(e) => setSelectedPlaylistId(e.target.value)} className="input">
                    <option value="">Select Playlist</option>
                    {playlists.map((playlist) => (
                        <option key={playlist._id} value={playlist._id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>

                <select value={selectedSongId} onChange={(e) => setSelectedSongId(e.target.value)} className="input">
                    <option value="">Select Song</option>
                    {songOptions.map((song) => (
                        <option key={song._id} value={song._id}>
                            {song.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="button">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddSong;
