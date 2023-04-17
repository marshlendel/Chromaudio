const LibrarySong = (props) => {
  const { name, artist, cover, active} = props.song;

  return (
    <div onClick={() =>props.onSongClick(props.song)} className={`library-song-container ${active && 'active'}`}>
      <img src={cover} alt={name} />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
