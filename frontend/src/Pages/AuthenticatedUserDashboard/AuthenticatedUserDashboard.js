import "./AuthenticatedUserDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import AuthHeader from "../../Components/AuthHeader/AuthHeader";
import Opportunities from "../../Components/Opportunities/Opportunities";
import UpcomingOpportunities from "../../Components/UpcomingOpportunities/UpcomingOpportunities"
import Footer from "../../Components/Footer/Footer";
import { Row, Col } from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

  

const AuthenticatedUserDashboard = (props) => {
    //sample opportunities
    const { user } = props;
    const [opps, setOpps] = useState(["Upcoming Opportunity 1", "Upcoming Opportunity 2", "Upcoming Opportunity 3", "Upcoming Opportunity 4", "Upcoming Opportunity 5"]);
    const history = useHistory();

    function handleCancel(index) {
        const updated = opps.filter((opp, i) => {
            return i !== index
        });
        setOpps(updated);
    } 
    const refreshOnLogin = () => {
        history.push("/");
        setTimeout(() => history.push(history.push("/")), 10);
        history.push("/");
      };

    useEffect(() => {
        refreshOnLogin();
    }, []);

    return (
        <div>
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
        </div>    
    );
}

export default AuthenticatedUserDashboard;