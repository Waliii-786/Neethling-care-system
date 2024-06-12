import React from "react";
import Bg from "../Assets/bg_2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Styles/Hero.css";

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/image-upload");
  };


  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          
          <h2 className="text-title">
            Animals Health Matter
          </h2>
          <p className="text-descritpion">
          Welcome to the Neethling Care System, 
          Our website utilizes advanced AI technology to provide quick, accurate, and reliable diagnostics and treatment recommendations to help farmers and veterinarians manage this serious disease effectively.
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Classify Disease
          </button>
          
          <div className="text-stats">
          <p className="text-headline">Case Update (2021)</p>
            <div className="text-stats-container">
              <p>2.4M</p>
              <p>Infected</p>
            </div>

            <div className="text-stats-container">
              <p>0.11M</p>
              <p>Deaths</p>
            </div>

            <div className="text-stats-container">
              <p>1.2M</p>
              <p>Recovered</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Bg} alt="Doctor" />
        </div>
      </div>

      
        <FontAwesomeIcon icon={faAngleUp} />
        
      </div>
      
  );
}

export default Hero;
