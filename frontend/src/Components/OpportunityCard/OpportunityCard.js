import "./OpportunityCard.css";
import arrow from "./../../Images/right-arrow.png";
import defaultimg from "./../../Images/PRYAC_mark.png";

function OpportunityCard(props) {
    const text = props.desc;
    const MAX_LENGTH = 40;

    return (
        <div className="opportunityCard">
            <table className="cardContent">
                <tr>
                    <td className="cardImage">
                        {props.image != null ? 
                            <img className="cardImage" src={props.image} alt="img" /> : 
                            <img className="cardImage" src={defaultimg} alt="img"/>
                        }
                    </td>
                    <td className="cardText">
                        <p className="cardTitle">{props.title}</p>
                        <p className="cardLocation">{props.location}</p>
                        {text.length > MAX_LENGTH ? (
                            <p className="cardDesc">
                                {text.substring(0, MAX_LENGTH) + "..."}
                            </p>
                            ) :
                            <p className="cardDesc">{text}</p>
                        }
                    </td>
                </tr>
            </table>
            <button className="cardDetails" src={props.details}>VIEW DETAILS <img className="cardArrow" src={arrow} alt="arrow"/></button>
            <i class="fas fa-chevron-right"></i>
        </div>
    );
}
export default OpportunityCard;
