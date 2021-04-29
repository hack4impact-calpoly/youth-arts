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
import OpportunityCheckout from "./Pages/OpportunityCheckout/OpportunityCheckout.js";


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

    deleteFromCart = (task) => {
      const cart = this.state.cart;
      const index = cart.indexOf(task)
      cart.splice(index,1);
      this.setState({cart: cart});
    }

    /*componentDidMount() {
      var query = queryString.parse(this.props.location.search);
      if (query.token) {
        window.localStorage.setItem("jwt", query.token);
        this.props.history.push("/");
        this.setState({jwt: query.token});
        console.log(query.token);
    }
    console.log(this.state.user);
    console.log(this.state.jwt);
  }*/

  render(){
    return (
      <div>
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
          updateCart = {this.updateCart}
          cart = {this.state.cart}/>
        </Route>

        <Route path='/opportunityCheckout'>
        <NavBar/>
          <OpportunityCheckout 
            cart = {this.state.cart}
            deleteFromCart = {this.deleteFromCart}/>
        </Route>
      
    </Switch>
  </BrowserRouter>
  </div>
  );
  }
}

export default App;