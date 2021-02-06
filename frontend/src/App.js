import './App.css';
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import SubmitButton from "./Components/SubmitButton/SubmitButton"
import OpportunityCard from "./Components/OpportunityCard/OpportunityCard"
import React, {useState} from "react";
import AddOpportunityForm from './Pages/AddOpportunityForm/AddOpportunityForm'

function App() {
  const [headingText, setHeadingText] = useState("Hello");

  function onClick() {
    setHeadingText("Submitted");
  }

  return (
    <div>
      <AddOpportunityForm/>
    </div>
  );
}

export default App;