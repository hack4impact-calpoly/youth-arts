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

    var key, opportunities;

    if(user && (user.opportunities !== null || user.opportunities !== undefined)) {
        Object.keys(user.opportunities).map((item) => {
            key = item;
            return null;
        })
        if(key !== null || key !== undefined) opportunities = user.opportunities[key];
        else opportunities = [];
    }
    else opportunities = []

    const [opps, setOpps] = useState(opportunities);
    const history = useHistory();

    function handleCancel(cancelOpp) {
        var updated = opps;
        for(var i = 0; i < opps.length; i++) {
            if(opps[i].task === cancelOpp.task) {
                for(var j = 0; j < opps[i].start.length; j++) {
                    if(cancelOpp.start === opps[i].start[j] && cancelOpp.end === opps[i].end[j]) {
                        opps[i].start.splice(j, 1);
                        opps[i].end.splice(j, 1);
                    }
                }
            }
        }
        setOpps(updated);

        var newOpportunites = user.opportunities;
        newOpportunites[key] = updated;

        const updateVolunteer = {
            _id: props.user._id,
            AOI: props.user.AOI,
            address: props.user.address,
            boardMember: props.user.boardMember,
            communityRole: props.user.communityRole,
            email: props.user.email,
            experience: props.user.experience,
            firstName: props.user.firstName,
            googleId: props.user.googleId,
            lastName: props.user.lastName,
            outreach: props.user.outreach,
            phoneNum: props.user.phoneNum,
            signature: props.user.signature,
            tasks: props.user.tasks,
            username: props.user.username,
            workHistory: props.user.workHistory,
            _v: props.user._v,
            opportunities: newOpportunites
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateVolunteer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateVolunteer)
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });       
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