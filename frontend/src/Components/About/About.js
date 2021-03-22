import "./About.css";
import ActionButton from "./../ActionButton/ActionButton";
import { Row, Col } from "react-bootstrap";

function About() {
    const picUrl = "https://pasoroblesdailynews.com/wp-content/uploads/2017/04/Paso-youth-arts-2.jpg";
    return (
        <div className="aboutSection">
            <Row>
                <Col md={6}>
                    <img className="aboutPic" src={picUrl} alt="about-img" />   
                </Col>
                <Col md={6}>
                    <h4 className="aboutTitle">WHAT WE'RE ABOUT</h4>
                    <p className="aboutDesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam ac turpis 
                        vel efficitur. Phasellus vestibulum mauris vel suscipit vestibulum. Aenean sed elit libero. 
                        Integer sodales eleifend ante, sit amet pharetra quam aliquet in. Sed venenatis, ex vel fermentum
                         venenatis, orci ex suscipit elit, a facilisis ex tellus quis lorem. Nam molestie rhoncus ex, et egestas 
                         orci pharetra eu. Ut laoreet odio a auctor hendrerit. Curabitur feugiat odio diam, vel elementum justo 
                         tincidunt in. </p>
                </Col>
            </Row>
                        
            <h2 id="actionTitle">WHAT YOU CAN DO</h2>
            
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <ActionButton 
                        actionType="volunteer"
                        action="Volunteer"
                    />
                </Col>
                <Col md={4}>
                    <ActionButton 
                        actionType="visit"
                        action="Visit Us"
                    />
                </Col>
                <Col md={4}>
                    <ActionButton 
                        actionType="donate"
                        action="Donate"
                    />
                </Col>
            </Row>
        </div>
    );
}

export default About;