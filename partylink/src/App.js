import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./components/main/start/start-inviter.jsx";
import StartGuest from "./components/main/start/start-guest.jsx";
import StartGuestNext from "./components/main/start/start-guset-loading.jsx";
import GameCategory from "./components/main/start/game-category.jsx";
import GameLoading from "./components/main/start/game-loading.jsx";
import Chatting1 from "./components/chatting/chatting1.jsx";
import Chatting2 from "./components/chatting/chatting2.jsx";
import GameEnding from "./components/game/GameEnding.jsx";
import ImgGame from "./components/game/ImgGame.jsx";
import SbhGame from "./components/game/SbhGame.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        {/* start-guest 역할 (roomId 전달) */}
        <Route path="/start-guest/:room_id" element={<StartGuest />} />
        <Route path="/start-guest-loading/:room_id" element={<StartGuestNext />}></Route>
        <Route path="/game-category" element={<GameCategory />}></Route>
        <Route path="/game-loading" element={<GameLoading />}></Route>
        <Route path="/chatting1" element={<Chatting1 />}></Route>
        <Route path="/chatting2" element={<Chatting2 />}></Route>
        <Route path="/GameEnding" element={<GameEnding />}></Route>
        <Route path="/ImgGame" element={<ImgGame />}></Route>
        <Route path="/SbhGame" element={<SbhGame />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
