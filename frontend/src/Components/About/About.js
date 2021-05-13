import "./About.css";
import ActionButton from "./../ActionButton/ActionButton";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function About() {
    const history = useHistory();
    const navigateToOpps = () => history.push('/opportunities');
    const navigateToYA = () => window.location.href = 'https://pryoutharts.org/';
    const navigateToDonate = () => window.location.href = 'http://pryoutharts.org/support/';

    const picUrl = "https://pasoroblesdailynews.com/wp-content/uploads/2017/04/Paso-youth-arts-2.jpg";
    return (
        <div className="aboutSection">
            <Row>
                <Col md={6}>
                    <img className="aboutPic" src={picUrl} alt="about-img" />   
                </Col>
                <Col md={6}>
                    <h4 className="aboutTitle">WHAT WE'RE ABOUT</h4>
                    <p className="aboutDesc">Paso Robles Youth Arts Center is a public non-profit organization founded in 1998 by Donna Berg. We provide nearly 400 students ages 5–18 with over fifty weekly classes and serve over 700 students annually. As we grow, our waiting list gets longer and our financial needs grow as well. We need the community to see how important the Youth Arts has become and how necessary it is to help it continue being the unique facility it is. We rely on donations as well as private and public funding and are so grateful for your gifts of any size! </p>
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