import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer.js";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AnonymousDashboard from "./Pages/AnonymousDashboard/AnonymousDashboard";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationForm";
import AddOpportunityForm from "./Pages/AddOpportunityForm/AddOpportunityForm";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import RegistrationConfirmation from "./Pages/RegistrationConfirmation/RegistrationConfirmation";
import OpportunityDetail from "./Pages/OpportunityDetail/OpportunityDetail";
import OpportunitiesPage from "./Pages/OpportunitiesPage/OpportunitiesPage";
import AuthenticatedUserDashboard from "./Pages/AuthenticatedUserDashboard/AuthenticatedUserDashboard";
import DirectoryPage from "./Pages/DirectoryPage/Directory";
import ReportsPage from "./Pages/ReportsPage/ReportsPage.js";
import CalendarPage from "./Pages/CalendarPage/CalendarPage.js";
import OpportunityCheckout from "./Pages/OpportunityCheckout/OpportunityCheckout.js";
import FAQPage from "./Pages/FAQPage/FAQPage";
import ContactPage from "./Pages/DirectoryPage/ContactPage";
import BMLogHoursPage from "./Pages/BMLogHoursPage/BMLogHoursPage";
import axios from "axios";

const SetAuthToken = () => {
    const { token } = useParams();

    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/token`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    }).then(() => {
        window.location.assign("/");
    });
    return <p>Loading...</p>;
};

const App = () => {
    const [profile, updateProfile] = useState(null);
    const [cart, setCart] = useState([]);
    const [newUser, setnewUser] = useState(0);
    const [volunteers, setVolunteers] = useState(0);
    const [opportunities, setOpportunities] = useState(0);

    const updateCart = (task) => {
        cart.push(task);
        console.log(cart);
    };
    const emptyCart = () => setCart([]);

    const deleteFromCart = (task) => {
        const index = cart.indexOf(task);
        cart.splice(index, 1);
        setCart(cart);
    };

    async function fetchAllOpportunities() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/opportunities`
            );
            if (response && response.data) {
                setOpportunities(response.data);
            }
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async function fetchAllVolunteers() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/volunteers`
            );
            if (response && response.data) setVolunteers(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/account`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((account) => {
                console.log(account);
                if (Object.keys(account).length > 0) {
                    if (Object.keys(account).length < 15) {
                        setnewUser(newUser + 1);
                    } else {
                        setnewUser(0);
                    }
                    updateProfile(account);
                }
            });
        fetchAllOpportunities();
        fetchAllVolunteers();
    }, [newUser]);
    console.log(profile);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/logHours">
                    <Header user={profile} updateProfile={updateProfile} />
                    <BMLogHoursPage
                        user={profile}
                        updateUser={updateProfile}
                        volunteers={volunteers}
                        opportunities={opportunities}
                        setVolunteers={setVolunteers}
                        setOpportunities={setOpportunities}
                        fetchAllOpportunities={fetchAllOpportunities}
                        fetchAllVolunteers={fetchAllVolunteers}
                    />
                    <Footer />
                </Route>
                <Route path="/opportunityDetail">
                    <Header user={profile} updateProfile={updateProfile} />
                    <OpportunityDetail
                        updateCart={updateCart}
                        user={profile}
                        updateUser={updateProfile}
                        volunteers={volunteers}
                        opportunities={opportunities}
                        setVolunteers={setVolunteers}
                        setOpportunities={setOpportunities}
                        fetchAllOpportunities={fetchAllOpportunities}
                        fetchAllVolunteers={fetchAllVolunteers}
                        cart={cart}
                    />
                    <Footer />
                </Route>
                <Route path="/auth/login/:token" component={SetAuthToken} />
                <Route path="/directory">
                    <Header user={profile} updateProfile={updateProfile} />
                    <DirectoryPage
                        {...profile}
                        volunteers={volunteers}
                        opportunities={opportunities}
                        setVolunteers={setVolunteers}
                        setOpportunities={setOpportunities}
                    />
                    <Footer />
                </Route>
                <Route exact path="/volunteer">
                    <Header user={profile} updateProfile={updateProfile} />
                    <ContactPage allOpportunities={opportunities} />
                    <Footer />
                </Route>
                <Route path="/FAQ">
                    <Header user={profile} updateProfile={updateProfile} />
                    <FAQPage />
                    <Footer />
                </Route>
                <Route exact path="/">
                    {profile && profile.signature ? (
                        newUser <= 0 ? (
                            <AuthenticatedUserDashboard
                                user={profile}
                                volunteers={volunteers}
                                opportunities={opportunities}
                                setVolunteers={setVolunteers}
                                setOpportunities={setOpportunities}
                            />
                        ) : (
                            <RegistrationPage
                                user={profile}
                                updateProfile={updateProfile}
                                setnewUser={setnewUser}
                            />
                        )
                    ) : (
                        <div>
                            <Header
                                user={profile}
                                updateProfile={updateProfile}
                            />
                            <AnonymousDashboard user={profile} />
                            <Footer />
                        </div>
                    )}
                </Route>
                {profile ? (
                    <Route path="/authDashboard">
                        <AuthenticatedUserDashboard
                            user={profile}
                            volunteers={volunteers}
                            opportunities={opportunities}
                            setVolunteers={setVolunteers}
                            setOpportunities={setOpportunities}
                        />
                    </Route>
                ) : (
                    <Route path="/home">
                        <Header user={profile} updateProfile={updateProfile} />
                        <AnonymousDashboard user={profile} />
                        <Footer />
                    </Route>
                )}
                <Route path="/Login">
                    <LoginPage user={profile} />
                </Route>
                <Route path="/home">
                    <Header user={profile} updateProfile={updateProfile} />
                    <AnonymousDashboard user={profile} />
                    <Footer />
                </Route>

                <Route path="/registration">
                    <RegistrationPage
                        user={profile}
                        updateProfile={updateProfile}
                        setnewUser={setnewUser}
                    />
                </Route>

                <Route path="/registrationConfirmation">
                    <RegistrationConfirmation user={profile} />
                </Route>

                <Route path="/Calendar">
                    <CalendarPage user={profile} />
                </Route>

                <Route path="/Reports">
                    <ReportsPage
                        user={profile}
                        volunteers={volunteers}
                        opportunities={opportunities}
                        setVolunteers={setVolunteers}
                        setOpportunities={setOpportunities}
                    />
                </Route>

                <Route path="/opportunities">
                    <OpportunitiesPage
                        user={profile}
                        updateUser={updateProfile}
                        volunteers={volunteers}
                        opportunities={opportunities}
                        setVolunteers={setVolunteers}
                        setOpportunities={setOpportunities}
                    />
                </Route>

                <Route path="/opportunityCheckout">
                    <Header user={profile} updateProfile={updateProfile} />
                    <OpportunityCheckout
                        cart={cart}
                        updateCart={updateCart}
                        emptyCart={emptyCart}
                        user={profile}
                        deleteFromCart={deleteFromCart}
                    />
                </Route>
                <Route path="/OpportunityCheckout">
                    <Header user={profile} updateProfile={updateProfile} />
                    <OpportunityCheckout
                        cart={cart}
                        updateCart={updateCart}
                        emptyCart={emptyCart}
                        user={profile}
                        deleteFromCart={deleteFromCart}
                    />
                </Route>

                {profile?.admin === true ? (
                    <Route path="/addOpportunity">
                        <AddOpportunityForm
                            user={profile}
                            volunteers={volunteers}
                            opportunities={opportunities}
                            setVolunteers={setVolunteers}
                            setOpportunities={setOpportunities}
                            state={{
                                opportunity: {
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
                                    tasks: [
                                        {
                                            roleName: "",
                                            description: "",
                                            start: [""],
                                            end: [""],
                                            additionalInfo: [""],
                                        },
                                    ],
                                    additionalInfo: [""],
                                    volunteers: {},
                                },
                            }}
                        />
                    </Route>
                ) : (
                    <OpportunitiesPage
                        user={profile}
                        updateUser={updateProfile}
                        volunteers={volunteers}
                        opportunities={opportunities}
                        setVolunteers={setVolunteers}
                        setOpportunities={setOpportunities}
                    />
                )}
            </Switch>
        </BrowserRouter>
    );
};
export default App;
