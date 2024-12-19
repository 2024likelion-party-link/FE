import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../assets/scss/components/start.scss";
import bac from "../../../assets/img/bac.svg";
import person from "../../../assets/img/person.svg";
import nextBtn from "../../../assets/img/nextBtn.svg";
import beforeBtn from "../../../assets/img/beforeBtn.svg";

const StartGuestNext = () => {
  const navigate = useNavigate();
  const { room_id } = useParams(); // URL에서 room_id 가져오기
  const location = useLocation(); // 이전 페이지에서 전달된 닉네임 가져오기
  const { nickname } = location.state || {};
  const [participants, setParticipants] = useState([]); // 참가자 목록 상태
  const [error, setError] = useState(""); // 에러 메시지 상태 관리
  const socketRef = useRef(null); // WebSocket 객체를 저장

  useEffect(() => {
    const wsUrl = `wss://strawberrypudding.store/ws/room/${room_id}/`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결 성공:", wsUrl);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "participants_update") {
        setParticipants(data.participants); // 참가자 목록 업데이트
      } else if (data.type === "error") {
        setError(data.message);
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket 에러:", err);
      // setError("서버와 연결할 수 없습니다.");
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket 연결 종료");
    };

    // 컴포넌트 언마운트 시 WebSocket 종료
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [room_id]);

  const handleGameCategory = () => {
    // WebSocket 연결 확인 후 메시지 전송
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        type: "start_game",
        nickname: nickname,
      };
      socketRef.current.send(JSON.stringify(message));
      navigate("/game-category", { state: { room_id, nickname } });
    } else {
      setError("WebSocket이 연결되지 않았습니다.");
    }
  };

  return (
    <div className="start-wrap">
      <div className="start-container">
        <h4>partylink</h4>
        <img src={bac} alt="bacground" className="backgoundImg" />
        <img src={person} alt="person" className="img-person" />
        {/* <p className="game-loading">친구들이 접속 중이에요.</p> */}
        <div className="input-css">
          {participants.map((participant) => (
            <button key={participant.userId} className={`nickname-connected ${participant.nickname === nickname ? "highlight" : ""}`}>
              {participant.nickname}
              {participant.nickname === nickname && " (나)"}
            </button>
          ))}
        </div>
        <div className="people-num">
          <p className="num-point">{participants.length}명</p>
          <p>/ 5명</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <img src={beforeBtn} className="beforeBtn" alt="Before Button"></img>
        <img src={nextBtn} className="nextBtn" alt="Next Button" onClick={handleGameCategory}></img>
      </div>
    </div>
  );
};

export default StartGuestNext;
