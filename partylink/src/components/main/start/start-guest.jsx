//start-guest.jsx
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
    if (!room_id) {
      console.error("room_id가 없습니다.");
      setError("방 정보를 확인할 수 없습니다.");
      return;
    }

    const wsUrl = `wss://strawberrypudding.store/ws/room/${room_id}/`;
    console.log("WebSocket URL:", wsUrl);

    // WebSocket 연결 설정
    socketRef.current = new WebSocket(wsUrl);

    // WebSocket 이벤트 핸들러 설정
    socketRef.current.onopen = () => {
      console.log("WebSocket 연결 성공:", wsUrl);
      setError("");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket 메시지 수신:", data);

        if (data.type === "error") {
          setError(data.message);
        }
      } catch (e) {
        console.error("WebSocket 메시지 파싱 오류:", e);
        setError("WebSocket 메시지를 처리하는 중 오류가 발생했습니다.");
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket 에러 발생:", err);
      setError(`WebSocket 에러: ${err.message || "알 수 없는 오류 발생"}`);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket 연결 종료:", event.code, event.reason);
      if (event.code !== 1000) {
        setError(`WebSocket 종료: 코드 ${event.code}, 이유: ${event.reason || "알 수 없음"}`);
      }
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
      const joinMessage = {
        type: "join",
        nickname: nickname.trim(),
      };
      console.log("서버로 전송된 메시지:", joinMessage);
      socketRef.current.send(JSON.stringify(joinMessage));

      navigate(`/start-guest-loading/${room_id}`, { state: { nickname } });
    } else {
      setError("WebSocket 연결이 준비되지 않았습니다.");
    }
  };

  return (
    <div className="start-wrap">
      <div className="start-container">
        <img src={partylink} alt="partylink-logo" className="partylink-logo" />
        <img src={bac} alt="배경 이미지" className="backgoundImg" />
        <img src={person} alt="사람 이미지" className="img-person" />

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
        <img src={nextBtn} className="nextBtn" alt="다음 버튼" onClick={handleConnecting} />
      </div>
    </div>
  );
};

export default StartGuest;
