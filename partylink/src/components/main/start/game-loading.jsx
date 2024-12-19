import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/scss/components/gameCategory.scss";
import bac2 from "../../../assets/img/bac2.svg";
import Lottie from "lottie-react";
import loadingLottie from "../../../assets/img/lottie.json";
import beforeBtn from "../../../assets/img/beforeBtn.svg";
import ImgGameWhite from "../../../assets/img/imgGameWhite.svg";
import partylink from "../../../assets/img/partylink.svg";

const Loadiing = () => {
  const navigate = useNavigate();

  const handleBefore = () => {
    navigate(-1);
  };

  return (
    <div className="category-wrap">
      <div className="category-container">
        <img src={bac2} className="backgoundImg" alt="Background" />
        <img src={partylink} alt="partylink-logo" style={{ position: "relative", top: "-10%", width: "300px" }}></img>
        <p>게임 시작 대기 중이에요.</p>
        <p>조금만 기다려주세요.</p>
        <Lottie animationData={loadingLottie} loop={true} className="loading-animation" />
        <div className="suggest-box">
          <p>제안한 사람</p>
          <div className="nickname-connected">닉네임</div>
        </div>
        <div className="suggest-box">
          <p>제안한 게임</p>
          <div className="suggest-game">
            <img src={ImgGameWhite}></img>
            <p>이미지 게임</p>
          </div>
        </div>
        <img src={beforeBtn} className="beforeBtn" alt="Before Button" onClick={handleBefore} />
      </div>
    </div>
  );
};

export default Loadiing;
