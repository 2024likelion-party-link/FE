import React, { useState, useRef } from "react";
import "../assets/css/ImgGame.css";

const ImgGame = () => {
  const [lineCoords, setLineCoords] = useState(null); // SVG 선의 시작/끝 좌표
  const meRef = useRef(null); // "나" 요소의 참조

  const selectPerson = (event) => {
    const clickedUser = event.currentTarget;
    const meElement = meRef.current;

    // 클릭한 사용자와 "나"의 위치 계산
    const clickedBox = clickedUser.getBoundingClientRect();
    const meBox = meElement.getBoundingClientRect();

    const startX = meBox.left + meBox.width / 2; // "나"의 중심 X 좌표
    const startY = meBox.top + meBox.height / 2; // "나"의 중심 Y 좌표
    const endX = clickedBox.left + clickedBox.width / 2; // 클릭한 사용자의 중심 X 좌표
    const endY = clickedBox.top + clickedBox.height / 2; // 클릭한 사용자의 중심 Y 좌표

    // 끝 좌표를 약간 당겨서 화살표 길이 조정
    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy); // 거리 계산
    const offset = 53; // 끝 점 조정 길이
    const adjustedEndX = endX - (dx / length) * offset;
    const adjustedEndY = endY - (dy / length) * offset;

    setLineCoords({
      startX,
      startY,
      endX: adjustedEndX,
      endY: adjustedEndY,
    });
  };

  return (
    <main>
      <div className="game_box">
        <div className="user_po1">
          <div className="user user1" onClick={selectPerson}>
            <div className="user_img myturn_img">닉</div>
            <div className="user_name myturn">닉네임</div>
          </div>
          <div className="user user2" onClick={selectPerson}>
            <div className="user_img">닉</div>
            <div className="user_name">닉네임</div>
          </div>
        </div>

        <div className="user_po2">
          <div className="user user3" onClick={selectPerson}>
            <div className="user_img">닉</div>
            <div className="user_name">닉네임</div>
          </div>
          <div className="user user4" onClick={selectPerson}>
            <div className="user_img">닉</div>
            <div className="user_name">닉네임</div>
          </div>
        </div>

        <div className="user me" ref={meRef}>
          <div className="user_img me_img">닉</div>
          <div className="user_name">닉네임 (나)</div>
        </div>
      </div>

      {/* SVG 선 및 끝부분 원 */}
      {lineCoords && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none", // SVG가 클릭을 방해하지 않도록 설정
          }}
        >
          {/* 화살표 선 */}
          <line x1={lineCoords.startX} y1={lineCoords.startY} x2={lineCoords.endX} y2={lineCoords.endY} stroke="#C4EBE3" strokeWidth="3" />
          {/* 끝부분 원 */}
          <circle
            cx={lineCoords.endX}
            cy={lineCoords.endY}
            r="5" // 원의 반지름
            fill="#C4EBE3"
          />
        </svg>
      )}
    </main>
  );
};

export default ImgGame;
