import React from 'react';
import './QuizzPage.css';
import backgroundImage from '../../assets/background.jpg'; // Assurez-vous d'avoir cette image
import coinIcon from '../../assets/coin.png'; // Assurez-vous d'avoir cette image
import userIcon from '../../assets/user.png'; // Assurez-vous d'avoir cette image

function QuizzPage() {
  return (
    <div className="quizz-page" style={{backgroundImage: `url(${backgroundImage})`}}>
      <h1 className="question">En quelle année s’est déroulé la première guerre mondiale ?</h1>
      
      <div className="diagonal-container">
        <div className="diagonal-line"></div>
        <button className="answer-btn left">1942</button>
        <button className="answer-btn right">1927</button>
      </div>
      
      <div className="bottom-container">
        <div className="user-container">
          <img src={userIcon} alt="User" className="user-icon" />
          <span className="user-name">John Doe</span>
        </div>
        
        <div className="coin-container">
          <img src={coinIcon} alt="Coin" className="coin-icon" />
          <span className="coin-count">100</span>
        </div>
      </div>
    </div>
  );
}

export default QuizzPage;
