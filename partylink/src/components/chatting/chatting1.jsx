import React, { useState, useEffect } from "react";
import * as Styled from "./chatting1.styled";

import Info1 from "../../assets/img/ghksdudgody.svg";
import Info2 from "../../assets/img/Group 51.svg";
import Info3 from "../../assets/img/rlekflsms.svg";
import Info4 from "../../assets/img/slrspdlasladmlthsrkfkrdl.svg";
import Info5 from "../../assets/img/10ch.svg";
import Question from "../../assets/img/Question.svg";
import Circle from "../../assets/img/Circle.svg";
import Arrow from "../../assets/img/Arrow.svg";
import HelpImage from "../../assets/img/HELP.svg";

const Chatting1 = () => {
  const [messages, setMessages] = useState([]); // 채팅 메시지 배열
  const [inputValue, setInputValue] = useState(""); // 채팅 입력값
  const [isMyTurn, setIsMyTurn] = useState(false); // 내 차례 여부
  const [infoMessages, setInfoMessages] = useState([]); // 안내 멘트
  const [gameOver, setGameOver] = useState(false); // 게임 종료 여부

  const handleSendClick = () => {
    if (inputValue.trim()) {
      // 사용자가 보낸 채팅 추가
      const newMessage = { text: inputValue, sender: "user" };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsMyTurn(!isMyTurn);

      // 채팅을 보낸 후 안내 멘트가 표시되도록
      setInfoMessages((prev) => [
        ...prev,
        { img: Info4, text: "닉네임님의 손가락이 가장 먼저 접혔네요!" }, // 예시 안내 멘트
      ]);
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
    }, 0); // 첫 번째 안내 메시지 출력

    const timer2 = setTimeout(() => {
      if (messages.length === 0) {
        setInfoMessages((prev) => [...prev, { img: Info2, text: "닉네임님의 차례입니다. 질문을 남겨주세요." }]);
      }
    }, 5000); // 5초 후에 두 번째 안내 메시지 출력

    const timer3 = setTimeout(() => {
      if (messages.length === 0) {
        setInfoMessages((prev) => [...prev, { img: Info3, text: "기다리는 친구들을 위해 어서 질문을 남겨주세요." }]);
      }
    }, 20000); // 20초 후에 세 번째 안내 메시지 출력

    const timer4 = setTimeout(() => {
      if (!gameOver) {
        setGameOver(true);
        setInfoMessages((prev) => [...prev, { img: Info4, text: "손가락이 접혔네요!" }]);
      }
    }, 30000); // 손가락이 접혔을 때

    const timer5 = setTimeout(() => {
      if (gameOver) {
        setInfoMessages((prev) => [...prev, { img: Info5, text: "10초 후 게임이 종료됩니다." }]);
      }
    }, 35000); // 35초 후 게임 종료 안내

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [gameOver, messages]);

  // 메시지와 안내 멘트를 동적으로 번갈아 출력
  const combinedMessages = [...messages, ...infoMessages];

  return (
    <Styled.ContainerAll>
      <Styled.Container>
        <Styled.ChatInfo>
          <Styled.PlayerInfo>
            <Styled.PlayerLabel>플레이어1</Styled.PlayerLabel>
            {combinedMessages.map((message, index) => {
              const isGap = index === 0 || combinedMessages[index - 1].sender !== message.sender;
              return (
                <Styled.MessageWrapper key={index} isGap={isGap}>
                  {/* 이미지가 있으면 알림 멘트, 없으면 사용자 채팅 */}
                  {message.img ? (
                    <Styled.InformationImg src={message.img} alt={message.text} />
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
  );
};

export default Chatting1;
