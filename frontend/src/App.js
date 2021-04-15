import './App.css';
import React, {useState} from "react";
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import LoginPage from './Pages/LoginPage/LoginPage'
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";
import RegistrationPage from './Pages/RegistrationPage/RegistrationForm'
import AddOpportunityForm from './Pages/AddOpportunityForm/AddOpportunityForm'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegistrationConfirmation from './Pages/RegistrationConfirmation/RegistrationConfirmation';
import OpportunitiesPage from './Pages/OpportunitiesPage/OpportunitiesPage';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
    <Switch>

      <Route exact path='/'>
        <LoginPage/>
      </Route>

      <Route path='/AnonDashboard'>
        <NavBar/>
        <AnonymousDashboard/>
      </Route>

      <Route path='/registration'>
        <RegistrationPage/>
      </Route>

      <Route path='/addOpportunity'>
        <AddOpportunityForm/>
      </Route>

      <Route path='/registrationConfirmation'>
        <RegistrationConfirmation/>
      </Route>

      <Route path='/opportunities'>
        <OpportunitiesPage />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;