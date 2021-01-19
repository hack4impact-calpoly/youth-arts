import styles from "./OpportunityCard.css";

function OpportunityCard(props) {
    const text = props.desc;
    const MAX_LENGTH = 40;

    return (
        <div className="opportunityCard">
            <table className="cardContent">
                <tr>
                    <th className="cardImage">
                        <img className="cardIcon" src={props.icon} alt="icon" />

                    </th>
                    <th className="cardText">
                        <p className="cardTitle">{props.title}</p>
                        <p className="cardLocation">{props.location}</p>
                        {text.length > MAX_LENGTH ? (
                            <p className="cardDesc">
                                {text.substring(0, MAX_LENGTH) + "..."}
                            </p>
                            ) :
                            <p className="cardDesc">{text}</p>
                        }
                    </th>
                </tr>
            </table>
            <div>
            <button className="cardDetails" src={props.details}>VIEW DETAILS</button>

            </div>
        </div>
    );
}
export default OpportunityCard;
