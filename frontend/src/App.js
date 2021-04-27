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
// import FAQPage from "./Pages/FAQPage/FAQPage.js";
import CalendarPage from "./Pages/CalendarPage/CalendarPage.js";
import axios from "axios";


class App extends Component {
    constructor(props)
    {
      super(props);
      this.mainUser = {};
      this.state = {user: {},
                    userID: "",
                    cart: [] };
    }
    updateUser = (user) => {
      this.mainUser = user;
    }

    updateCart = (task) => {
      const cart = this.state.cart;
      cart.push(task);
      this.setState({cart: cart});
      this.setState({user: {},
                    userID: "" });
    }

    async componentDidMount() {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        this.setState({user: foundUser});
        console.log(foundUser);
      }

      if (this.state.userID != "" && !this.state.userID.contains("undefined") && !this.state.userID.contains("Dashboard"))
      {
          console.log(this.state.userID);
          console.log(this.state.user);
          await fetch('http://localhost:4000/api/volunteer/' + this.state.userID)
          .then(res => res.json())
          .then(data => this.setState({user: data}))
          .then(data => localStorage.setItem("user", JSON.stringify(data)));
      }
    }

  render(){
    if (this.state.userID != "" && !this.state.userID.contains("undefined") && !this.state.userID.contains("Dashboard"))
      {
          console.log(this.state.userID);
          console.log(this.state.user);
          fetch('http://localhost:4000/api/volunteer/' + this.state.userID)
          .then(res => res.json())
          .then(data => this.setState({user: data}));
      }
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <LoginPage user={this.state.user} updateUser={this.updateUser}/>
        </Route>

        <Route path='/AnonDashboard'>
          <NavBar user={this.state.user}/>
          <AnonymousDashboard user={this.state.user} updateUser={this.updateUser}/>
        </Route>

        <Route path='/registration'>
          <RegistrationPage user={this.state.user} updateUser={this.updateUser}/>
        </Route>

        <Route path='/addOpportunity'>
          <AddOpportunityForm user={this.state.user} updateUser={this.updateUser}/>
        </Route>

        <Route path='/registrationConfirmation'>
          <RegistrationConfirmation user={this.state.user} updateUser={this.updateUser}/>
        </Route>

        <Route path='/AuthDashboard'>
          <AuthenticatedUserDashboard user={this.mainUser} updateUser={this.updateUser}/>
        </Route>
        
        {/* <Route path='/Reports'>
          <ReportsPage user={this.state.user}/>
        </Route> */}

        {/* <Route path='/FAQ'>
          <FAQPage user={this.state.user}/>
        </Route> */}

        <Route path='/Calendar'>
          <CalendarPage user={this.mainUser} updateUser={this.updateUser}/>
        </Route>

        <Route path='/opportunities'>
          <OpportunitiesPage 
            user={this.state.user}
            updateUser={this.updateUser}/>
       </Route>

      <Route path='/addOpportunity'>
          <AddOpportunity user={this.state.user} updateUser={this.updateUser}/>
        </Route>

      <Route path='/opportunityDetail'>
        <NavBar/>
          <OpportunityDetail 
          updateCart = {this.updateCart}
          user={this.state.user}
          updateUser={this.updateUser}
          />
        </Route>
      
    </Switch>
  </BrowserRouter>

  );
  }
}

export default App;