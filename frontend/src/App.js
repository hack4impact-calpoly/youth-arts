import './App.css';
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";
import SubmitButton from "./Components/SubmitButton/SubmitButton"
import OpportunityCard from "./Components/OpportunityCard/OpportunityCard"
import React, {useState} from "react";
import AddOpportunityForm from './Pages/AddOpportunityForm/AddOpportunityForm'

function App() {
  return (
    <div>
      <AddOpportunityForm/>
    </div>
  );
}

export default App;