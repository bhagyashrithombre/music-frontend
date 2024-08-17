import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getCurrentSong, getToken } from "../utils/getLocalStorage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: "", email: "", id: "" });
    const [currentSong, setCurrentSong] = useState(
        "https://pagalfree.com/musics/128-Agar%20Tum%20Saath%20Ho%20-%20Tamasha%20128%20Kbps.mp3",
    );
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    const fetchPlaylists = async (token) => {
        try {
            const url = `${process.env.REACT_APP_API_BASE}/api/playlist`;
            const response = await axios(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setPlaylists(response.data.data);
            }
        } catch (error) {}
    };

    const fetchSongs = async (token) => {
        const songUrl = `${process.env.REACT_APP_API_BASE}/api/song`;
        const songResponse = await axios(songUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        setSongs(songResponse.data.data);
    };

    const data = {
        isLoading,
        setIsLoading,
        userInfo,
        setUserInfo,
        isAuthenticated,
        setIsAuthenticated,
        currentSong,
        setCurrentSong,
        playlists,
        songs,
        setSongs,
        fetchSongs,
        fetchPlaylists,
    };

    useEffect(() => {
        const fetchUser = async (token) => {
            setIsLoading(true);
            try {
                // fetch user
                const url = `${process.env.REACT_APP_API_BASE}/api/auth`;
                const response = await axios(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserInfo({ name: response.data.data.name, email: response.data.data.email, id: response.data.data._id });
                setIsAuthenticated(true);

                // fetch songs
                await fetchSongs(token);
            } catch (error) {
                console.error("Fetch user error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const token = getToken();
        if (token) {
            fetchUser(token);
            fetchPlaylists(token);
        }

        const savedSong = getCurrentSong();
        if (savedSong) {
            setCurrentSong(savedSong);
        }
    }, []);

    return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
