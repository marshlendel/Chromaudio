import React, {useState} from 'react'
import SongDisplay from "./components/SongDisplay";
import SongPlayer from "./components/SongPlayer";
import './styles/App.scss'
import musicData from './data.js'

function App() {
  const [songs, setSongs] = useState(musicData())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false);


  return (
    <div className="App">
     <SongDisplay currentSong={currentSong} />
     <SongPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
    </div>
  );
}

export default App;
