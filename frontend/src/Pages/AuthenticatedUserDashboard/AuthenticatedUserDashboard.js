import "./AuthenticatedUserDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import AuthHeader from "../../Components/AuthHeader/AuthHeader";
import Opportunities from "../../Components/Opportunities/Opportunities";
import UpcomingOpportunities from "../../Components/UpcomingOpportunities/UpcomingOpportunities"
import Footer from "../../Components/Footer/Footer";
import { Row, Col } from "react-bootstrap";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'

function AuthenticatedUserDashboard({ mainUser, updateUser }) {
    //sample opportunities
    const [opps, setOpps] = useState(["Upcoming Opportunity 1", "Upcoming Opportunity 2", "Upcoming Opportunity 3", "Upcoming Opportunity 4", "Upcoming Opportunity 5"]);
    const [user, setUser] = useState();
    const [userID, setUserID] = useState();
    //handles when user clicks "Cancel button"
    function handleCancel(index) {
        const updated = opps.filter((opp, i) => {
            return i !== index
        });
        setOpps(updated);
    }
    useEffect(() => {
        async function fetchMyAPI() {
            var userId = window.location.pathname;
            userId = userId.replace("/authDashboard/", "");
            userId = userId.replace("/authDashboard", "");
            console.log(userId);
            setUserID(userId);
            if (mainUser !== null && mainUser !== undefined && mainUser !== {})
            {
                console.log(mainUser)
                setUser(user);
                setUserID(mainUser._id);
            }
            if ((user === {} || user === null || user === undefined) && (userId !== "" && userId !== null && userId !== undefined))
            {
                console.log(userID);
                console.log(userId);
                console.log(user);
                await fetch('http://localhost:4000/api/volunteer/' + userId)
                .then(res => res.json())
                .then(data => {setUser(data);
                                updateUser(user);});
                // updateUser(user);
                // console.log(mainUser);
                // if ((mainUser === {} || mainUser === null || mainUser === undefined) && 
                // (user !== {} && user !== null && user !== undefined))
                // {
                //     mainUser = user;
                //     updateUser(user);
                //     console.log(mainUser);
                // }
            }
            else { console.log(user, userId);}
            if (userID === "")
            {
                return (<Redirect from="/authDashboard/" to='/anonDashboard/'/>)
            }
        }
        fetchMyAPI()

        }, []);
        var newid = window.location.pathname;
        newid = newid.replace("/authDashboard/", "")
        newid = newid.replace("/authDashboard", "")
        if (userID === "" && (newid != "")) {
            setUserID(newid);
        }
        if (userID !== "" && userID !== null || (newid != ""))
        {   
            if ((mainUser === {} || mainUser === null || mainUser === undefined) && 
                (user !== {} && user !== null && user !== undefined))
                {
                    mainUser = user;
                    updateUser(user);
                    console.log(mainUser);
                }
            return (
                <div>
                    {user &&
                    <div>
                        <NavBar user={user}/>
                        <AuthHeader
                            user={user}
                        />
                        <Row className="justify-content-md-center middleSection">
                            <Col md="auto">
                                <UpcomingOpportunities
                                    opps={opps}
                                    handleCancel={handleCancel}
                                />
                            </Col>
                            <Col id="impactSection" md="auto">
                                <h4 id="impact">YOUR IMPACT</h4>
                                <hr id="line" />
                            </Col>
                        </Row>
                        <Opportunities />
                        <Footer />
                    </div>  
                    ||  <NavBar />}
                </div>    
            );
        }
        else
        {
            return(
                <Redirect from="/authDashboard/" to='/anonDashboard/'/>);
        }
}

export default AuthenticatedUserDashboard;