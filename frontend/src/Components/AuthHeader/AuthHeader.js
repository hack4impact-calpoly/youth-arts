import "./AuthHeader.css";
import React from "react";
import { Redirect } from "react-router-dom";
import logo from "../../Images/YouthArtsLogoMark.png";

function AuthHeader(props) {
  const { user } = props;

  if (props.user === {}) {
    console.log(user);
    return <Redirect to="/home" />;
  }
  return (
    <div id="authHeader">
      <img id="authLogo" src={logo} alt="logo" />
      <h1 id="welcomeBack">WELCOME BACK {user?.firstName?.toUpperCase()}!</h1>
      <h3 id="slogan">READY TO MAKE A DIFFERENCE?</h3>
    </div>
  );
}

export default AuthHeader;
