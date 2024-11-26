import React from "react";
import "../assets/css/GameEnding.css";

const GameEnding = () => {
  return (
    <div className="ending_page">
      <header>
        <div>게임이 종료되었어요.</div>
        <div>아래에서 내 결과를 확인하세요!</div>
      </header>

      <main>
        <div className="loser_info">
          <div className="loser">
            <div className="font_color">패배</div>
            <div>닉네임</div>
          </div>
          <div className="user_img">닉</div>
        </div>

        <div className="ranks">
          <div className="rank">
            <div className="rank_num">1</div>
            <div className="rank_user">닉네임</div>
          </div>
          <div className="rank">
            <div className="rank_num">2</div>
            <div className="rank_user">닉네임</div>
          </div>
          <div className="rank">
            <div className="rank_num">3</div>
            <div className="rank_user me">닉네임 (나)</div>
          </div>
          <div className="rank">
            <div className="rank_num">4</div>
            <div className="rank_user">닉네임</div>
          </div>
          <div className="rank">
            <div className="rank_num">5</div>
            <div className="rank_user">닉네임</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameEnding;
