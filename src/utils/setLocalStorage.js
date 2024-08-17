const setTokenToLS = (token) => localStorage.setItem("music_token", token);
const setCurrentTimeToLS = (currentTime) => localStorage.setItem("current_time", currentTime);
const setCurrentSongToLS = (currentSong) => localStorage.setItem("current_song", currentSong);

module.exports = { setTokenToLS, setCurrentTimeToLS, setCurrentSongToLS };
