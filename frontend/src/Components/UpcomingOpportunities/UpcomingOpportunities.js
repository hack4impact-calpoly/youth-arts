import "./UpcomingOpportunities.css";
import { Button, Row, Col } from "react-bootstrap"
import Moment from "moment";

/* 
    props.opps: array of upcoming opportunities (i.e. ["Upcoming Opp 1", "Upcoming Opp 2", ...])
*/

function UpcomingOpportunities(props) {
    const opps = props.opps;
    var oppsArray = Object.values(opps);
    var oppsToDisplay = []

    // put opportunities into a 1D array
    for(var i = 0; i < oppsArray.length; i++) {
        for(var j = 0; j < oppsArray[i].start.length; j++) {
            var singleOpp = {
                task: oppsArray[i].task,
                start: oppsArray[i].start[j],
                end: oppsArray[i].end[j]
            }            
            if(singleOpp !== undefined) oppsToDisplay.push(singleOpp);
        }
    }

    return (
        <div id="upOpps">
            <h4 id="upType">UPCOMING OPPORTUNTIES</h4>
            {oppsToDisplay && oppsToDisplay.map((opp, i) => (
                <Row key={i} className="upOpp">
                    <Col md="auto" className="col-6">
                        <p className="upOppTask">{opp.task}</p>
                        <p className="upOppDate">{Moment(opp.start).format('MMMM Do YYYY, h:mm a') + " to " + Moment(opp.end).format('MMMM Do YYYY, h:mm a')}</p>
                    </Col>
                    <Col className="upOppCancel">
                        <Button variant="danger" onClick={() => props.handleCancel(opp)}>Cancel</Button>
                    </Col>
                </Row>
            ))}
        </div>
    );
}

export default UpcomingOpportunities;