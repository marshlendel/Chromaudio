import React, { useState, useEffect } from "react";
import SongDisplay from "./components/SongDisplay";
import SongPlayer from "./components/SongPlayer";
import "./styles/App.scss";
import musicData from "./data.js";
import Library from "./components/Library";
import Navbar from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(musicData());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toggleLibrary, setToggleLibrary] = useState(false)

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

  const handlePrevClick = ({ setSongInfo, songInfo, audioRef }) => {
    if (songInfo.currentTime >= 2) {
      setSongInfo({
        ...songInfo,
        currentTime: 0,
      });
      audioRef.current.currentTime = 0;
    } else {
      const index = songs.findIndex((element) => element.id === currentSong.id);
      if (index > 0) {
        setCurrentSong(songs[index - 1]);
      }
    }
  };

  const handleNextClick = () => {
    const index = songs.findIndex((element) => element.id === currentSong.id);
    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
  };

  useEffect(() => {
    const index = songs.findIndex((element) => element.id === currentSong.id);
    setActiveSong(index);
  }, [currentSong]);
  
  return (
    <div className="App">
      <Navbar toggleLibrary={toggleLibrary} setToggleLibrary={setToggleLibrary} />
      <SongDisplay currentSong={currentSong} />
      <SongPlayer
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library toggleLibrary={toggleLibrary} onSongClick={handleSongClick} songs={songs} />
    </div>
  );
}

export default App;
