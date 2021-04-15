import "./AuthHeader.css";
import logo from "./../../Images/PRYAC_mark.png";

/*
    props.fName: first name of user
*/

function AuthHeader(props) {
    return (
        <div id="authHeader">
            <img id="authLogo" src={logo} alt="logo"/>
            <h1 id="welcomeBack">WELCOME BACK {props.fName.toUpperCase()}!</h1>
            <h3 id="slogan">READY TO MAKE A DIFFERENCE?</h3>
        </div>
    );
}

export default AuthHeader;