import "./AuthenticatedUserDashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import AuthHeader from "../../Components/AuthHeader/AuthHeader";
import Opportunities from "../../Components/Opportunities/Opportunities";
import UpcomingOpportunities from "../../Components/UpcomingOpportunities/UpcomingOpportunities"
import Footer from "../../Components/Footer/Footer";
import { Row, Col } from "react-bootstrap";

function AuthenticatedUserDashboard() {
    const opps = ["Upcoming 1", "Upcoming 2"];
    return (
        <div>
            <NavBar />
            <AuthHeader
                fName="Tessa"
            />
            <Row className="justify-content-md-center middleSection">
                <Col md="auto">
                    <UpcomingOpportunities
                        opps={opps}
                    />
                </Col>
                <Col id="impactSection" md="auto">
                    <h4 id="impact">YOUR IMPACT</h4>
                    <hr id="line" />
                </Col>
            </Row>
            <Opportunities />
            <Footer />
        </div>
    );
}

export default AuthenticatedUserDashboard;