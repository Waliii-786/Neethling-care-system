import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/Home">Neethling Care System</Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/Home" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/image-upload" className="navbar-links">
            Classify Disease
          </Link>
        </li>
        <li>
        <Link to="/location" className="navbar-links">
            Location
          </Link>
          
        </li>
        <li>
        <Link to="/check-stage" className="navbar-links">
            Check Stage
          </Link>
          
        </li>
        {/* <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Reviews
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Doctors
          </a>
        </li> */}
      </ul>

      {/* Add link for chatbot page in Live Chat button */}
      <Link to="/chat" className="navbar-btn" onClick={handleChatBtnClick}>
        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
      </Link>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
            Classify Disease
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#services">
            Classify Disease
            </a>
          </li>
          {/* <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#doctors">
              Doctors
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#contact">
              Contact
            </a>
          </li> */}
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
