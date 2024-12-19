import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/scss/components/start.scss";
import bac from "../../../assets/img/bac.svg";
import person from "../../../assets/img/person.svg";
import nextBtn from "../../../assets/img/nextBtn.svg";
import partylink from "../../../assets/img/partylink.svg";

const StartGuest = () => {
  const { room_id } = useParams(); // URL에서 room_id 가져오기
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const socketRef = useRef(null); // WebSocket 객체를 저장

  useEffect(() => {
    // WebSocket 연결 설정
    const wsUrl = `wss://strawberrypudding.store/ws/room/${room_id}/`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket 연결 성공:", wsUrl);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "error") {
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
      if (socketRef.current) socketRef.current.close();
    };
  }, [room_id]);

  const handleConnecting = () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      // 서버로 닉네임 전송
      const joinMessage = {
        type: "join",
        nickname: nickname.trim(),
      };
      socketRef.current.send(JSON.stringify(joinMessage));

      // 페이지 이동
      navigate(`/start-guest-loading/${room_id}`, { state: { nickname } });
    } else {
      setError("WebSocket 연결이 준비되지 않았습니다.");
    }
  };

  return (
    <div className="start-wrap">
      <div className="start-container">
        <img src={partylink} alt="partylink-logo" className="partylink-logo"></img>
        <img src={bac} alt="bacground" className="backgoundImg" />
        <img src={person} alt="person" className="img-person" />
        {/* <p className="game-loading">게임을 준비 중이에요.</p> */}
        <div className="input-css">
          <input
            placeholder="닉네임"
            className="nickname"
            style={{ marginTop: "50px" }}
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setError("");
            }}
          />
        </div>
        <div className="explain">
          <p>게임에서 사용할 본인의 닉네임을 설정해주세요.</p>
          <p>(친구들이 알아보기 쉬운 이름이나 별명을 추천해요!)</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        <img src={nextBtn} className="nextBtn" alt="Next Button" onClick={handleConnecting}></img>
      </div>
    </div>
  );
};

export default StartGuest;
