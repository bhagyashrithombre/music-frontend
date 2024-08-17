import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";

const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, currentSong } = useContext(AppContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="applayout">
            <Header />
            <main className="children">
                <Outlet context={children} />
            </main>
            <MusicPlayer song={currentSong} />
        </div>
    );
};

export default AppLayout;
