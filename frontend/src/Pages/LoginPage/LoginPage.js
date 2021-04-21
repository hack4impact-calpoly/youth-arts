import NavBar from '../../Components/NavBar/NavBar'
import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import GoogleButton from '../../Components/SignInWithGoogleButton/GoogleButton';
import "./LoginPage.css";
import headerImage from './headerImage.png';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: []}
  }

  render() {

  return (
      <body >
        <NavBar/>            
        <div id="headerImage"> 
            <img src={headerImage} width= "auto" height="100" alt=""></img>
        </div>
        <h1 className="signIn">Sign in</h1>
        <p className="welcome">Welcome! Sign in below to get started.</p>
        <div id="googleButton">
            <GoogleButton/>
        </div>
      </body>
  );
}
}

export default LoginPage;
