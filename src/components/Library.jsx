import LibrarySong from "./LibrarySong";

const Library = ({ songs, onSongClick, toggleLibrary, setToggleLibrary }) => {
  return (
    <div className={`library ${toggleLibrary ? "open-library" : ""}`}>
      <div className="lib-head">
        <h2>Library</h2>
        <span onClick={() => setToggleLibrary((prev) => !prev)}>X</span>
      </div>
      <div className="library-list">
        {songs.map((song) => (
          <LibrarySong key={song.id} onSongClick={onSongClick} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
