import "./ContactOpportunityCard.css";
import Moment from "moment";

function ContactOpportunityCard(props) {
  return (
    <div id="contactCard">
      <p id="contactCardTitle">Opportunity Title: {props.title}</p>
      <p id="contactCardDate" className="datep">
        Date:
        <ul className="dateul">
          {props.start
            ? props.start.map((start, i) => (
                <div className="datediv">
                  {`${Moment(start)
                    .tz("America/Los_Angeles")
                    .format("MMMM Do YYYY, h:mm a")} to ${Moment(props.end[i])
                    .tz("America/Los_Angeles")
                    .format("MMMM Do YYYY, h:mm a\n")} \n\n`}
                </div>
              ))
            : null}
        </ul>
      </p>
      <p id="contactCardRoleName">Role: {props.task}</p>
      <p id="contactCardDonated">Donated: {props.donated.join(", ")}</p>
      <p id="contactCardDesc">Description: {props.description}</p>
    </div>
  );
}

export default ContactOpportunityCard;
