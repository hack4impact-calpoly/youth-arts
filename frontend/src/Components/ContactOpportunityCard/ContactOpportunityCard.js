import "./ContactOpportunityCard.css";
import Moment from "moment";

function ContactOpportunityCard(props) {
    return (
        <div id="contactCard">
            <p id="contactCardDate">Date: {Moment(props.start).format('MMMM Do YYYY, h:mm:ss a') + " to " + Moment(props.end).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p id="contactCardRoleName">Role: {props.roleName}</p>
            <p id="contactCardDonated">Donated: {props.donated}</p>
            <p id="contactCardDesc">Description: {props.description}</p>
        </div>
    );
}

export default ContactOpportunityCard;