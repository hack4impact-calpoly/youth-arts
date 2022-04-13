import "./AuthHeader.css";
import logo from "./../../Images/YouthArtsLogoMark.png";
import React from "react";
import { Redirect } from "react-router-dom";

const AuthHeader = (props) => {
    const { user } = props;

    if (props.user === {}) {
        console.log(user);
        return <Redirect to="/home" />;
    } else {
        return (
            <div id="authHeader">
                <img id="authLogo" src={logo} alt="logo" />
                <h1 id="welcomeBack">
                    WELCOME BACK {user?.firstName?.toUpperCase()}!
                </h1>
                <h3 id="slogan">READY TO MAKE A DIFFERENCE?</h3>
            </div>
        );
    }
};

export default AuthHeader;
