import "./OpportunityCard.css";
import arrow from "./../../Images/right-arrow.png";
import defaultimg from "./../../Images/YouthArtsLogoMark.png";
import classroom from '../../Images/classroom.png'
import event from '../../Images/event.png'
import fundraiser from '../../Images/fundraiser.png'
import maintenance from '../../Images/maintenance.png'
import officeAdmin from '../../Images/office-admin.png'
import performance from '../../Images/performance.png'
import { useHistory } from "react-router-dom";

function OpportunityCard(props) {
    const text = props.description;
    const MAX_LENGTH = 40;
    let skill = props.skills[0];
    const icons = [classroom, event, fundraiser, maintenance, officeAdmin, performance, defaultimg];
    const AOIOptions = ["Classroom", "Event", "Fundraiser", "Maintenance", "Office/Admin", "Performance", ""];
    const history = useHistory();
    const navigateTo = () => history.push('/opportunityDetail/' + props._id);
    if (props.skills && props.skills.length > 1 && props.skills[0] == "")
    {
        skill = props.skills[1];

    }

    return (
        <div className="opportunityCard">
            <table className="cardContent">
                <tr>
                    <td className="cardImage">
                        {props.skills != null ? 
                            <img className="cardImage" src={icons[AOIOptions.indexOf(skill)]} alt="img" /> : 
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
            <button className="cardDetails" onClick={navigateTo} src={props.details}>VIEW DETAILS <img className="cardArrow" src={arrow} alt="arrow"/></button>
            {/* <i class="fas fa-chevron-right"></i> */}
        </div>
    );
}
export default OpportunityCard;
