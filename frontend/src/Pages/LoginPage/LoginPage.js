import Header from "../../Components/Header/Header";
import React from "react";
import GoogleButton from "../../Components/SignInWithGoogleButton/GoogleButton";
import "./LoginPage.css";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    render() {
        return (
            <body>
                <Header />
                <h1 className="signIn">Sign in</h1>
                <p className="welcome">
                    Welcome! Sign in below to get started.
                </p>
                <div id="googleButton">
                    <GoogleButton />
                </div>
            </body>
        );
    }
}

export default LoginPage;
