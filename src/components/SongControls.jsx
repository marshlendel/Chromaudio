import {FaPlay, FaAngleLeft, FaAngleRight} from 'react-icons/fa'

const SongControls = () => {
    return (
        <div className="song-controls">
            <h1>Controls</h1>
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" name="" id="" />
                <p>End Time</p>
            </div>
            <div className="play-control">
                <FaAngleLeft size='32px'/>
                <FaPlay size='32px'/>
                <FaAngleRight size='32px' />
            </div>
        </div>
    )
}

export default SongControls