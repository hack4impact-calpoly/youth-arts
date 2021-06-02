import "./PastOpportunity.css";
import { Row, Col, Button } from "react-bootstrap";
import Moment from "moment";
import tz from "moment-timezone";
import {Link} from 'react-router-dom'

/*
    props.oppType: title of component (e.g. "PAST OPPORTUNITY" or "CURRENT OPPORTUNITIES")
    props.opps: array of opportunities (e.g. ["Opportunity 1", "Opportunity 2", ...])
*/

const PastOpportunity = (props) => {
    const { user } = props;
    const pastOpportunities = props.opps;
    return (
        <div id="pastOpps">
            <h4 id="upType">PAST OPPORTUNTIES</h4>
            {pastOpportunities && pastOpportunities.map((opp, i) => 
            {
            if (opp.id === "609aaae254dce7000860ddb5") {
                console.log(opp);
                return;
            }
            return (
                <div id="pastOppsInside">
                <Row key={i} className="pastOpp">
                    <Col md="auto" className="col-6">
                        <Link to={'/opportunityDetail/' + opp.id} className="pastOppLink">
                            {(opp.task === "Donated") ? <p className="pastOppTask">{opp.task} {opp.donated.join(', ')}</p> : 
                                                        <p className="pastOppTask">{opp.task} </p>}
                            <p className="pastOppDate">{Moment(opp.start).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm a') + " to " + Moment(opp.end).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm a')}</p>
                        </Link>
                    </Col>
                </Row>
                </div>
            )}
            )}
        </div>
    );
}

export default PastOpportunity;