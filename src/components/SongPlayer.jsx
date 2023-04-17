import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SongPlayer = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  onPrevClick,
  onNextClick,
}) => {
  const { audio } = currentSong;
  const audioRef = useRef();
  const [isLifted, setIsLifted] = useState(false);
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
  });

  const handlePlayClick = () => {
    setIsPlaying((prevValue) => !prevValue);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== "undefined") {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
  };

  const handleAudioPlayback = (e) => {
    if (!isLifted) {
      const time = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo((prevValue) => {
        return {
          currentTime: time,
          duration: isNaN(duration) ? prevValue.duration : duration,
        };
      });
    }
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
  };

  const handleInputMousedown = (e) => {
    setIsLifted(true);
  };

  const handleInputMouseup = (e) => {
    setIsLifted(false);
    audioRef.current.currentTime = e.target.value;
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", onNextClick);
    return () => {
      const audioElement = audioRef.current;
      audioElement.removeEventListener("ended", onNextClick);
    };
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== "undefined") {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
  }, [songInfo]);

  return (
    <div className="song-controls">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={(e) => handleInputChange(e)}
          onMouseDown={(e) => handleInputMousedown(e)}
          onMouseUp={handleInputMouseup}
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
        <FaAngleLeft
          onClick={() => onPrevClick({ songInfo, setSongInfo, audioRef })}
          size="32px"
        />
        {isPlaying ? (
          <FaPause onClick={handlePlayClick} size="32px" />
        ) : (
          <FaPlay onClick={handlePlayClick} size="32px" />
        )}
        <FaAngleRight onClick={onNextClick} size="32px" />
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
