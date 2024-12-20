//game-category.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/components/gameCategory.scss";

import bac2 from "../../../assets/img/bac2.svg";
import handGame from "../../../assets/img/handGame.svg";
import imgGame from "../../../assets/img/imgGame.svg";
import handGameWhite from "../../../assets/img/handGameWhite.svg";
import imgGameWhite from "../../../assets/img/imgGameWhite.svg";
import beforeBtn from "../../../assets/img/beforeBtn.svg";
import modalBefore from "../../../assets/img/modalBefore.svg";
import modalAfter from "../../../assets/img/modalAfter.svg";
import line from "../../../assets/img/line.svg";
import partylink from "../../../assets/img/partylink.svg";

const GameCategory = () => {
  const navigate = useNavigate();
  const { room_id } = useParams();
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
      console.log("WebSocket 메시지 수신:", data);

      if (data.type === "game_selected") {
        setModalContent(`${data.game_id} 게임이 선택되었습니다.`);
        setIsNotice(true);
        setTimeout(() => setIsNotice(false), 3000);
      } else if (data.type === "game_start") {
        setModalContent(`${data.gameType} 게임이 시작됩니다.`);
        setIsNotice(true);

        const gameRoutes = {
          handgame: `/SbhGame/${room_id}`,
          imggame: `/ImgGame/${room_id}`,
        };

        const route = gameRoutes[data.game_id] || "/";
        const participants = data.participants; // 서버에서 받은 참여자 목록

        setTimeout(() => {
          setIsNotice(false);

          // 페이지 이동
          navigate(route, {
            state: { participants, gameType: data.gameType },
          });
        }, 3000);
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket 에러:", err);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket 연결 종료:", event.code, event.reason);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [room_id, navigate]);

  const handleGameSelection = (gameType) => {
    setSelectedGame(gameType);
    setModalContent(`${gameType} 게임을 시작하시겠습니까?`);
    setShowModal(true);
  };

  const startGame = () => {
    const user_token = localStorage.getItem("user_token");
    if (!user_token) {
      console.error("user_token이 없습니다. 게임을 시작할 수 없습니다.");
      return;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const selectGameMessage = {
        type: "select_game",
        user_token: user_token,
        game_id: selectedGame === "손병호 게임" ? "handgame" : "imggame",
      };
      console.log("서버로 전송된 select_game 메시지:", selectGameMessage);
      socketRef.current.send(JSON.stringify(selectGameMessage));

      // 여기서 아래 snippet으로부터 가져온 페이지 이동 로직 추가
      console.log("페이지 이동 시도");
      const route = selectedGame === "손병호 게임" ? `/SbhGame/${room_id}` : `/ImgGame/${room_id}`;
      navigate(route, {
        state: { room_id: room_id, participants: [], gameType: selectedGame },
      });

      setShowModal(false);
    } else {
      console.error("WebSocket 연결이 닫혀 있습니다.");
    }
  };

  const handleBefore = () => {
    navigate(-1);
  };

  return (
    <div className="category-wrap">
      {/* 기존 모달 코드 주석처리 부분 유지 */}
      {/*
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalContent}</p>
            <button onClick={startGame}>게임 시작하기</button>
            <button onClick={() => setShowModal(false)}>취소</button>
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
      */}

      {isNotice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalContent}</p>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              {selectedGame === "손병호 게임" ? <img src={handGameWhite} alt="handGameWhite" /> : <img src={imgGameWhite} alt="imgGameWhite" />}
              <div className="next-contaiiner">
                <h4>{selectedGame}</h4>
              </div>
              <img src={line} alt="line" />
              <div className="modal-p">
                {selectedGame === "손병호 게임" ? (
                  <>
                    <p>플레이어들은 차례로</p>
                    <p>"000한 사람 접어"라는 질문을 던집니다.</p>
                    <p>여기서 "000"에는 특정한 조건이나 상황이 들어갑니다.</p>
                    <p>(ex. 지금 흰색 상의 입고 있는 사람 접어.)</p>
                    <p>해당 조건에 해당하는 플레이어는 손가락을 하나 접습니다.</p>
                    <p>한 플레이어가 손가락을 다 접을 때 까지 질문을 계속하며,</p>
                    <p>가장 먼저 다섯 손가락을 모두 접은 플레이어가 패배합니다.</p>
                  </>
                ) : (
                  <>
                    <p>플레이어들은 차례로</p>
                    <p>
                      <strong>"여기서 제일 OO할 것 같은 사람"</strong>이라는
                    </p>
                    <p>질문을 던집니다. 여기서 "OO"에는 특정한 특성이나 행동 예측이 들어갑니다.</p>
                    <p>(ex. 여기서 제일 잘 웃는 사람)</p>
                    <p>모든 플레이어는 해당 질문에 가장 적합하다고</p>
                    <p>생각하는 다른 플레이어를 지목합니다.</p>
                    <p>모두의 지목이 끝나면</p>
                    <p>전체 결과를 확인하고 최다 득표자는 1점을 획득합니다. 위의 과정을 하나의 라운드로, 5라운드를 진행 후 게임을 종료합니다.</p>
                  </>
                )}
              </div>
            </div>
            <div className="modal-bottom">
              <img src={line} alt="line" />
              <button className="close-modal-btn" onClick={startGame}>
                게임 시작하기
              </button>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="category-container">
        <img src={bac2} className="backgoundImg" alt="Background" />
        <img src={partylink} alt="partylink-logo" style={{ position: "relative", top: "-10%", width: "300px" }} />
        <p>함께 플레이 하고 싶은 게임을 선택해</p>
        <p> 친구들에게 제안해보세요!</p>
        <div className="game-container">
          <div className="game-box" onClick={() => handleGameSelection("손병호 게임")}>
            <div className="game-flex">
              <img src={handGame} className="game-img" alt="Hand Game" />
              <h4>손병호 게임</h4>
            </div>
            <p>"OOO 한 사람</p>
            <p> 접어 !"</p>
          </div>
          <div className="game-box" onClick={() => handleGameSelection("이미지 게임")}>
            <div className="game-flex">
              <img src={imgGame} className="game-img" alt="Image Game" />
              <h4>이미지 게임</h4>
            </div>
            <p>“여기서 제일</p>
            <p> 00할 것 같은 사람"</p>
          </div>
          <div className="coming-soon-box">Coming Soon</div>
          <div className="coming-soon-box">Coming Soon</div>
          <div className="coming-soon-box">Coming Soon</div>
          <div className="coming-soon-box">Coming Soon</div>
        </div>
        <img src={beforeBtn} className="beforeBtn" alt="Before Button" onClick={handleBefore} />
      </div>
    </div>
  );
};

export default GameCategory;
