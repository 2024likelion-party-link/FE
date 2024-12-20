import React, { useState, useRef, useEffect } from "react";
import styles from "../../assets/css/ImgGame.module.css"; // CSS 모듈 임포트
import Modal from "react-modal";
import game_info from "../../assets/img/game_info.svg";
import img_game from "../../assets/img/img_game.svg";

const ImgGame = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 모달 열기/닫기 함수
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [lineCoords, setLineCoords] = useState(null); // SVG 선의 시작/끝 좌표
  const meRef = useRef(null); // "나" 요소의 참조
  const lastClickedUserRef = useRef(null);

  const calculateCoords = (clickedUser) => {
    const meElement = meRef.current;
    if (!meElement || !clickedUser) return;

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
    const offset = 65; // 끝 점 조정 길이
    const adjustedEndX = endX - (dx / length) * offset;
    const adjustedEndY = endY - (dy / length) * offset;

    setLineCoords({
      startX,
      startY,
      endX: adjustedEndX,
      endY: adjustedEndY,
    });
  };

  // const selectPerson = (event) => {
  //   const clickedUser = event.currentTarget;
  //   lastClickedUserRef.current = clickedUser; // 마지막으로 클릭된 사용자 저장
  //   calculateCoords(clickedUser);
  // };

  // 화면 크기 변경 시 SVG 좌표 재계산
  useEffect(() => {
    const handleResize = () => {
      if (lastClickedUserRef.current) {
        calculateCoords(lastClickedUserRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const [score1, setScore1] = useState(0);
  // const [score2, setScore2] = useState(0);
  // const [score3, setScore3] = useState(0);
  // const [score4, setScore4] = useState(0);
  // const [scoreMe, setScoreMe] = useState(0);

  // const plusScore = (scoreSetter) => {
  //   scoreSetter((prevScore) => prevScore + 1);
  // };

  return (
    <div className={styles.page}>
      <header>
        <div className={styles.logo}>partylink</div>
        <div className={styles.game}>
          <div className={styles.game_name}>이미지 게임</div>
          <div className={styles.game_info}>
            <img src={game_info} alt="게임 설명" onClick={openModal} />
          </div>
        </div>
      </header>

      <main>
        {/* <div className={styles.game_box}>
          <div className={styles.user_po1}>
            <div className={`${styles.user} ${styles.user1}`} onClick={selectPerson}>
              <div className={styles.user_score} onClick={() => plusScore(setScore1)}>
                {score1}
              </div>
              <div className={`${styles.user_img} ${styles.myturn_img}`}>닉</div>
              <div className={`${styles.user_name} ${styles.myturn}`}>닉네임</div>
            </div>
            <div className={`${styles.user} ${styles.user2}`} onClick={selectPerson}>
              <div className={styles.user_score} onClick={() => plusScore(setScore2)}>
                {score2}
              </div>
              <div className={styles.user_img}>닉</div>
              <div className={styles.user_name}>닉네임</div>
            </div>
          </div>

          <div className={styles.user_po2}>
            <div className={`${styles.user} ${styles.user3}`} onClick={selectPerson}>
              <div className={styles.user_score} onClick={() => plusScore(setScore3)}>
                {score3}
              </div>
              <div className={styles.user_img}>닉</div>
              <div className={styles.user_name}>닉네임</div>
            </div>
            <div className={`${styles.user} ${styles.user4}`} onClick={selectPerson}>
              <div className={styles.user_score} onClick={() => plusScore(setScore4)}>
                {score4}
              </div>
              <div className={styles.user_img}>닉</div>
              <div className={styles.user_name}>닉네임</div>
            </div>
          </div>

          <div className={styles.user_po3}>
            <div className={`${styles.user} ${styles.me}`} ref={meRef}>
              <div className={styles.user_score} onClick={() => plusScore(setScoreMe)}>
                {scoreMe}
              </div>
              <div className={`${styles.user_img} ${styles.me_img}`}>닉</div>
              <div className={styles.user_name}>닉네임 (나)</div>
            </div>
          </div>
        </div> */}

        {/* SVG 선 및 끝부분 원 */}
        {/* {lineCoords && (
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

            <line x1={lineCoords.startX} y1={lineCoords.startY} x2={lineCoords.endX} y2={lineCoords.endY} stroke="#C4EBE3" strokeWidth="3" />

            <circle
              cx={lineCoords.endX}
              cy={lineCoords.endY}
              r="5" // 원의 반지름
              fill="#C4EBE3"
            />
          </svg>
        )} */}
      </main>

      <div className={styles.comingSoonBoxDiv}>
        <div className={styles.comingSoonBox}>Coming Soon</div>
      </div>

      <Modal
        isOpen={modalIsOpen} // 모달 열림 여부
        onRequestClose={closeModal} // 바깥 클릭 또는 ESC 키로 닫기
        ariaHideApp={false} // 기본적으로 앱이 비활성화되지 않게 설정
        className={styles.modal} // 커스텀 모달 스타일
        overlayClassName={styles.modal_overlay} // 모달 오버레이 스타일
        shouldCloseOnOverlayClick={true} // 모달 외부를 클릭하면 닫기
        shouldCloseOnEsc={true} // ESC 키를 누르면 닫기
      >
        <div className={styles.modal_content}>
          <div className={styles.title}>
            <img src={img_game} alt="이미지게임" className={styles.img_game} /> {/* 수정됨 */}
            <div>이미지 게임</div>
          </div>
          <hr />
          <div className={styles.content}>
            <p>
              플레이어들은 차례로 <span className={styles.bold}>{"여기서 제일 OO할 것 같은 사람"}</span>이라는 질문을 던집니다.{" "}
              <span className={styles.background}>(질문자의 프로필은 밝게 빛나요!)</span> 여기서 "OO"에는 특정한 특성이나 행동 예측이 들어갑니다. (ex. 여기서
              제일 잘 웃는 사람) 모든 플레이어는 해당 질문에 가장 적합하다고 생각하는 다른 플레이어를 지목합니다.{" "}
              <span className={`${styles.bold} ${styles.background}`}>상대 플레이어의 프로필을 클릭하여 지목할 수 있고, 꾹 세게 누를 시 선택 해제</span>가
              가능해요. <span className={styles.background}>(본인은 선택할 수 없습니다.)</span> 모두의 지목이 끝나면 전체 결과를 확인하고 게임은 종료됩니다.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImgGame;
