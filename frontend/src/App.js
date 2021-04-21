import './App.css';
import queryString from "query-string";
import React, { useState, Component } from "react";
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import LoginPage from './Pages/LoginPage/LoginPage'
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";
import RegistrationPage from './Pages/RegistrationPage/RegistrationForm'
import AddOpportunityForm from './Pages/AddOpportunityForm/AddOpportunityForm'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegistrationConfirmation from './Pages/RegistrationConfirmation/RegistrationConfirmation';
import OpportunityDetail from './Pages/OpportunityDetail/OpportunityDetail';
import AddOpportunity from './Pages/AddOpportunityForm/AddOpportunityForm';
import OpportunitiesPage from './Pages/OpportunitiesPage/OpportunitiesPage';
import { Nav } from 'react-bootstrap';
import AuthenticatedUserDashboard from "./Pages/AuthenticatedUserDashboard/AuthenticatedUserDashboard";
// import ReportsPage from "./Pages/ReportsPage/ReportsPage.js";
import CalendarPage from "./Pages/CalendarPage/CalendarPage.js";


class App extends Component {
    constructor(props)
    {
      super(props);
      this.state = {user: {},
                    cart: [] };
    }

    updateCart = (task) => {
      const cart = this.state.cart;
      cart.push(task);
      this.setState({cart: cart});
      this.state = {user: {} };
    }

    componentDidMount() {
  }
  render(){
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

        <Route path='/AuthDashboard'>
          <AuthenticatedUserDashboard />
        </Route>
        
        {/* <Route path='/Reports'>
          <ReportsPage />
        </Route> */}

        <Route path='/Calendar'>
          <CalendarPage />
        </Route>

      <Route path='/opportunities'>
        <OpportunitiesPage />
      </Route>

      <Route path='/addOpportunity'>
          <AddOpportunity/>
        </Route>

      <Route path='/opportunityDetail'>
        <NavBar/>
          <OpportunityDetail 
          updateCart = {this.updateCart}/>
        </Route>
      
    </Switch>
  </BrowserRouter>

  );
  }
}

export default App;