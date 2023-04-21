import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SongPlayer = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songs,
  songInfo,
  setSongInfo
}) => {
  const { audio } = currentSong;
  const audioRef = useRef();
  const [isLoaded, setisLoaded] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
 
  const [animationPercent, setAnimationPercent] = useState(0);

  const handlePlayClick = () => {
    if (isLoaded) {
      const playPromise = audioRef.current.play();
      setIsPlaying((prevValue) => !prevValue);
      if (isPlaying) {
        if (playPromise !== "undefined") {
          playPromise.then(() => {
            audioRef.current.pause();
            console.log('ref time after pause', audioRef.current.currentTime)
          })
          .catch(err => console.error(err))
        }
      } else {
        if (playPromise !== "undefined") {
          playPromise.then(() => {
            console.log('ref time before play', audioRef.current.currentTime)
            audioRef.current.play();
          })
          .catch(err => console.error(err))
        }
      }
    }
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
        setSongInfo({
          ...songInfo,
          currentTime: 0,
        });
        setisLoaded(false)
      }
    }
  };

  const handleNextClick = () => {
      const index = songs.findIndex((element) => element.id === currentSong.id);
      if (index === songs.length - 1) {
        setCurrentSong(songs[0]);
        setisLoaded(false)
      } else {
        setCurrentSong(songs[index + 1]);
        setisLoaded(false)
        audioRef.current.currentTime = 0;
        setSongInfo({
          ...songInfo,
          currentTime: 0,
        });
      }
  };

  const handleAudioPlayback =  (e) => {
    if(e.type === 'timeupdate') {
      console.log('timeupdate to', audioRef.current.currentTime)
    }
    if (!isLifted) {
      const time =  e.type === "loadedmetadata"
          ? localStorage.getItem("time")
          : audioRef.current.currentTime;
      const duration = e.target.duration;
      if (e.type === "loadedmetadata") {
        setisLoaded(true);
        audioRef.current.currentTime = time;
      }
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

  const handleInputChange =  (e) => {
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

  const handleSongEnded = async () => {
    const index = songs.findIndex((element) => element.id === currentSong.id);

    await setCurrentSong(songs[index + 1]);
    setisLoaded(false)
  };

  useEffect(() => {
    setAnimationPercent((songInfo.currentTime / songInfo.duration) * 100);
    localStorage.setItem("time", songInfo.currentTime);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== "undefined") {
        playPromise
          .then(() => {
            audioRef.current.play();
          })
          .catch((err) => console.error(err));
      }
    }
  }, [songInfo]);

  useEffect(() => {
    audioRef.current.currentTime = songInfo.currentTime
    console.log('currentSong useeffect', audioRef.current.currentTime, songInfo.currentTime)
 }, [currentSong])


  return (
    <div className="song-controls">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} 70%)`,
          }}
          className="track"
        >
          <input
            onChange={(e) => handleInputChange(e)}
            onMouseDown={(e) => handleInputMousedown(e)}
            onMouseUp={handleInputMouseup}
            onTouchStart={(e) => handleInputMousedown(e)}
            onTouchEnd={handleInputMouseup}
            type="range"
            name=""
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration}
            step=".01"
            id=""
          />
          <div
            style={{ transform: `translateX(${animationPercent}%)` }}
            className="track-animation"
          ></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FaAngleLeft
          onClick={() => handlePrevClick({ songInfo, setSongInfo, audioRef })}
          size="32px"
        />
        {isPlaying ? (
          <FaPause onClick={handlePlayClick} size="32px" />
        ) : (
          <FaPlay onClick={handlePlayClick} size="32px" />
        )}
        <FaAngleRight onClick={handleNextClick} size="32px" />
      </div>
      <audio
        preload="auto"
        onTimeUpdate={(e) => handleAudioPlayback(e)}
        onLoadedMetadata={(e) => handleAudioPlayback(e)}
        ref={audioRef}
        src={`/assets/songs/${currentSong.id}.mp3`}
        onEnded={handleSongEnded}
      ></audio>
    </div>
  );
};

export default SongPlayer;
