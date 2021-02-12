import "./Opportunities.css";
import arrow from "./../../Images/right-arrow.png";
import OpportunityCard from "./../OpportunityCard/OpportunityCard";
import {Row, Col} from "react-bootstrap";

function Opportunities(){
    return (
        <div>
            <h3 className="oppTitle">OPPORTUNITIES</h3>
            <div className="oppDisplay">
                <Row className="justify-content-md-center"> 
                    <Col md="auto">
                        <OpportunityCard 
                            image="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                            title="Opportunity Title"
                            location="Location"
                            desc="Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf"
                        />
                    </Col>
                    <Col md="auto">
                        <OpportunityCard 
                            image="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                            title="Opportunity Title"
                            location="Location"
                            desc="Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf"
                        />
                    </Col>
                    <Col md="auto">
                        <OpportunityCard 
                            image="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                            title="Opportunity Title"
                            location="Location"
                            desc="Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf"
                        />
                    </Col>
                    <Col md="auto">
                        <button className="viewMore"><img className="arrow" src={arrow} alt="arrow"/><br/><br/>View<br/> More</button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Opportunities;