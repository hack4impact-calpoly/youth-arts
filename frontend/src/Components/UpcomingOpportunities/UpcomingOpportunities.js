import "./UpcomingOpportunities.css";
import {Button} from "react-bootstrap"

/* 
    props.opps: array of upcoming opportunities (i.e. ["Upcoming Opp 1", "Upcoming Opp 2", ...])
*/

function UpcomingOpportunities(props) {
    const opps = props.opps;
    return (
        <div id="upOpps">
            <h4 id="upType">UPCOMING OPPORTUNTIES</h4>
            {opps.map((each, index) => (
                <div>
                    <p className="upOpp" key={index}>{each}</p>
                    <Button onClick={() => props.handleCancel(index)} variant="danger" className="p-1 m-2">Cancel</Button>
                </div>
            ))}
        </div>
    );
}

export default UpcomingOpportunities;