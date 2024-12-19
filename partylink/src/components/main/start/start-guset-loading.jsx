import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../assets/scss/components/start.scss";
import bac from "../../../assets/img/bac.svg";
import person from "../../../assets/img/person.svg";
import nextBtn from "../../../assets/img/nextBtn.svg";
import beforeBtn from "../../../assets/img/beforeBtn.svg";

const StartGuestNext = () => {
  const navigate = useNavigate();
  const { room_id } = useParams();
  const location = useLocation();
  const { nickname, isHost: initialIsHost } = location.state || {};
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");
  const [isHost, setIsHost] = useState(initialIsHost || false);
  const socketRef = useRef(null);

  useEffect(() => {
    const wsUrl = `wss://strawberrypudding.store/ws/room/${room_id}/`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결 성공:", wsUrl);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "participants_update") {
        setParticipants(data.participants);
      } else if (data.type === "host_assignment") {
        setIsHost(data.is_host);
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket 에러:", err);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket 연결 종료");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [room_id]);

  useEffect(() => {
    // 참가자 5명 모두 모이면 게임 카테고리 페이지로 이동
    if (participants.length === 5) {
      navigate(`/game-category/${room_id}`, {
        state: { room_id, nickname, isHost, participants },
      });
    }
  }, [participants, navigate, room_id, nickname, isHost]);

  return (
    <div className="start-wrap">
      <div className="start-container">
        <h4>partylink</h4>
        <img src={bac} alt="bacground" className="backgoundImg" />
        <img src={person} alt="person" className="img-person" />
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
        <img src={beforeBtn} className="beforeBtn" alt="Before Button" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default StartGuestNext;
