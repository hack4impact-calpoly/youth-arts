
import NavBar from '../../Components/NavBar/NavBar'
import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import Icon from './heartIcon.png'
import "./RegistrationConfirmation.css"
//import {Link} from 'react-router-dom'

function RegistrationConfirmation() {


  return (
      <body >
        <NavBar/>
        <div id="heartIcon">
              <img src={Icon} width= "auto" height="100" alt=""></img>
        </div>
        <h1 className="thanks">Thanks!</h1>
        <p className="confirmation">We'll let you know when we've received your application</p>
        <div id="backButton">
        <a  href="#">
            <input className="backButton" type="button" value="BACK TO DASHBOARD"/>
        </a>
        </div>
      </body>
  );
}

export default RegistrationConfirmation;
