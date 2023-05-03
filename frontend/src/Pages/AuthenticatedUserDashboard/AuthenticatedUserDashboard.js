import "./AuthenticatedUserDashboard.css";
import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import AuthHeader from "../../Components/AuthHeader/AuthHeader";
import Opportunities from "../../Components/Opportunities/Opportunities";
import UpcomingOpportunities from "../../Components/UpcomingOpportunities/UpcomingOpportunities";
import PastOpportunity from "../../Components/PastOpportunity/PastOpportunity";
import Footer from "../../Components/Footer/Footer";

import Header from "../../Components/Header/Header";

function AuthenticatedUserDashboard(props) {
  // sample opportunities
  const { user } = props;
  const opportunities = [];
  let key;
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
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/opportunities`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setAllOpportunities(result);
    });
    refreshOnLogin();
  }, []);

  if (
    user &&
    (user.opportunities !== null || user.opportunities !== undefined)
  ) {
    Object.keys(user.opportunities).map((item) => {
      key = item;

      if (key !== null || key !== undefined) {
        for (let i = 0; i < user.opportunities[key].length; i++) {
          user.opportunities[key][i].oppId = key;
          if (!opportunities.includes(user.opportunities[key][i])) {
            opportunities.push(user.opportunities[key][i]);
          }
        }
      }
      // return null;
    });
  }

  function handleCancel(cancelOpp) {
    if (opps.length !== opportunities.length) {
      setOpps(opportunities);
    }
    const updated = opps;
    console.log(cancelOpp);
    console.log(updated);

    Object.keys(user.opportunities).map((item, o) => {
      console.log(item);
      if (item === cancelOpp.id) {
        key = item;
        console.log(key);
        console.log(user.opportunities[key]);
        for (let i = 0; i < user.opportunities[key].length; i++) {
          if (user.opportunities[key][i]._id === cancelOpp._id) {
            if (user.opportunities[key][i].start.length <= 1) {
              user.opportunities[key].splice(i, 1);
              break;
            }
            for (let j = 0; j < user.opportunities[key][i].start.length; j++) {
              if (
                cancelOpp.start === user.opportunities[key][i].start[j] &&
                cancelOpp.end === user.opportunities[key][i].end[j]
              ) {
                user.opportunities[key][i].start.splice(j, 1);
                user.opportunities[key][i].end.splice(j, 1);
                if (user.opportunities[key][i].start.length === 0) {
                  user.opportunities[key][i].splice(i, 1);
                }
                break;
              }
            }
            break;
          }
        }
      }
    });
    console.log(user.opportunities);

    let oppToUpdate = {};
    for (let i = 0; i < allOpportunities.length; i++) {
      if (allOpportunities[i]._id === cancelOpp.id) {
        oppToUpdate = allOpportunities[i];
        const opVols = oppToUpdate.volunteers[props.user._id];
        for (let j = 0; j < opVols.length; j++) {
          if (opVols[j]._id === cancelOpp._id) {
            for (let k = 0; k < opVols[j].start.length; k++) {
              if (
                Moment(cancelOpp.start)
                  .tz("America/Los_Angeles")
                  .format("MMMM Do YYYY, h:mm:ss a") ===
                  Moment(opVols[j].start[k])
                    .tz("America/Los_Angeles")
                    .format("MMMM Do YYYY, h:mm:ss a") &&
                Moment(cancelOpp.end)
                  .tz("America/Los_Angeles")
                  .format("MMMM Do YYYY, h:mm:ss a") ===
                  Moment(opVols[j].end[k])
                    .tz("America/Los_Angeles")
                    .format("MMMM Do YYYY, h:mm:ss a")
              ) {
                oppToUpdate.volunteers[props.user._id][j].start.splice(k, 1);
                oppToUpdate.volunteers[props.user._id][j].end.splice(k, 1);
                if (
                  oppToUpdate.volunteers[props.user._id][j].start.length === 0
                ) {
                  oppToUpdate.volunteers[props.user._id].splice(j, 1);
                }
                break;
              }
            }
            break;
          }
        }
        const newO = allOpportunities;
        newO[i] = oppToUpdate;
        setAllOpportunities(newO);
        break;
      }
    }
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateOpportunity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oppToUpdate),
    }).then((response) => {
      response.json().then((data) => {
        console.log(`Successful${data}`);
      });
    });

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
      opportunities: user.opportunities,
      cancelOpp,
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/cancelOpportunity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateVolunteer),
    }).then((response) => {
      response.json().then((data) => {
        console.log(`Successful${data}`);
      });
    });
    setOpps(opps);
  }

  function getDonated(opp) {
    if (opp.donated === null || opp.donated === undefined) return 0;
    const { donated } = opp;
    let total = 0;
    for (let d = 0; d < donated.length; d++) {
      total++;
    }
    return total;
  }

  function getHours(start, end) {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return (diff / (1000 * 60 * 60)) % 24;
  }

  // sort upcoming and past opportunities
  const oppsArray = Object.values(opps);
  const upcomingOpportunities = [];
  const pastOpportunities = [];
  const currentDate = new Date();
  let donated = 0;
  let totalHours = 0;
  console.log(oppsArray);
  console.log(user.opportunities);
  let singleOpp = {};
  for (let i = 0; i < oppsArray.length; i++) {
    donated += getDonated(oppsArray[i]);
    for (let j = 0; j < oppsArray[i].start.length; j++) {
      singleOpp = {
        task: oppsArray[i].task,
        start: oppsArray[i].start[j],
        end: oppsArray[i].end[j],
        id: oppsArray[i].oppId,
        donated: oppsArray[i].donated,
        _id: oppsArray[i]._id,
      };
      if (singleOpp !== undefined) {
        if (new Date(singleOpp.start) > currentDate) {
          upcomingOpportunities.push(singleOpp);
        } else {
          totalHours += getHours(oppsArray[i].start[j], oppsArray[i].end[j]);
          pastOpportunities.push(singleOpp);
        }
      }
    }
    if (oppsArray[i].start.length === 0) {
      singleOpp = {
        task: oppsArray[i].task,
        start: oppsArray[i].start,
        end: oppsArray[i].end,
        id: oppsArray[i].oppId,
        donated: oppsArray[i].donated,
      };
      pastOpportunities.push(singleOpp);
    }
  }

  return (
    <div id="authDashboard">
      <div>
        <Header user={user} />
        <AuthHeader user={user} />
        <Row className="justify-content-md-center middleSection mx-0">
          <Col md="auto">
            <UpcomingOpportunities
              opps={upcomingOpportunities}
              handleCancel={handleCancel}
            />
          </Col>
          <Col id="justify-content-md-center impactSection" md="auto">
            <h4 id="impact">YOUR IMPACT</h4>
            <hr id="line" />
            <p>
              <b>Total Hours:</b> {totalHours.toFixed(2)}
            </p>
            <p>
              <b>Total Items Donated:</b> {donated}
            </p>
            <PastOpportunity opps={pastOpportunities} />
          </Col>
        </Row>
        <Opportunities />
        <Footer />
      </div>
    </div>
  );
}

export default AuthenticatedUserDashboard;
