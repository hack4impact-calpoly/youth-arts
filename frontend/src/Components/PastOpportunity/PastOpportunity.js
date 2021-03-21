import "./PastOpportunity.css";

/*
    props.oppType: title of component (e.g. "PAST OPPORTUNITY" or "CURRENT OPPORTUNITIES")
    props.opps: array of opportunities (e.g. ["Opportunity 1", "Opportunity 2", ...])
*/

function PastOpportunity(props) {
    const opps = props.opps;
    return (
        <div id="pastOpp">
            <p id="oppType">{props.oppType}</p>
            {opps.map((each, index) => (
                <p class="opp" key={index}>{each}</p>
            ))}
        </div>
    );
}

export default PastOpportunity;