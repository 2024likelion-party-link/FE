import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameType, setGameType] = useState("손병호 게임"); // 게임 종류를 추적하는 상태

  const handleBefore = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 'modalAfter' 클릭 시 게임 내용 변경
  const handleChangeGame = () => {
    setGameType("이미지 게임");
  };

  // 'modalBefore' 클릭 시 '손병호 게임'으로 돌아가기
  const handleChangeToHandGame = () => {
    setGameType("손병호 게임");
  };

  const handleSbhGame = () => {
    navigate("/SbhGame");
  };
  const handleImgGame = () => {
    navigate("/ImgGame");
  };
  // 페이지 로드 시 모달을 열도록 설정
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="category-wrap">
      {/* 모달 창 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <img src={handGameWhite}></img>
              <div className="next-contaiiner">
                <img
                  src={modalBefore}
                  alt="손병호 게임으로 돌아가기"
                  onClick={handleChangeToHandGame} // 버튼 클릭 시 게임 변경
                />
                <h4>{gameType}</h4> {/* 현재 게임 유형을 표시 */}
                <img src={modalAfter} alt="게임 변경 버튼" onClick={handleChangeGame} />
              </div>
              <img src={line}></img>
              <div className="modal-p">
                {gameType === "손병호 게임" ? (
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
                    <p>질문을 던집니다. 여기서 "OO"에는 특정한 특성이나 행동 예측이 들어갑니다.</p> <p>(ex. 여기서 제일 잘 웃는 사람)</p>{" "}
                    <p>모든 플레이어는 해당 질문에 가장 적합하다고</p> <p>생각하는 다른 플레이어를 지목합니다.</p>
                    <p>모두의 지목이 끝나면</p>
                    <p>전체 결과를 확인하고 최다 득표자는 1점을 획득합니다. 위의 과정을 하나의 라운드로, 5라운드를 진행 후 게임을 종료합니다.</p>
                  </>
                )}
              </div>
            </div>
            <div className="modal-bottom">
              <img src={line}></img>
              <button className="close-modal-btn" onClick={handleCloseModal}>
                게임 시작하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="category-container">
        <img src={bac2} className="backgoundImg" alt="Background"></img>
        <img src={partylink} alt="partylink-logo" style={{ position: "relative", top: "-10%", width: "300px" }}></img>
        <p>함께 플레이 하고 싶은 게임을 선택해</p>
        <p> 친구들에게 제안해보세요!</p>
        <div className="game-container">
          <div className="game-box" onClick={handleSbhGame}>
            <div className="game-flex">
              <img src={handGame} className="game-img" alt="Hand Game"></img>
              <h4>손병호 게임</h4>
            </div>
            <p>"OOO 한 사람 접어 !"</p>
          </div>
          <div className="game-box" onClick={handleImgGame}>
            <div className="game-flex">
              <img src={imgGame} className="game-img" alt="Image Game"></img>
              <h4>이미지 게임</h4>
            </div>
            <p>“여기서 제일 00할 것 같은 사람 "</p>
          </div>
          <div className="coming-soon-box">Coming Soon</div>
          <div className="coming-soon-box">Coming Soon</div>
          <div className="coming-soon-box">Coming Soon</div>
          <div className="coming-soon-box">Coming Soon</div>
        </div>
        <img src={beforeBtn} className="beforeBtn" alt="Before Button" onClick={handleBefore}></img>
      </div>
    </div>
  );
};

export default GameCategory;
