import React from "react";
import Header from "../../Components/Header/Header";
import Icon from "./heartIcon.png";
import "./RegistrationConfirmation.css";
import { Link } from "react-router-dom";

function RegistrationConfirmation(props) {
  const { user } = props;
  return (
    <body>
      <Header user={user} />
      <div id="heartIcon">
        <img src={Icon} width="auto" height="100" alt="" />
      </div>
      <h1 className="thanks">Thank you {user.firstName}!</h1>
      <p className="confirmation">Check your email for your confirmation</p>
      <div id="backButton">
        <Link to="/authDashboard">
          <input
            className="backButton"
            type="button"
            value="BACK TO DASHBOARD"
          />
        </Link>
      </div>
    </body>
  );
}

export default RegistrationConfirmation;
