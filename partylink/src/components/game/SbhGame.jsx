import React, { useState } from "react";
import styles from "../../assets/css/SbhGame.module.css"; // CSS 모듈 임포트
import finger5 from "../../assets/img/5.png";
import finger4 from "../../assets/img/4.png";
import finger3 from "../../assets/img/3.png";
import finger2 from "../../assets/img/2.png";
import finger1 from "../../assets/img/1.png";
import finger0 from "../../assets/img/0.png";

const SbhGame = () => {
  const [fingerCount, setFingerCount] = useState(5); // 손가락 개수를 상태로 관리

  // 손가락 줄이기 함수
  const downFinger = () => {
    setFingerCount((prev) => Math.max(prev - 1, 0)); // 손가락 개수를 0 이하로 줄이지 않음
  };

  // 손가락 이미지 배열
  const fingerImages = [finger0, finger1, finger2, finger3, finger4, finger5];

  return (
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
  );
};

export default SbhGame;
