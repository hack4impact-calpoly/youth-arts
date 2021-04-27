import "./AuthHeader.css";
import logo from "./../../Images/PRYAC_mark.png";
import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'


function AuthHeader(props) {
    const [user, setUser] = useState(props.user);
    // const [userID, setUserID] = useState(props.userID);
    console.log(props);

    if (props.user === {}) {
        console.log(user);
        return <Redirect to='/anonDashboard'/>;
    }
    else {
        return (
            <div id="authHeader">
                <img id="authLogo" src={logo} alt="logo"/>
                <h1 id="welcomeBack">WELCOME BACK {user?.firstName?.toUpperCase()}!</h1>
                <h3 id="slogan">READY TO MAKE A DIFFERENCE?</h3>
            </div>
        );
    }

    
}

export default AuthHeader;