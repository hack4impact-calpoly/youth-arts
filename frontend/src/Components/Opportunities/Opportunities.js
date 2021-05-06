import "./Opportunities.css";
import arrow from "./../../Images/right-arrow.png";
import OpportunityCard from "./../OpportunityCard/OpportunityCard";
import {Row, Col} from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

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
                setOpportunities(result);
        })
    }, [])

    function getFirstThree() {
        if(opportunities.length < 3) {
            return opportunities;
        }
        var results = [];
        for(var i = 0; i < 3; i++) {
            results.push(opportunities[i]);
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