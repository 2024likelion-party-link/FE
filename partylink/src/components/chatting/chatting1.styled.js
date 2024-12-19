import styled from "styled-components";

export const ContainerAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #262b34;
  box-sizing: border-box;
  padding: 0 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  height: 500px;
  background-color: #1e2224;
  border-radius: 0 0 25px 25px;
  margin-top: 10px;
  box-sizing: border-box;
`;

export const ChatInfo = styled.div`
  padding: 25px;
  background-color: #1e2224;
  overflow-y: overlay;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: 1px solid #1e2224;
    background-clip: padding-box;
    box-shadow: inset 0 0 8px 8px #51525c;
  }
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  position: relative;
  width: 100%; /* 전체 너비로 설정 */
`;

export const MessageWrapper = styled.div`
  margin-top: ${(props) => (props.isGap ? "10px" : "1px")};
  display: flex;
  flex-direction: column;
`;

export const InformationImg = styled.img`
  width: 380px;
  max-width: 100%;
`;

export const InformationText = styled.div`
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`;

export const PlayerLabel = styled.div`
  font-size: 14px;
  color: #848687;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Message = styled.div`
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  font-size: 14px;
  color: ${(props) => (props.isQuestion ? "#4722E4" : "#fff")};
  font-weight: ${(props) => (props.isQuestion ? "bold" : "normal")};
  margin: 0;
  padding: 10px 15px;
  background: ${(props) => (props.isUser ? "radial-gradient(circle, #c2d5cb 0.1%, #A1B5A9 50%)" : "radial-gradient(circle, #9cabc6 0.1%, #7e90b0 50%)")};
  border-radius: 15px;
  max-width: 80%;
`;

export const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #1e2224;
  border-radius: 0 0 25px 25px;
  gap: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background-color: #646c7b;
  border-radius: 50px;
  padding: 10px 15px;
  gap: 10px;
  position: relative;
  margin-bottom: 10px;
`;

export const QIcon = ({ isMyTurn }) => (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15.5" cy="15.5" r="15.5" fill="#646C7B" />
    <path
      d="M13.5039 18.0977H16.0234L17.0977 19.4844C17.7715 18.6934 18.1523 17.502 18.1523 15.9297C18.1523 12.9023 16.7266 11.2617 14.5391 11.2617C12.3516 11.2617 10.9062 12.9023 10.9062 15.9297C10.9062 18.957 12.3516 20.5977 14.5391 20.5977C14.8223 20.5977 15.0957 20.5684 15.3594 20.5195L13.5039 18.0977ZM21.1406 15.9297C21.1406 18.4492 20.2812 20.3926 18.8945 21.6133L20.9062 24.1719H18.1523L17.0195 22.7461C16.2578 23.0488 15.418 23.1953 14.5391 23.1953C10.7695 23.1953 7.91797 20.5195 7.91797 15.9297C7.91797 11.3203 10.7695 8.66406 14.5391 8.66406C18.2695 8.66406 21.1406 11.3203 21.1406 15.9297Z"
      fill={isMyTurn ? "#4722E4" : "white"}
    />
  </svg>
);

export const HelpText = styled.img`
  display: flex;
  margin-right: 40px;
  width: 35px;
  height: 20px;
  cursor: pointer;
`;

export const IconButtonAll = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  right: 16px;
`;

export const IconButton1 = styled.img`
  width: 45px;
  height: 45px;
  position: absolute;
  z-index: 1;
`;

export const IconButton2 = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 2;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: ${(props) => (props.isMyTurn ? "bold" : "normal")};
  color: ${(props) => (props.isMyTurn ? "#4722E4" : "#fff")};
  outline: none;

  &::placeholder {
    color: ${(props) => (props.isMyTurn ? "#4722E4" : "white")};
  }
`;
