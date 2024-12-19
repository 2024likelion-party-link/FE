import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../assets/css/SbhGame.module.css"; // CSS 모듈 임포트
import finger5 from "../../assets/img/5.png";
import finger4 from "../../assets/img/4.png";
import finger3 from "../../assets/img/3.png";
import finger2 from "../../assets/img/2.png";
import finger1 from "../../assets/img/1.png";
import finger0 from "../../assets/img/0.png";
import Modal from "react-modal";
import game_info from "../../assets/img/game_info.svg";
import img_game from "../../assets/img/img_game.svg";
import axios from "axios";
import Cookies from "js-cookie";

const SbhGame = () => {
  const { room_id } = useParams(); // URL에서 room_id 가져오기
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const webSocket = useRef(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 모달 열기/닫기 함수
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [fingerCount, setFingerCount] = useState(5); // 손가락 개수를 상태로 관리

  // 손가락 줄이기 함수
  const downFinger = () => {
    setFingerCount((prev) => Math.max(prev - 1, 0)); // 손가락 개수를 0 이하로 줄이지 않음
  };

  // 손가락 이미지 배열
  const fingerImages = [finger0, finger1, finger2, finger3, finger4, finger5];

  // 비동기 함수로 user_id를 쿠키에 저장
  const authenticateUser = async () => {
    try {
      const user_id = Cookies.get("user_id"); // 쿠키에서 user_id 가져오기
      const response = await axios.post(`${BASE_URL}/ws/game/${room_id}/`, { user_id: user_id });

      const { user_id: returnedUserId } = response.data;

      // user_id를 쿠키에 저장 (유효 기간 설정 가능)
      Cookies.set("user_id", returnedUserId, { expires: 1 }); // 1일 동안 유지

      // 쿠키를 통해 사용자 인증 확인
      const storedUserId = Cookies.get("user_id");
      if (storedUserId) {
        console.log("User authenticated:", storedUserId);
      } else {
        console.error("Failed to authenticate user.");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  };

  useEffect(() => {
    // authenticateUser 호출
    authenticateUser();

    webSocket.current = new WebSocket(`${BASE_URL}/ws/game/${room_id}/`);
    webSocket.current.onopen = () => {
      console.log("WebSocket 연결!");
    };

    webSocket.onerror = (err) => {
      console.error("WebSocket 에러:", err);
    };

    webSocket.onclose = () => {
      console.log("WebSocket 연결 종료");
    };
  }, [room_id]);

  return (
    <>
      <header>
        <div className={styles.logo}>partylink</div>
        <div className={styles.game}>
          <div className={styles.game_name}>손병호 게임</div>
          <div className={styles.game_info}>
            <img src={game_info} alt="게임 설명" onClick={openModal} />
          </div>
        </div>
      </header>
      <main>
        <div className={styles.game_box}>
          <div className={styles.user_po1}>
            <div className={`${styles.user} ${styles.user1}`}>
              <img className={`${styles.user_img} ${styles.myturn_img}`} src={finger5} alt="상대 손" />
              <div className={`${styles.user_name} ${styles.myturn}`}>닉네임</div>
            </div>
            <div className={`${styles.user} ${styles.user2}`}>
              <img className={styles.user_img} src={finger5} alt="상대 손" />
              <div className={styles.user_name}>닉네임</div>
            </div>
          </div>

          <div className={styles.user_po2}>
            <div className={`${styles.user} ${styles.user3}`}>
              <img className={styles.user_img} src={finger5} alt="상대 손" />
              <div className={styles.user_name}>닉네임</div>
            </div>
            <div className={`${styles.user} ${styles.user4}`}>
              <img className={styles.user_img} src={finger5} alt="상대 손" />
              <div className={styles.user_name}>닉네임</div>
            </div>
          </div>

          <div className={styles.user_po3}>
            <div className={`${styles.user} ${styles.me}`} onClick={downFinger}>
              <img className={styles.user_img} src={fingerImages[fingerCount]} alt="손가락 접기" />
              <div className={styles.user_name}>닉네임 (나)</div>
            </div>
          </div>
        </div>
      </main>
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
    </>
  );
};

export default SbhGame;
