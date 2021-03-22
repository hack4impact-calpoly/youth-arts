import "./UpcomingOpportunities.css";

/* 
    props.opps: array of upcoming opportunities (i.e. ["Upcoming Opp 1", "Upcoming Opp 2", ...])
*/

function UpcomingOpportunities(props) {
    const opps = props.opps;
    return (
        <div id="upOpps">
            <h4 id="upType">UPCOMING OPPORTUNTIES</h4>
            {opps.map((each, index) => (
                <p className="upOpp" key={index}>{each}</p>
            ))}
        </div>
    );
}

export default UpcomingOpportunities;