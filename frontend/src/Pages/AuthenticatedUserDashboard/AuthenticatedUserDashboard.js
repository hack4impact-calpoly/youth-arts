import "./AuthenticatedUserDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import AuthHeader from "../../Components/AuthHeader/AuthHeader";
import Opportunities from "../../Components/Opportunities/Opportunities";
import UpcomingOpportunities from "../../Components/UpcomingOpportunities/UpcomingOpportunities"
import PastOpportunity from "./../../Components/PastOpportunity/PastOpportunity";
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
        for(var i = 0; i < updated.length; i++) {
            if(updated[i].task === cancelOpp.task) {
                for(var j = 0; j < updated[i].start.length; j++) {
                    if(cancelOpp.start === opps[i].start[j] && cancelOpp.end === opps[i].end[j]) {
                        updated[i].start.splice(j, 1);
                        updated[i].end.splice(j, 1);
                    }
                }
            }
        }
        setOpps(updated);

        var newOpportunites = user.opportunities;
        newOpportunites[key] = opps;

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
        setOpps(opps);   
    } 

    function getDonated(opp) {
        if(opp.donated === null || opp.donated === undefined) return 0;
        var donated = opp.donated;
        var total = 0;
        for(var d = 0; d < donated.length; d++) {
            total ++;
        }
        return total;
    }

    function getHours(start, end) {
        var diff = new Date(end).getTime() - new Date(start).getTime();
        return (diff/(1000*60*60));
    }

    // sort upcoming and past opportunities
    var oppsArray = Object.values(opps);
    var upcomingOpportunities = []
    var pastOpportunities = []
    var currentDate = new Date();
    var donated = 0;
    var totalHours = 0;

    for(var i = 0; i < oppsArray.length; i++) {
        console.log(oppsArray);
        donated += getDonated(oppsArray[i]);
        for(var j = 0; j < oppsArray[i].start.length; j++) {
            var singleOpp = {
                task: oppsArray[i].task,
                start: oppsArray[i].start[j],
                end: oppsArray[i].end[j],
                id: oppsArray[i]._id
            }
            console.log(singleOpp);
            if(singleOpp !== undefined) {
                if(new Date(singleOpp.start) > currentDate) {
                    upcomingOpportunities.push(singleOpp);
                } else {
                    totalHours += getHours(oppsArray[i].start[j], oppsArray[i].end[j]);
                    pastOpportunities.push(singleOpp);
                }
            }
        }
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
        <div id="authDashboard">
            <div>
                <NavBar user={user}/>
                <AuthHeader
                    user={user}
                />
                <Row className="justify-content-md-center middleSection">
                    <Col md="auto">
                        <UpcomingOpportunities
                            opps={upcomingOpportunities}
                            handleCancel={handleCancel}
                        />
                    </Col>
                    <Col id="impactSection" md="auto">
                        <h4 id="impact">YOUR IMPACT</h4>
                        <hr id="line" />
                        <p><b>Total Hours:</b> {totalHours}</p>
                        <p><b>Total Items Donated:</b> {donated}</p>
                        <PastOpportunity 
                            opps={pastOpportunities}
                        />
                    </Col>
                </Row>
                <Opportunities />
                <Footer />
            </div>  
        </div>    
    );
}

export default AuthenticatedUserDashboard;