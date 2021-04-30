import "./ContactPage.css"
import ContactOpportunityCard from "./../../Components/ContactOpportunityCard/ContactOpportunityCard"
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

function ContactPage() {
    const anonPic = "https://nlgmass.org/wp-content/uploads/eb4d0533e292cf95bff821da17289e80.png"
    //get id and find volunteer object on backend
    const id = window.location.hash.substring(1);
    const [contact, setContact] = useState("");

    async function fetchAll() {
        try {
            const response = await axios.get("http://localhost:4000/api/volunteer/" + id);
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
                setContact(result);
        })
    }, []);

    function getEvents() {
        if(contact === null || contact.opportunities === undefined || contact.opportunities === null) {
            return false;
        }
        return true;
    }
  
    return(
        <div id="contactPage">
            <h1 id="contactName">{contact.firstName + " " + contact.lastName}</h1>
            <Container fluid>
                <Row>
                    <Col md="auto">{contact && contact.picture !== null ? <img id="prof-pic" src={anonPic} alt="prof-pic"/> : <img id="prof-pic" src={anonPic} alt="prof-pic"/>}</Col>
                    <Col id="contactInformation">
                        <div id="contact">
                            <h3 className="contactTitle">Contact Information</h3>
                            <h5>Phone Number: {contact.phoneNum}</h5>
                            <h5>Email: {contact.email}</h5>
                            <h5>Address: {contact.address}</h5>
                        </div>
                        <div id="volunteerStuff">
                            <h5>Areas of Interest: {contact && contact.AOI.map((c, index) => (
                                <li id="volunteerAOI" key={index}>{c}</li>
                            ))}</h5>
                            <h5>Role In The Community: {contact.communityRole}</h5>
                        </div>
                        <div id="contactExperience">
                            <h3 className="contactTitle">Experience</h3>
                            <h5>Volunteer Experience: {contact.experience}</h5>
                            <h5>Employment History: {contact.workHistory}</h5>
                        </div>
                        <div id="outreach">
                            <h3 className="contactTitle">Outreach</h3>
                            <h5>How Did They Hear About PRYAC? {contact.outreach}</h5>
                        </div>
                        <div id="outreach">
                            <h3 className="contactTitle">More Information</h3>
                            <h5>Tasks: {contact && contact.tasks.map((c, index) => (
                                <li id="volunteerAOI" key={index}>{c}</li>
                            ))}</h5>
                            <h5>Notes: {contact.notes}</h5>
                            <h5>Board Member? {contact && contact.boardMember ? "Yes" : "No"}</h5>
                        </div>
                        <div id="outreach">
                            <h3 className="contactTitle">Events</h3>
                            {getEvents() ? Object.values(contact.opportunities).map((opps, index) => (
                                opps.map((singleOpp, i) => (
                                    <ContactOpportunityCard key={i} {...singleOpp} />
                                ))
                            )) : null}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ContactPage;