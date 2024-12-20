import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as Styled from "../chatting/chatting1.styled";
import styles from "../../assets/css/SbhGame.module.css";

// 서영
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

// 주원
import Info1 from "../../assets/img/ghksdudgody.svg";
import Info2 from "../../assets/img/Group 51.svg";
import Info3 from "../../assets/img/rlekflsms.svg";
import Info4 from "../../assets/img/slrspdlasladmlthsrkfkrdl.svg";
import Info5 from "../../assets/img/10ch.svg";
import Question from "../../assets/img/Question.svg";
import Circle from "../../assets/img/Circle.svg";
import Arrow from "../../assets/img/Arrow.svg";
import HelpImage from "../../assets/img/HELP.svg";

// 서영
const SbhGame = () => {
  const location = useLocation();
  const { room_id = "", nickname = "", gameType = "" } = location.state || {};

  const webSocket = useRef(null);
  const [participants, setParticipants] = useState([]);
  const [fingerCount, setFingerCount] = useState(5); // 손가락 개수를 상태로 관리
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 모달 열기/닫기 함수
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const sendMessage = (message) => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(JSON.stringify(message));
      console.log("Message sent:", message);
    } else {
      console.error("WebSocket is not open.");
    }
  };

  // 손가락 줄이기 함수
  const downFinger = () => {
    if (fingerCount > 0) {
      setFingerCount((prev) => prev - 1);
      sendMessage({ type: "fold" }); // 메시지 전송
    }
  };

  // 손가락 이미지 배열
  const fingerImages = [finger0, finger1, finger2, finger3, finger4, finger5];

  useEffect(() => {
    if (!room_id) {
      console.error("Invalid room_id");
      return;
    }
    const wsUrl = `wss://strawberrypudding.store/ws/game/${room_id}/`;
    webSocket.current = new WebSocket(wsUrl);

    webSocket.current.onopen = () => {
      console.log("WebSocket connected to:", wsUrl);
      const userId = Cookies.get("user_id");
      if (userId) {
        sendMessage({ type: "join", userId, nickname });
      } else {
        console.error("User ID is missing in cookies.");
      }
    };

    webSocket.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "participants_update":
            setParticipants(message.participants || []);
            break;
          case "game_started":
            console.log("Game started:", message);
            break;
          default:
            console.warn("Unknown message type:", message);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    webSocket.current.onerror = (err) => {
      console.error("WebSocket 에러:", err);
    };

    webSocket.current.onclose = () => {
      console.log("WebSocket 연결 종료, 재시도 중...");
      setTimeout(() => {
        webSocket.current = new WebSocket(wsUrl);
      }, 1000); // 1초 후 재연결
    };

    return () => {
      if (webSocket.current) webSocket.current.close();
    };
  }, [room_id, nickname]);

  useEffect(() => {
    if (participants.length > 0) {
      const userIdToSave = participants[0]?.userId;
      if (userIdToSave) {
        Cookies.set("user_id", userIdToSave, { expires: 1 });
        console.log("Saved user_id to cookies:", userIdToSave);
      }
    }
  }, [participants]);

  // 주원
  const Chatting1 = () => {
    const [messages, setMessages] = useState([
      // { text: "Q. 제일 웃음이 많은 사람은?", sender: "player" },
      // { text: "Lorem ipsum dolor sit", sender: "user" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [infoMessages, setInfoMessages] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const webSocket = useRef(null);

    useEffect(() => {
      const wsUrl = `wss://strawberrypudding/ws/game/24X1CNJ6Ccwf`;
      console.log("WebSocket 연결 URL:", wsUrl);

      webSocket.current = new WebSocket(wsUrl);

      webSocket.current.onopen = () => {
        console.log("Chatting WebSocket 연결 성공!");
      };

      webSocket.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          switch (message.type) {
            case "participants_update":
              setParticipants(message.participants || []);
              console.log("참가자 업데이트:", message.participants); // 디버그 로그
              break;
            case "game_start":
              console.log(`${message.gameType} 게임 시작`);
              break;
            default:
              console.warn("Unknown message type:", message);
          }
        } catch (error) {
          console.error("WebSocket 메시지 파싱 오류:", error);
        }
      };

      webSocket.current.onerror = (err) => {
        console.error("WebSocket 에러:", err);
      };

      webSocket.current.onclose = () => {
        console.log("WebSocket 연결 종료");
      };

      return () => {
        if (webSocket.current) webSocket.current.close();
      };
    }, [room_id]);

    const handleSendClick = () => {
      if (inputValue.trim() && webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
        // API 명세서에 맞는 데이터 구조로 수정
        const newMessage = {
          type: "participants_update",
          participants: [
            {
              userId: Cookies.get("user_id"), // 쿠키에서 user_id 가져오기
              nickname: nickname, // 현재 사용자의 닉네임
              is_host: true, // 호스트 여부, 필요에 따라 동적으로 변경 가능
            },
            {
              userId: "5678", // 테스트를 위한 샘플 데이터
              nickname: inputValue, // 입력값을 다른 참가자의 닉네임으로 사용
              is_host: false,
            },
          ],
        };

        console.log("전송 메시지:", newMessage);

        // WebSocket을 통해 서버로 메시지 전송
        webSocket.current.send(JSON.stringify(newMessage));
        setMessages((prev) => [...prev, { text: `참가자 업데이트: ${inputValue}`, sender: "user" }]); // 로컬 메시지 추가
        setInputValue(""); // 입력 필드 초기화
      } else {
        console.error("WebSocket 연결이 되어 있지 않거나 입력값이 없습니다.");
        console.log("WebSocket 상태:", webSocket.current?.readyState);
      }
    };

    const randomQuestions = [
      "이번 겨울에 눈싸움 한 사람 접어",
      "외국에서 길을 잃은 적 있는 사람 접어",
      "한 번도 비행기 타본 적 없는 사람 접어",
      "친구의 비밀을 지킨 적 있는 사람 접어",
      "한 달 이상 운동 안 한 사람 접어",
    ];

    const handleHelpClick = () => {
      const randomIndex = Math.floor(Math.random() * randomQuestions.length);
      const randomQuestion = randomQuestions[randomIndex];
      setInputValue(randomQuestion);
    };

    useEffect(() => {
      const timer1 = setTimeout(() => {
        if (messages.length === 0) {
          setInfoMessages((prev) => [...prev, { img: Info1, text: "환영해요! 게임을 시작하겠습니다." }]);
        }
      }, 0);

      const timer2 = setTimeout(() => {
        if (messages.length === 0) {
          setInfoMessages((prev) => [...prev, { img: Info2, text: "닉네임님의 차례입니다. 질문을 남겨주세요." }]);
        }
      }, 5000);

      const timer3 = setTimeout(() => {
        if (messages.length === 0) {
          setInfoMessages((prev) => [...prev, { img: Info3, text: "기다리는 친구들을 위해 어서 질문을 남겨주세요." }]);
        }
      }, 20000);

      const timer4 = setTimeout(() => {
        if (!gameOver) {
          setGameOver(true);
          setInfoMessages((prev) => [...prev, { img: Info4, text: "손가락이 접혔네요!" }]);
        }
      }, 30000);

      const timer5 = setTimeout(() => {
        if (gameOver) {
          setInfoMessages((prev) => [...prev, { img: Info5, text: "10초 후 게임이 종료됩니다." }]);
        }
      }, 35000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }, [gameOver, messages]);

    const combinedMessages = [...infoMessages, ...messages];

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
        {/* <main>
        <div className={styles.game_box}>
          <div className={styles.user_po1}>
            <div className={`${styles.user} ${styles.user1}`} key={participant.userId}>
              <img className={`${styles.user_img} ${styles.myturn_img}`} src={fingerImages[participant.fingers]} alt={`${participant.nickname} 손`} />
              <div className={`${styles.user_name} ${styles.myturn}`}>{participant.nickname}</div>
            </div>
            <div className={`${styles.user} ${styles.user2}`} key={participant.userId}>
              <img className={styles.user_img} src={fingerImages[participant.fingers]} alt={`${participant.nickname} 손`} />
              <div className={styles.user_name}>{participant.nickname}</div>
            </div>
          </div>

          <div className={styles.user_po2}>
            <div className={`${styles.user} ${styles.user3}`} key={participant.userId}>
              <img className={styles.user_img} src={fingerImages[participant.fingers]} alt={`${participant.nickname} 손`} />
              <div className={styles.user_name}>{participant.nickname}</div>
            </div>
            <div className={`${styles.user} ${styles.user4}`} key={participant.userId}>
              <img className={styles.user_img} src={fingerImages[participant.fingers]} alt={`${participant.nickname} 손`} />
              <div className={styles.user_name}>{participant.nickname}</div>
            </div>
          </div>

          <div className={styles.user_po3}>
            <div className={`${styles.user} ${styles.me}`} onClick={downFinger}>
              <img className={styles.user_img} src={fingerImages[fingerCount]} alt="손가락 접기" />
              <div className={styles.user_name}>{participant.nickname} (나)</div>
            </div>
          </div>
        </div>
      </main> */}

        <main>
          <div className={styles.game_box}>
            {/* user_po1 */}
            <div className={styles.user_po1}>
              {participants.slice(0, 2).map((participant, index) => (
                <div className={`${styles.user} ${index === 0 ? styles.user1 : styles.user2}`} key={participant.userId}>
                  <img
                    className={`${styles.user_img} ${index === 0 ? styles.myturn_img : ""}`}
                    src={fingerImages[participant.fingers]} // participant.fingers에 따라 이미지 변경
                    alt={`${participant.nickname} 손`}
                  />
                  <div className={`${styles.user_name} ${index === 0 ? styles.myturn : ""}`}>{participant.nickname}</div>
                </div>
              ))}
            </div>

            {/* user_po2 */}
            <div className={styles.user_po2}>
              {participants.slice(2, 4).map((participant, index) => (
                <div className={`${styles.user} ${index === 0 ? styles.user3 : styles.user4}`} key={participant.userId}>
                  <img
                    className={styles.user_img}
                    src={fingerImages[participant.fingers]} // participant.fingers에 따라 이미지 변경
                    alt={`${participant.nickname} 손`}
                  />
                  <div className={styles.user_name}>{participant.nickname}</div>
                </div>
              ))}
            </div>

            {/* user_po3 (Current User) */}
            <div className={styles.user_po3}>
              <div className={`${styles.user} ${styles.me}`} onClick={downFinger}>
                <img className={styles.user_img} src={fingerImages[fingerCount]} alt="손가락 접기" />
                <div className={styles.user_name}> (나)</div>
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
              <img src={img_game} alt="손병호게임" className={styles.img_game} />
              <div>손병호 게임</div>
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

        <Styled.ContainerAll>
          <Styled.Container>
            <Styled.ChatInfo>
              <Styled.PlayerInfo>
                {combinedMessages.map((message, index) => {
                  const isGap = index === 0 || combinedMessages[index - 1].sender !== message.sender;
                  <Styled.PlayerLabel>{nickname}</Styled.PlayerLabel>;
                  return (
                    <Styled.MessageWrapper key={index} isGap={isGap}>
                      {message.img ? (
                        <Styled.InformationWrapper>
                          {" "}
                          {/* 새로운 컨테이너로 감싸기 */}
                          <Styled.InformationImg src={message.img} alt={message.text} />
                        </Styled.InformationWrapper>
                      ) : (
                        <Styled.Message isUser={message.sender === "user"} isQuestion={message.text.startsWith("Q.")}>
                          {message.text}
                        </Styled.Message>
                      )}
                    </Styled.MessageWrapper>
                  );
                })}
              </Styled.PlayerInfo>
            </Styled.ChatInfo>

            <Styled.ChatInputWrapper isMyTurn={isMyTurn}>
              <Styled.InputContainer isMyTurn={isMyTurn}>
                <Styled.QIcon src={Question} alt="QuestionIcon" isMyTurn={isMyTurn} />
                <Styled.Input
                  type="text"
                  placeholder="대화를 시작해보세요."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  isMyTurn={isMyTurn}
                />
                <Styled.HelpText src={HelpImage} alt="Help" onClick={handleHelpClick} />
                <Styled.IconButtonAll onClick={handleSendClick}>
                  <Styled.IconButton1 src={Circle} alt="SendIcon" />
                  <Styled.IconButton2 src={Arrow} alt="SendIcon" />
                </Styled.IconButtonAll>
              </Styled.InputContainer>
            </Styled.ChatInputWrapper>
          </Styled.Container>
        </Styled.ContainerAll>
      </>
    );
  };

  return <Chatting1 />;
};

export default SbhGame;
