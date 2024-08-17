import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Header = () => {
    const { setIsAuthenticated, setUserInfo } = useContext(AppContext);

    const logout = () => {
        localStorage.removeItem("music_token");
        setIsAuthenticated(false);
        setUserInfo({ name: "", email: "", id: "" });
    };

    return (
        <header className="header">
            <h3>Music Player 🎧</h3>
            <button className="button" onClick={logout}>
                Logout
            </button>
        </header>
    );
};

export default Header;
