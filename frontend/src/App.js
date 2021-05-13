import './App.css';
import React, { useState, useEffect} from "react";
import NavBar from "./Components/NavBar/NavBar.js"
import Footer from "./Components/Footer/Footer.js"
import LoginPage from './Pages/LoginPage/LoginPage'
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";
import RegistrationPage from './Pages/RegistrationPage/RegistrationForm'
import AddOpportunityForm from './Pages/AddOpportunityForm/AddOpportunityForm'
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import RegistrationConfirmation from './Pages/RegistrationConfirmation/RegistrationConfirmation';
import OpportunityDetail from './Pages/OpportunityDetail/OpportunityDetail';
import OpportunitiesPage from './Pages/OpportunitiesPage/OpportunitiesPage';
import AuthenticatedUserDashboard from "./Pages/AuthenticatedUserDashboard/AuthenticatedUserDashboard";
import DirectoryPage from "./Pages/DirectoryPage/Directory"
import ReportsPage from "./Pages/ReportsPage/ReportsPage.js";
// import FAQPage from "./Pages/FAQPage/FAQPage.js";
import CalendarPage from "./Pages/CalendarPage/CalendarPage.js";
import OpportunityCheckout from "./Pages/OpportunityCheckout/OpportunityCheckout.js";
import FAQPage from "./Pages/FAQPage/FAQPage";
import ContactPage from "./Pages/DirectoryPage/ContactPage";
import { useHistory } from "react-router-dom";

const SetAuthToken = () => {
  const { token } = useParams();

  fetch(`${process.env.REACT_APP_SERVER_URL}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token}),
  })
  .then(() => window.location.assign('/'));

  return <p>Loading...</p>;
};


const App = () => {
  const [profile, updateProfile] = useState(null);
  const [cart, setCart] = useState([]);
  const [newUser, setnewUser] = useState(0);

  const updateCart = (task) => {
    cart.push(task);
    console.log(cart);
  }
  const history = useHistory();
  
  const deleteFromCart = (task) => {
    const index = cart.indexOf(task)
    cart.splice(index,1);
    setCart(cart);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/account`,
      { credentials: 'include' }
    ).then((res) => res.json())
      .then((account) => {
        console.log(account);
        if (Object.keys(account).length > 0) {
          if (Object.keys(account).length < 15) {
            setnewUser(newUser + 1);
          }
          else
          {
            setnewUser(0);
          }
          updateProfile(account);
        };
      });
  }, []);
  
  return (
    <BrowserRouter>
      <Switch>
      <Route path='/opportunityDetail'>
          <NavBar user={profile} />
          <OpportunityDetail
            updateCart={updateCart}
            user={profile}
            updateUser={updateProfile}
            cart={cart} />
          <Footer />
        </Route>
      <Route path="/auth/login/:token" component={SetAuthToken} />
        <Route path='/directory'>
          <NavBar user={profile} />
          <DirectoryPage {...profile} />
          <Footer />
        </Route>
        <Route exact path="/volunteer">
          <NavBar user={profile} />
          <ContactPage />
          <Footer />
        </Route>
        <Route path="/FAQ">
          <NavBar user={profile} />
          <FAQPage />
          <Footer />
        </Route>
        <Route exact path='/'>
          {profile ? 
              ((newUser <= 0) ? 
              <AuthenticatedUserDashboard user={profile} />
                :
                <RegistrationPage user={profile} />
              ) 
            :
            <div>
              <NavBar user={profile} />
              <AnonymousDashboard user={profile} />
              <Footer />
            </div>
          }
        </Route>
        {profile ? (
          <Route path='/authDashboard'>
            <AuthenticatedUserDashboard user={profile} />
          </Route>
        ) :
          <Route path='/anonDashboard'>
            <NavBar user={profile} />
            <AnonymousDashboard user={profile} />
            <Footer />
          </Route>
        }
        <Route path='/Login'>
          <LoginPage user={profile} />
        </Route>

        <Route path='/registration'>
          <RegistrationPage user={profile} />
        </Route>

        <Route path='/registrationConfirmation'>
          <RegistrationConfirmation user={profile} />
        </Route>

        <Route path='/Calendar'>
          <CalendarPage user={profile} />
        </Route>

        <Route path='/Reports'>
            <ReportsPage user={profile}/>
          </Route>       

        <Route path='/opportunities'>
          <OpportunitiesPage
            user={profile}
            updateUser={updateProfile} />
        </Route>

        {(profile?.admin === true) ? (
          <Route path='/addOpportunity'>
            <AddOpportunityForm user={profile} 
            state={ { opportunity: { 
                              id: "",
                              title: "",
                              description: "",
                              pictures: [],
                              start_event: [""],
                              end_event: [""],
                              skills: [""],
                              wishlist: [""],
                              location: "",
                              requirements: [""],
                              tasks: [{roleName: "", description: "", start: [""], end: [""], additionalInfo: [""]}],
                              additionalInfo: [""],
                              volunteers: {}
                          }}
                    }
            />
          </Route>
        ) :
          <OpportunitiesPage
            user={profile}
            updateUser={updateProfile} />
        }

        

        <Route path='/opportunityCheckout'>
        <NavBar/>
          <OpportunityCheckout 
            cart = {cart}
            user={profile}
            deleteFromCart = {deleteFromCart}/>
        </Route>

        {/* <Route path='/FAQ'>
            <FAQPage user={profile}/>
          </Route> */}

      </Switch>
    </BrowserRouter>
  );
}
export default App;