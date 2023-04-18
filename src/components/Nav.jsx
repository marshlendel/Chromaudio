import { FaMusic } from "react-icons/fa";

const Navbar = ({ setToggleLibrary }) => {
  return (
    <nav>
      <h1>Chromaudio</h1>
      <button onClick={() => setToggleLibrary((prev) => !prev)}>
        Libary <FaMusic />
      </button>
    </nav>
  );
};

export default Navbar;
