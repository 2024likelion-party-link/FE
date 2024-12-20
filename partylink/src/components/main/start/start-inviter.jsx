//start-inviter.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/components/start.scss";
import bac from "../../../assets/img/bac.svg";
import person from "../../../assets/img/person.svg";
import nextBtn from "../../../assets/img/nextBtn.svg";
import checked from "../../../assets/img/checked.svg";
import axios from "axios";
import partylink from "../../../assets/img/partylink.svg";

const Start = () => {
  const [isLink, setIsLink] = useState(false);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리
  const [roomId, setRoomId] = useState(""); // 생성된 방 ID 저장
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleLink = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/rooms/create-room/`, { host_name: nickname });
      const { room_id, user_token } = response.data;

      // 방 ID와 주최자의 user_token을 로컬 스토리지에 저장
      localStorage.setItem("user_token", user_token);
      localStorage.setItem("room_id", room_id);

      console.log("방 생성 성공:", room_id);

      const roomUrl = `https://strawberrypudding.store/room/${room_id}`;
      navigator.clipboard.writeText(roomUrl);
      setIsLink(true);
      setTimeout(() => setIsLink(false), 3000);

      navigate(`/start-guest-loading/${room_id}`, { state: { roomId: room_id, nickname } });
    } catch (error) {
      console.error("방 생성 실패:", error.response?.data || error.message);
      alert("방 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="start-wrap">
      <div className="start-container">
        <img src={partylink} alt="Partylink logo" className="partylink-logo"></img>
        <img src={bac} alt="" className="backgoundImg" />
        <img src={person} alt="Person icon" className="img-person" />
        <div className="input-css">
          <input placeholder="닉네임" className="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          <button placeholder="링크 생성" className="link" onClick={handleLink}>
            링크 생성
          </button>
          {isLink && (
            <div className="link-wrapper">
              <img src={checked} alt="Link copied" />
              <p>링크가 복사 되었어요!</p>
            </div>
          )}
        </div>
        <div className="explain">
          <p>함께 플레이할 친구를 초대해보세요.</p>
          <p>플레이 인원이 5명일 시 게임 시작이 가능해요.</p>
          <p>링크가 있는 사용자만 함께 플레이할 수 있어요.</p>
        </div>
        <img src={nextBtn} alt="Next button" className="nextBtn"></img>
      </div>
    </div>
  );
};

export default Start;
