import { useState, useRef } from "react";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SongPlayer = ({ currentSong, isPlaying, setIsPlaying }) => {
  const { audio } = currentSong;
  const audioRef = useRef();
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
  });

  const handlePlayClick = () => {
    setIsPlaying((prevValue) => !prevValue);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleAudioPlayback = (e) => {
    const time = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      currentTime: time,
      duration,
    });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const handleInputChange = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
    audioRef.current.currentTime = e.target.value;
  };

  return (
    <div className="song-controls">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={(e) => handleInputChange(e)}
          type="range"
          name=""
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration}
          step=".01"
          id=""
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft size="32px" />
        {isPlaying ? (
          <FaPause onClick={handlePlayClick} size="32px" />
        ) : (
          <FaPlay onClick={handlePlayClick} size="32px" />
        )}
        <FaAngleRight size="32px" />
      </div>
      <audio
        onTimeUpdate={(e) => handleAudioPlayback(e)}
        onLoadedMetadata={(e) => handleAudioPlayback(e)}
        ref={audioRef}
        src={audio}
      ></audio>
    </div>
  );
};

export default SongPlayer;
