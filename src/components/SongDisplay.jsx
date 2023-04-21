const SongDisplay = ({ currentSong }) => {
  const { name, artist, id } = currentSong;

  return (
    <div className="song-display-container">
      <img src={`/assets/covers/${id}.jpg`} alt={name} />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  );
};

export default SongDisplay;
