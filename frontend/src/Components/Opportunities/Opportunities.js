import "./Opportunities.css";
import arrow from "./../../Images/right-arrow.png";
import OpportunityCard from "./../OpportunityCard/OpportunityCard";
import {Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";
import moment from 'moment'

const Opportunities = (props) => {

    const [opportunities, setOpportunities] = useState("");
    async function fetchAll() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/opportunities`);
            return response.data;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        fetchAll().then(result => {
            if(result)
                setOpportunities(result.sort((a, b) => a.start_event < b.start_event ? -1 : 1));
        })
    }, [])

    function getFirstThree() {
        for(var i = 0; i < opportunities.length; i++) {
            if (opportunities[i]._id === '6099c78c001ee300081c1dab' || opportunities[i].title === 'Board Member')
            {
                console.log(opportunities);
                opportunities.splice(i, 1);
                break;
            }
        }
        if(opportunities.length < 3) {
            return opportunities;
        }
        var results = [];
        for(var i = 0; i < opportunities.length; i++) {
            if (moment.duration(moment(opportunities[i].end_event[opportunities[i].end_event.length - 1]).diff(moment().startOf('day'))).asHours() > 0)
            {
                results.push(opportunities[i]);
            }
            if (results.length === 3)
            {
                break;
            }
        }
        return results;
    }

    const firstThree = getFirstThree();

    const history = useHistory();
    const navigateTo = () => history.push('opportunities/');

    return (
        <div>
            <h3 className="oppTitle">OPPORTUNITIES</h3>
            <div className="oppDisplay">
                <Row className="justify-content-md-center"> 
                    {Object.values(firstThree).map((opportunity, index) => (
                        <Col md="auto">
                            <OpportunityCard key={index} {...opportunity} />
                        </Col>
                    ))}
                    <Col md="auto">
                        <button onClick={navigateTo} className="viewMore"><img className="arrow" src={arrow} alt="arrow"/><br/><br/>View<br/> More</button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Opportunities;