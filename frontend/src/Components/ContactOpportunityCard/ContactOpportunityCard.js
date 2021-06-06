import "./ContactOpportunityCard.css";
import Moment from "moment";

function ContactOpportunityCard(props) {
    return (
        <div id="contactCard">
            <p id="contactCardDate">Date: {Moment(props.start).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm a') + " to " + Moment(props.end).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm a')}</p>
            <p id="contactCardRoleName">Role: {props.task}</p>
            <p id="contactCardDonated">Donated: {props.donated.join(", ")}</p>
            <p id="contactCardDesc">Description: {props.description}</p>
        </div>
    );
}

export default ContactOpportunityCard;