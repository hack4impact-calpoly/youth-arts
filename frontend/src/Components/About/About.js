import "./About.css";
import ActionButton from "./../ActionButton/ActionButton";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import youthArtsSign from "../../Images/youthArtsSign.jpg";

function About() {
    const history = useHistory();
    const navigateToOpps = () => history.push('/opportunities');
    const navigateToYA = () => window.location.href = 'https://pryoutharts.org/';
    const navigateToDonate = () => window.location.href = 'https://donorbox.org/youth-arts-donate';

    const picUrl = "https://pasoroblesdailynews.com/wp-content/uploads/2017/04/Paso-youth-arts-2.jpg";
    return (
        <div className="aboutSection">
            <Row>
                <Col md={6}>
                    <img className="aboutPic" src={youthArtsSign} alt="about-img" />   
                </Col>
                <Col md={6}>
                    <h4 className="aboutTitle">WHAT WE'RE ABOUT</h4>
                    <p className="aboutDesc">The Paso Robles Youth Arts Center is a public non-profit organization founded in 1998 by Donna Berg. We provide nearly 400 students ages 5–18 with over 50 weekly classes in the visual and performing arts for FREE! To date, we've impacted over 15,000 students! We encourage the community to see how important the Youth Arts has become and how necessary it is to support this life-changing organization. Your involvement of any kind allows us to continue to fulfill our mission and support this community! </p>
                </Col>
            </Row>
                        
            <h2 id="actionTitle">WHAT YOU CAN DO</h2>
            
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <ActionButton 
                        actionType="volunteer"
                        action="Volunteer"
                        onClick={navigateToOpps}
                    />
                </Col>
                <Col md={4}>
                    <ActionButton 
                        actionType="visit"
                        action="Visit Our Website"
                        onClick={navigateToYA}
                    />
                </Col>
                <Col md={4}>
                    <ActionButton 
                        actionType="donate"
                        action="Donate"
                        onClick={navigateToDonate}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default About;