import './App.css';
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import SubmitButton from "./Components/SubmitButton/SubmitButton"
import React, {useState} from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");

  function onClick() {
    setHeadingText("Submitted");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{headingText}</h1>
        <SubmitButton 
          onClick={onClick}
          buttonText="LOG IN"
        />
      </header>
    </div>
  );
}

export default App;