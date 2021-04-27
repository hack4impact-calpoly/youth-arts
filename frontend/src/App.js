import './App.css';
import React, { useState, useEffect, Component } from "react";
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import LoginPage from './Pages/LoginPage/LoginPage'
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";
import RegistrationPage from './Pages/RegistrationPage/RegistrationForm'
import AddOpportunityForm from './Pages/AddOpportunityForm/AddOpportunityForm'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegistrationConfirmation from './Pages/RegistrationConfirmation/RegistrationConfirmation';
import OpportunityDetail from './Pages/OpportunityDetail/OpportunityDetail';
import OpportunitiesPage from './Pages/OpportunitiesPage/OpportunitiesPage';
import AuthenticatedUserDashboard from "./Pages/AuthenticatedUserDashboard/AuthenticatedUserDashboard";
// import ReportsPage from "./Pages/ReportsPage/ReportsPage.js";
// import FAQPage from "./Pages/FAQPage/FAQPage.js";
import CalendarPage from "./Pages/CalendarPage/CalendarPage.js";


const App = () => {
  const [profile, updateProfile] = useState(null);
  const [cart, setCart] = useState();

  const updateCart = (task) => {
    cart.push(task);
    this.setState({cart: cart});
    this.setCart(cart);
  }

  useEffect(() => {
    fetch("http://localhost:4000/auth/account",
      { credentials: 'include' }
      ).then((res) => res.json())
      .then((account) => {
        if (Object.keys(account).length > 0) updateProfile(account);
      });
  }, []);


    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            { profile ? (
                <AuthenticatedUserDashboard user={profile}/>
              ) : 
                <div> 
                  <NavBar user={profile}/>
                    <AnonymousDashboard user={profile}/>
                  <Footer/>
                </div>
            }
          </Route>
          { profile ? (
            <Route path='/AuthDashboard'>
              <AuthenticatedUserDashboard user={profile}/>
            </Route>
            ) : 
            <Route path='/AnonDashboard'>
              <NavBar user={profile}/>
                <AnonymousDashboard user={profile}/>
              <Footer/>
            </Route>
          }
          <Route path='/Login'>
            <LoginPage user={profile}/>
          </Route>

          <Route path='/registration'>
            <RegistrationPage user={profile}/>
          </Route>

          <Route path='/registrationConfirmation'>
            <RegistrationConfirmation user={profile}/>
          </Route>

          <Route path='/Calendar'>
            <CalendarPage user={profile}/>
          </Route>

          <Route path='/opportunities'>
            <OpportunitiesPage 
              user={profile}
              updateUser={updateProfile}/>
          </Route>

          { (profile?.admin === true) ? (
          <Route path='/addOpportunity'>
            <AddOpportunityForm user={profile}/>
          </Route>
          ) : 
          <OpportunitiesPage 
            user={profile}
            updateUser={updateProfile}/> 
          }

          <Route path='/opportunityDetail'>
            <NavBar user={profile}/>
            <OpportunityDetail 
              updateCart = {updateCart}
              user={profile}
              updateUser={updateProfile} />
            <Footer/>
          </Route>

          {/* <Route path='/Reports'>
            <ReportsPage user={profile}/>
          </Route> */}

          {/* <Route path='/FAQ'>
            <FAQPage user={profile}/>
          </Route> */}

        </Switch>
      </BrowserRouter>
    );
  }
export default App;