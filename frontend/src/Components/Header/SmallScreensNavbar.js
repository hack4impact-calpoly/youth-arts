// SmallScreensNavbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavComponent } from "./Navbar";
import "./Header.css";
import logo from "../../Images/YouthArtsLogoReversed.png";

function SmallScreensNavbar(props) {
  const { user } = props;
  // declare 'translate' as a state variable
  const [translate, setTranslate] = useState(true);
  return (
    <div className="smallham">
      {/* <Link className="logo" to="/home">
                <img src={logo} width="auto" height="45" alt=""></img>
            </Link> */}
      <button
        className="hamburger-btn"
        onClick={() => setTranslate(!translate)}
      >
        {" "}
        {/* toggle translate */}
        {/* change the btn text based on whether translate is true or false */}
        {translate ? <span>&#9776;</span> : <span>&times;</span>}
      </button>
      {/* hide and show the sidebar list based on whether translate is true or false */}
      <div
        id="sidebar-list"
        className={`${translate ? "addTransiton" : "removeTransition"}`}
      >
        <NavComponent
          navClass="nav-small"
          linkClassName="navsmalllink"
          onClick={() => setTranslate(true)}
          user={user} // set translate to true to hide the sidebar list
        />
      </div>
    </div>
  );
}
export default SmallScreensNavbar;
