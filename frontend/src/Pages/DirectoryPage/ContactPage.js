import "./ContactPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ContactOpportunityCard from "../../Components/ContactOpportunityCard/ContactOpportunityCard";

function ContactPage(props) {
  const anonPic =
    "https://nlgmass.org/wp-content/uploads/eb4d0533e292cf95bff821da17289e80.png";
  // get id and find volunteer object on backend
  const id = window.location.hash.substring(1);
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState(contact.notes);
  const [refresh, setRefresh] = useState(0);

  async function fetchAll() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/volunteer/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setContact(result);
      setNotes(result.notes);
    });
  }, []);

  function getEvents() {
    if (
      contact === null ||
      contact.opportunities === undefined ||
      contact.opportunities === null
    ) {
      return false;
    }
    console.log(contact.opportunities);
    return true;
  }
  function handleChangeDescription(e) {
    setNotes(e.target.value);
    console.log(notes);
  }
  function uploadNotes() {
    const c = contact;
    c.notes = notes;
    setContact(c);
    console.log(c);
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteer/updateVolunteer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }).then((response) => {
      response.json().then((data) => {
        console.log(`Successful${data}`);
      });
    });
  }
  function uploadAdmin() {
    const c = contact;
    c.admin = !c.admin;
    setContact(c);
    console.log(c);
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteer/updateVolunteer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }).then((response) => {
      response.json().then((data) => {
        console.log(`Successful${data}`);
      });
    });
    setRefresh(refresh + 1);
  }
  function uploadBoardMember() {
    const c = contact;
    c.boardMember = !c.boardMember;
    setContact(c);
    console.log(c);
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteer/updateVolunteer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }).then((response) => {
      response.json().then((data) => {
        console.log(`Successful${data}`);
      });
    });
    setRefresh(refresh + 1);
  }

  return (
    <div id="contactPage">
      {contact.firstName ? (
        <h1 id="contactName">{`${contact.firstName} ${contact.lastName}`}</h1>
      ) : (
        <h2 id="contactName">{"User did not finish registering. "}</h2>
      )}
      <Container fluid>
        <Row>
          <Col md="auto">
            {contact &&
            contact.picture !== undefined &&
            contact.picture !== null ? (
              <img id="prof-pic" src={contact.picture} alt="prof-pic" />
            ) : (
              <img id="prof-pic" src={anonPic} alt="prof-pic" />
            )}

            <Row>
              <div>
                <Row>
                  <button
                    className="notesButton"
                    type="submit"
                    onClick={uploadAdmin}
                  >
                    {contact.admin ? "Remove Admin" : "Make Admin"}
                  </button>
                </Row>
                <Row>
                  <button
                    className="notesButton"
                    type="submit"
                    onClick={uploadBoardMember}
                  >
                    {contact.boardMember
                      ? "Remove Board Member"
                      : "Make Board Member"}
                  </button>
                </Row>
                <Row>
                  <h3 id="notesText" className="contactTitle">
                    Notes
                  </h3>
                </Row>
                <Row>
                  <textarea
                    className="textareaNotes"
                    onChange={(e) => handleChangeDescription(e)}
                    value={notes}
                    placeholder="Enter notes about the volunteer"
                  />
                </Row>
                <Row>
                  <button
                    className="notesButton"
                    type="submit"
                    onClick={uploadNotes}
                  >
                    Post Note
                  </button>
                </Row>
              </div>
            </Row>
          </Col>
          <Col id="contactInformation">
            <div id="contact">
              <h3 className="contactTitle">Contact Information</h3>
              <h5>Phone Number: {contact.phoneNum}</h5>
              <h5>Email: {contact.email}</h5>
              <h5>Address: {contact.address}</h5>
            </div>
            <div id="volunteerStuff">
              <h5>
                Areas of Interest:{" "}
                {contact &&
                  contact.AOI.map((c, index) => (
                    <li id="volunteerAOI" key={index}>
                      {c}
                    </li>
                  ))}
              </h5>
              <h5>Role In The Community: {contact.communityRole}</h5>
            </div>
            <div id="contactExperience">
              <h3 className="contactTitle">Experience</h3>
              <h5>Volunteer Experience: {contact.experience}</h5>
              <h5>Employment History: {contact.workHistory}</h5>
            </div>
            <div id="outreach">
              <h3 className="contactTitle">Outreach</h3>
              <h5>
                How Did They Hear About The Youth Arts? {contact.outreach}
              </h5>
            </div>
            <div id="outreach">
              <h3 className="contactTitle">More Information</h3>
              <h5>
                Board Member? {contact && contact.boardMember ? "Yes" : "No"}
              </h5>
            </div>
            <div id="outreach">
              <h3 className="contactTitle">Events</h3>
              {getEvents() && !!props.allOpportunities
                ? Object.keys(contact.opportunities).map((oppId) =>
                    contact.opportunities[oppId].map((singleOpp, i) => {
                      console.log(props.allOpportunities);
                      const theOp = props.allOpportunities.filter(
                        (o) => o._id === oppId
                      );
                      return theOp[0] ? (
                        <ContactOpportunityCard
                          key={i}
                          title={theOp[0].title}
                          {...singleOpp}
                        />
                      ) : null;
                    })
                  )
                : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactPage;
