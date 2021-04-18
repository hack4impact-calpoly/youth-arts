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
import OpportunityDetail from './Pages/OpportunityDetail/OpportunityDetail';
import AddOpportunity from './Pages/AddOpportunityForm/AddOpportunityForm';
import { Nav } from 'react-bootstrap';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cart: [] };
  }

  updateCart = (task) => {
    const cart = this.state.cart;
    cart.push(task);
    this.setState({cart: cart});
  }

  render ()
  {
    const reqList = ["Wear black pants and a white shirt", "Tie long hair back",
    "Students must be 13+", "Students must provide their own transportation"]
    const title = "Barn Bash & Dance Benefit"
    const location = "Rolling Hills Ranch, 7275 Cross Canyons Rd., San Miguel, CA"
    const start_event = "May 4, 2019"
    const description="A very special evening, celebrating and supporting youth arts, great food n friends at the historic Rolling Hills Ranch in San Miguel"
    const map1 = new Map()
    map1["roleName"] = "Parking Lot Helper"
    map1["description"] = "First contact for our guests as they arrive at the Ranch. Help them park their car and find their way to check in"
    map1["times"] = "3-5pm or 5-7pm"
    map1["additionalRequirements"] = "None"
    const map2 = new Map()
    map2["roleName"] = "Bartender"
    map2["description"] = "Work in the historic barn to serve guests wine and beer. Don't worry, no fancy mixing required. Teams are great here and will have a lot of"
    map2["times"] = "3:30-5:30pm, 5:30-7:30pm,3:30-5:30pm, 5:30-7:30pm3:30-5:30pm, 5:30-7:30pm"
    map2["additionalRequirements"] = "21+"
    const tasks = [map1, map2]
    const additionalInfo = ["We suggest bringing snacks and drinks", "Dinner provided: Tri-tip, chicken, beans, bread, salad, all the fixings!"]
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