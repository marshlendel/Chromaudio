import LibrarySong from "./LibrarySong"

const Library = ({songs, onSongClick}) => {

    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-list">
                {songs.map(song => <LibrarySong key={song.id} onSongClick={onSongClick} song={song} />)}
            </div>
        </div>
    )
}

export default Library