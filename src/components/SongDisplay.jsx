
const SongDisplay = ({currentSong}) => {
    const {name, cover, artist} = currentSong

    return (
        <div className="song-display-container">
            <img src={cover} />
            <h2>{name}</h2>
            <h3>{artist}</h3>
        </div>
    )
}

export default SongDisplay