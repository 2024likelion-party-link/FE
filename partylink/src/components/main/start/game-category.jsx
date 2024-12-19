import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../assets/scss/components/gameCategory.scss";
import bac2 from "../../../assets/img/bac2.svg";
import handGame from "../../../assets/img/handGame.svg";
import imgGame from "../../../assets/img/imgGame.svg";
import beforeBtn from "../../../assets/img/beforeBtn.svg";

const GameCategory = () => {
  const navigate = useNavigate();
  const { room_id } = useParams();
  const location = useLocation();
  const { nickname, isHost, participants } = location.state || {};
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const wsUrl = `wss://strawberrypudding.store/ws/room/${room_id}/`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결 성공:", wsUrl);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "game_start") {
        setModalContent(`${data.gameType} 게임이 시작됩니다.`);
        setIsNotice(true);

        const gameRoutes = {
          "손병호 게임": "/SbhGame",
          "이미지 게임": "/ImgGame",
        };

        const route = gameRoutes[data.gameType] || "/";
        setTimeout(() => {
          setIsNotice(false);
          navigate(route, { state: { room_id, nickname, gameType: data.gameType } });
        }, 3000);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [room_id, navigate]);

  const handleGameSelection = (gameType) => {
    if (isHost && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      setSelectedGame(gameType);
      setModalContent(`${gameType} 게임을 시작하시겠습니까?`);
      setShowModal(true);
    } else {
      alert("게임은 주최자만 선택할 수 있습니다.");
    }
  };

  const startGame = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "game_start", gameType: selectedGame }));
      setShowModal(false);
    } else {
      console.error("WebSocket 연결 상태가 닫혀 있습니다.");
    }
  };

  return (
    <div className="category-wrap">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalContent}</p>
            <button onClick={startGame}>게임 시작하기</button>
          </div>
        </div>
      )}

      {isNotice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalContent}</p>
          </div>
        </div>
      )}

      <div className="category-container">
        <img src={bac2} className="backgoundImg" alt="Background" />
        <p>함께 플레이 하고 싶은 게임을 선택해</p>
        <p>친구들에게 제안해보세요!</p>
        <div className="game-container">
          <div className="game-box" onClick={() => handleGameSelection("손병호 게임")}>
            <img src={handGame} className="game-img" alt="Hand Game" />
            <h4>손병호 게임</h4>
          </div>
          <div className="game-box" onClick={() => handleGameSelection("이미지 게임")}>
            <img src={imgGame} className="game-img" alt="Image Game" />
            <h4>이미지 게임</h4>
          </div>
        </div>
        <img src={beforeBtn} className="beforeBtn" alt="Before Button" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default GameCategory;
