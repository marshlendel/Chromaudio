import SongDisplay from "./components/SongDisplay";
import SongPlayer from "./components/SongPlayer";
import './styles/App.scss'

function App() {
  return (
    <div className="App">
     <SongDisplay />
     <SongPlayer />
    </div>
  );
}

export default App;
