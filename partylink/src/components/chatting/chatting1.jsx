import React, { useState } from "react";
import * as Styled from "./chatting1.styled";

// import Info1 from "../../assets/img/ghksdudgody.svg";
import Info2 from "../../assets/img/Group 51.svg";
// import Info3 from "../../assets/img/rlekflsms.svg";
// import Info4 from "../../assets/img/slrspdlasladmlthsrkfkrdl.svg";
// import Info5 from "../../assets/img/10ch.svg";
// import Info6 from "../../assets/img/ehdwjawk.svg";
import Question from "../../assets/img/Question.svg";
import Circle from "../../assets/img/Circle.svg";
import Arrow from "../../assets/img/Arrow.svg";
import HelpImage from "../../assets/img/HELP.svg";

const Chatting1 = () => {
  const [messages, setMessages] = useState([
    { text: "Q. 제일 웃음이 많은 사람은?", sender: "player" },
    { text: "Lorem ipsum dolor sit", sender: "player" },
    { text: "Q. 제일 웃음이 많은 사람은?", sender: "player" },
    { text: "Q. 제일 웃음이 많은 사람은?", sender: "player" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMyTurn, setIsMyTurn] = useState(false); // 내 차례 여부 상태 추가

  const handleSendClick = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
      setIsMyTurn(!isMyTurn);
    }
  };

  const randomQuestions = [
    "이번 겨울에 눈싸움 한 사람 접어",
    "외국에서 길을 잃은 적 있는 사람 접어",
    "한 번도 비행기 타본 적 없는 사람 접어",
    "친구의 비밀을 지킨 적 있는 사람 접어",
    "한 달 이상 운동 안 한 사람 접어",
    "유명인과 사진 찍은 적 있는 사람 접어",
    "혼자서 여행 간 적 있는 사람 접어",
    "24시간 이상 잠을 잔 적 없는 사람 접어",
    "한 번도 캠핑 간 적 없는 사람 접어",
    "생일 파티를 매년 해본 사람 접어",
    "애완동물을 키운 적 있는 사람 접어",
    "한 번도 콘서트에 간 적 없는 사람 접어",
    "한 번도 자전거를 타본 적 없는 사람 접어",
    "가장 좋아하는 영화 장르가 로맨스가 아닌 사람 접어",
    "한 번도 스키를 타본 적 없는 사람 접어",
    "친구와 싸운 적 있는 사람 접어",
    "한 번도 노래방에 간 적 없는 사람 접어",
    "3개 국어를 할 수 있는 사람 접어",
    "한 번도 해변에서 일몰을 본 적 없는 사람 접어",
    "좋아하는 음식을 직접 만들어본 적 있는 사람 접어",
    "한 번도 마라톤에 참가해본 적 없는 사람 접어",
    "친구의 생일을 잊어버린 적 있는 사람 접어",
    "한 번도 도서관에서 책을 빌려본 적 없는 사람 접어",
    "좋아하는 캐릭터의 굿즈를 가진 적 있는 사람 접어",
    "한 번도 자원봉사에 참여해본 적 없는 사람 접어",
    "친구와 단둘이 여행을 가본 적이 없는 사람 접어",
    "한 번도 핸드폰 없이 하루를 보낸 적 없는 사람 접어",
    "좋아하는 노래를 부르며 길을 걸어본 적 있는 사람 접어",
    "한 번도 바다에서 수영해본 적 없는 사람 접어",
    "친구와의 약속을 한 번도 잊어본 적 없는 사람 접어",
    "한 번도 고양이를 만져본 적 없는 사람 접어",
    "생일 케이크를 직접 만들어본 적 있는 사람 접어",
    "한 번도 해외여행을 가본 적 없는 사람 접어",
    "한 번도 자전거를 타고 출퇴근해본 적 없는 사람 접어",
    "본인 지인의 결혼식에 간 적 없는 사람 접어",
    "한 번도 캠핑장에서 하룻밤을 보낸 적 없는 사람 접어",
    "한 번도 스스로 요리를 해본 적 없는 사람 접어",
    "한 번도 바베큐를 해본 적 없는 사람 접어",
    "좋아하는 스포츠팀의 경기를 한 번도 직접 보지 않은 사람 접어",
    "지금 딱 생각나는 본인만의 최애 카페가 없는 사람 접어",
    "좋아하는 음악 장르가 없는 사람 접어",
    "한 번도 친구와의 대화 중에 거짓말을 한 적 없는 사람 접어",
    "한 번도 해리포터 시리즈를 읽어본 적 없는 사람 접어",
    "지금 흰 양말 신고 있는 사람 접어",
    "부모님과 함께 살고 있는 사람 접어",
    "더위보다 추위를 많이 타는 사람 접어",
  ];

  const handleHelpClick = () => {
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const randomQuestion = randomQuestions[randomIndex];

    // 입력창에 질문 넣기
    setInputValue(randomQuestion);
  };

  return (
    <Styled.ContainerAll>
      <Styled.Container>
        <Styled.ChatInfo>
          <Styled.Information>
            <img src={Info2} alt="닉네임님의 차례입니다. 질문을 남겨주세요." />
          </Styled.Information>
          <Styled.PlayerInfo>
            <Styled.PlayerLabel>플레이어1</Styled.PlayerLabel>
            {messages.map((message, index) => {
              const isGap = index === 0 || messages[index - 1].sender !== message.sender; // 이전 메시지와 다른 사람이 보냈는지 확인
              return (
                <Styled.MessageWrapper key={index} isGap={isGap}>
                  <Styled.Message isUser={message.sender === "user"} isQuestion={message.text.startsWith("Q.")}>
                    {message.text}
                  </Styled.Message>
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
