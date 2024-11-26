import "./App.css";
import Gamebase from "./components/Gamebase";
// import ImgGame from "./components/ImgGame";
// import SbhGame from "./components/SbhGame";
import GameEnding from "./components/GameEnding";

const App = () => {
  return (
    <div>
      <Gamebase />
      <GameEnding />
    </div>
  );
};

export default App;
