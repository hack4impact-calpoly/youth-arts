import "./FAQPage.css";
import { Accordion, Card } from "react-bootstrap";

function FAQPage() {
    return (
        <body>
            <div id="calHeader">
                <h1 className="calTitle">VOLUNTEER FAQs</h1>
            </div>
            <div id="faqPage">
                <Accordion>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="0"
                            className="panel-title"
                        >
                            How do I get started with volunteering?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                You came to the right place! Start by making a
                                volunteer account, which will allow you to see
                                our current volunteer opportunities and will
                                update you with new opportunities as they become
                                available.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="1"
                            className="panel-title"
                        >
                            Do I need to make an account to volunteer at Paso
                            Robles Youth Arts Center?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                It is highly recommended to have an account as
                                it is a great way to keep track of your
                                volunteer hours throughout the year, keep up to
                                date on current opportunities, and ensures that
                                we have all your required paperwork on file.{" "}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="2"
                            className="panel-title"
                        >
                            How do I volunteer if I'm under 18?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                Volunteers under 18 are welcome and we have many
                                opportunities for helping! Each posted volunteer
                                opportunity will list any age requirements and
                                any additional permission forms needed.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="3"
                            className="panel-title"
                        >
                            Does the Paso Robles Youth Arts Center offer
                            court-mandated volunteer opportunities?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                Unfortunately, we do not offer court-mandated
                                volunteer opportunities at this time.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="4"
                            className="panel-title"
                        >
                            Who can I contact if I have questions about
                            volunteer opportunities and/or the Paso Robles Youth
                            Arts Center in general?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                For questions or more info, please call or text
                                the office at 805-238-5825 or email
                                hello@pryoutharts.org.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="5"
                            className="panel-title"
                        >
                            Do I need a background check to volunteer?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                Yes, but only if working directly with students.
                                For example, opportunities like volunteering at
                                an event or in the office do not require a
                                background check.
                                <br />
                                The background check process is simple and
                                confidential, please contact us to get the
                                process started!
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="6"
                            className="panel-title"
                        >
                            If I am background checked with another
                            organization, do I need to get background checked
                            again?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                            <Card.Body>
                                As organizations are unable to share
                                confidential info, you will need to be
                                re-background checked with every new
                                organization you are interested in volunteering
                                with.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey="7"
                            className="panel-title"
                        >
                            Who has access to my information?
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="7">
                            <Card.Body>
                                Your data is kept strictly confidential and only
                                our Custodian of Records has access to the
                                results of your background check.
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </body>
    );
}

export default FAQPage;
