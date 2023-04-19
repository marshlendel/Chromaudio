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
    return songs[localStorage.getItem("index")];
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [toggleLibrary, setToggleLibrary] = useState(false);

  const handleSongClick = (songInfo) => {
    setCurrentSong(songInfo);
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
