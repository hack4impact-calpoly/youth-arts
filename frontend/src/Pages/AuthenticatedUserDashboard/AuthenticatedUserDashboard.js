import "./AuthenticatedUserDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import AuthHeader from "../../Components/AuthHeader/AuthHeader";
import Opportunities from "../../Components/Opportunities/Opportunities";
import UpcomingOpportunities from "../../Components/UpcomingOpportunities/UpcomingOpportunities"
import Footer from "../../Components/Footer/Footer";
import { Row, Col } from "react-bootstrap";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import { Redirect } from 'react-router-dom'

const AuthenticatedUserDashboard = (props) => {
    //sample opportunities
    const { user } = props;
    const [opps, setOpps] = useState(["Upcoming Opportunity 1", "Upcoming Opportunity 2", "Upcoming Opportunity 3", "Upcoming Opportunity 4", "Upcoming Opportunity 5"]);

    function handleCancel(index) {
        const updated = opps.filter((opp, i) => {
            return i !== index
        });
        setOpps(updated);
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

export default AuthenticatedUserDashboard;