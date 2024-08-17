const getToken = () => localStorage.getItem("music_token");
const getCurrentTime = () => localStorage.getItem("current_time");
const getCurrentSong = () => localStorage.getItem("current_song");

module.exports = { getToken, getCurrentTime, getCurrentSong };
