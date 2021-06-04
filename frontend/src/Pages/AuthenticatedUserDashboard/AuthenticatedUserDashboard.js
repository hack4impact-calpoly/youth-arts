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
import axios from "axios"
import Moment from "moment";
import tz from "moment-timezone";

import Header from "../../Components/Header/Header";

  

const AuthenticatedUserDashboard = (props) => {
    //sample opportunities
    const { user } = props;
    var opportunities = [];
    var key;
    const [opps, setOpps] = useState(opportunities);
    const history = useHistory();


    const refreshOnLogin = () => {
        history.push("/");
        setTimeout(() => history.push(history.push("/")), 10);
        history.push("/");

      };

    const [allOpportunities, setAllOpportunities] = useState("");
    async function fetchAll() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/opportunities`);
            return response.data;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then(result => {
            if(result)
                setAllOpportunities(result);
        })
        refreshOnLogin();
    }, []);

    if(user && (user.opportunities !== null || user.opportunities !== undefined)) {
        Object.keys(user.opportunities).map((item) => {
            key = item;
            
            if(key !== null || key !== undefined) {
                for(var i = 0; i < user.opportunities[key].length; i++) {
                    (user.opportunities[key][i])["oppId"] = key
                    if (!(opportunities.includes(user.opportunities[key][i]))){
                        opportunities.push(user.opportunities[key][i]);
                    }
                }
            } 
            // return null;
        })
    }

    

    function handleCancel(cancelOpp) {
        if (opps.length !== opportunities.length)
        {
            setOpps(opportunities);
        }
        let updated = opps;
        for(var i = 0; i < updated.length; i++) {
            if(updated[i].task === cancelOpp.task) {
                if (updated[i].start.length === 0)
                {
                    updated.splice(i, 1);
                    break;
                }
                for(var j = 0; j < updated[i].start.length; j++) {
                    if(cancelOpp.start === updated[i].start[j] && cancelOpp.end === updated[i].end[j]) {
                        updated[i].start.splice(j, 1);
                        updated[i].end.splice(j, 1);
                        if (updated[i].start.length === 0)
                        {
                            updated.splice(i, 1);
                        }
                        break;
                    }
                }
                break;
            }
        }
        setOpps(updated);
        var oppToUpdate = {}
        for(var i = 0; i < allOpportunities.length; i++) {
            if(allOpportunities[i]._id === cancelOpp.id) {
                oppToUpdate = allOpportunities[i];
                var opVols = oppToUpdate.volunteers[props.user._id];
                for(var j = 0; j < opVols.length; j++) {
                    if(opVols[j].task === cancelOpp.task) {
                        for(var k = 0; k < opVols[j].start.length; k++) {
                            if(Moment(cancelOpp.start).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a') === Moment(opVols[j].start[k]).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a') && Moment(cancelOpp.end).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a') === Moment(opVols[j].end[k]).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a')) {
                                oppToUpdate.volunteers[props.user._id][j].start.splice(k, 1);
                                oppToUpdate.volunteers[props.user._id][j].end.splice(k, 1);
                                if (oppToUpdate.volunteers[props.user._id][j].start.length === 0)
                                {
                                    oppToUpdate.volunteers[props.user._id].splice(j, 1);
                                }
                                break;
                            }
                        
                        }
                        break;
                    }
                }
                let newO = allOpportunities;
                newO[i] = oppToUpdate
                setAllOpportunities(newO);
                break;
            }
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateOpportunity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oppToUpdate)
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });    
        


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
            opportunities: newOpportunites,
            cancelOpp: cancelOpp
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/cancelOpportunity`, {
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
        return (diff/(1000*60*60))%24;
        
    }

    // sort upcoming and past opportunities
    var oppsArray = Object.values(opps);
    var upcomingOpportunities = []
    var pastOpportunities = []
    var currentDate = new Date();
    var donated = 0;
    var totalHours = 0;
    console.log(oppsArray);
    for(var i = 0; i < oppsArray.length; i++) {
        donated += getDonated(oppsArray[i]);
        for(var j = 0; j < oppsArray[i].start.length; j++) {
            var singleOpp = {
                task: oppsArray[i].task,
                start: oppsArray[i].start[j],
                end: oppsArray[i].end[j],
                id: oppsArray[i].oppId,
                donated: oppsArray[i].donated
            }
            if(singleOpp !== undefined) {
                if(new Date(singleOpp.start) > currentDate) {
                    upcomingOpportunities.push(singleOpp);
                } 
                else {
                    console.log(oppsArray[i].task);
                    console.log("ELSE");
                    console.log(oppsArray[i].donated);
                    totalHours += getHours(oppsArray[i].start[j], oppsArray[i].end[j]);
                    pastOpportunities.push(singleOpp);
                }
            }
        }
        if (oppsArray[i].start.length === 0)
        {
            var singleOpp = {
                task: oppsArray[i].task,
                start: oppsArray[i].start,
                end: oppsArray[i].end,
                id: oppsArray[i].oppId,
                donated: oppsArray[i].donated
            }
            pastOpportunities.push(singleOpp);

        }
    }

    

    return (
        <div id="authDashboard">
            <div>
                <Header user={user}/>
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
                    <Col id="justify-content-md-center impactSection" md="auto">
                        <h4 id="impact">YOUR IMPACT</h4>
                        <hr id="line" />
                        <p><b>Total Hours:</b> {totalHours.toFixed(2)}</p>
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