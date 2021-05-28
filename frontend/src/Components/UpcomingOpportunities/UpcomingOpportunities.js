import "./UpcomingOpportunities.css";
import { Button, Row, Col } from "react-bootstrap"
import { useState } from "react";
import Moment from "moment";
import {Link} from 'react-router-dom'

/* 
    props.opps: array of upcoming opportunities (i.e. ["Upcoming Opp 1", "Upcoming Opp 2", ...])
*/

function UpcomingOpportunities(props) {
    const [upcomingOpportunities, setUpOpps] = useState(props.opps);
    console.log(upcomingOpportunities);

    function handleButtonPress(index) {
        const updated = upcomingOpportunities.filter((opp, i) => {
            return i !== index
        });
        setUpOpps(updated);
        return true;
    }

    return (
        <div id="upOpps">
            <h4 id="upType">UPCOMING OPPORTUNTIES</h4>
            {upcomingOpportunities && upcomingOpportunities.map((opp, i) => (
                <Row key={i} className="upOpp">
                    <Col md="auto" className="col-6">
                        <Link to={'/opportunityDetail/' + opp.id} className="pastOppLink">
                            <p className="upOppTask">{opp.task}</p>
                            <p className="upOppDate">{Moment(opp.start).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm a') + " to " + Moment(opp.end).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm a')}</p>
                        </Link>
                    </Col>
                    <Col className="upOppCancel">
                        <Button variant="danger" onClick={() => handleButtonPress(i) && props.handleCancel(opp)}>Cancel</Button>
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default UpcomingOpportunities;