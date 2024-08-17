import React from "react";
import Playlist from "./inside/Playlist";
import Library from "./inside/Library";
import AddSong from "./inside/AddSong";

const Home = () => {
    return (
        <div className="homeRoot">
            <Playlist />
            <AddSong />
            <Library />
        </div>
    );
};

export default Home;
