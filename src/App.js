import React, { useState, useEffect } from "react";
import SongDisplay from "./components/SongDisplay";
import SongPlayer from "./components/SongPlayer";
import "./styles/App.scss";
import musicData from "./data.js";
import Library from "./components/Library";
import Navbar from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(musicData());
  const [currentSong, setCurrentSong] = useState(() => {
    return songs[localStorage.getItem("index")] || songs[0];
  });
  const [songInfo, setSongInfo] = useState(() => {
    const time = localStorage.getItem("time") ? localStorage.getItem("time") : 0
    return {
      duration: 0,
      currentTime: time
    };
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [toggleLibrary, setToggleLibrary] = useState(false);

  const handleSongClick = (songInfo) => {
    setCurrentSong(songInfo);
    setSongInfo({...songInfo, currentTime: 0})
  };

  const setActiveSong = (index) => {
    setSongs(
      songs.map((song, i) => {
        if (index === i) {
          return { ...song, active: true };
        }
        return { ...song, active: false };
      })
    );
  };

  useEffect(() => {
    (async function () {
      const index = songs.findIndex((element) => element.id === currentSong.id);
      await setActiveSong(index);
      localStorage.setItem("index", index);
    })();
  }, [currentSong]);

  return (
    <div className={`App ${toggleLibrary ? 'library-active' : ''}`}>
      <Navbar
        toggleLibrary={toggleLibrary}
        setToggleLibrary={setToggleLibrary}
      />
      <SongDisplay currentSong={currentSong} />
      <SongPlayer
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        setToggleLibrary={setToggleLibrary}
        toggleLibrary={toggleLibrary}
        onSongClick={handleSongClick}
        songs={songs}
      />
    </div>
  );
}

export default App;
