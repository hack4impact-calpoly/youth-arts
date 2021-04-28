import "./FAQPage.css";
import { Tab, ListGroup, Col, Row } from "react-bootstrap";

function FAQPage() {
    return (
        <body id="faqPage">
            <h1 id="faqTitle">Volunteer FAQs</h1>
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            <ListGroup.Item action href="#link1">
                            How do I get started with volunteering?
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                            Do I need to make an account to volunteer at Paso Robles Youth Arts Center?
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link3">
                            How do I volunteer if I'm under 18? 
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link4">
                            Does the Paso Robles Youth Arts Center offer court-mandated volunteer opportunities?                            
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link5">
                            Who can I contact if I have questions about volunteer opportunities and/or the Paso Robles Youth Arts Center in general?   
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link6">
                            Do I need a background check to volunteer?                            
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link7">
                            If I am background checked with another organization, do I need to get background checked again?                            
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link8">
                            Who has access to my information?                            
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                            You came to the right place! Start by making a volunteer account HERE which will allow you to see our current volunteer opportunities and will update you with new opportunities as they become available.
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                            It is highly recommended to have an account as it is a great way to keep track of your volunteer hours throughout the year, keep up to date on current opportunities, and ensures that we have all your required paperwork on file. 
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link3">
                            Volunteers under 18 are welcome and we have many opportunities for helping! Each posted volunteer opportunity will list any age requirements and any additional permission forms needed.                            
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link4">
                            Unfortunately, we do not offer court-mandated volunteer opportunities at this time.                            
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link5">
                            For questions or more info, please call or text the office at 805-238-5825 or email hello@pryoutharts.org.
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link6">
                            Yes, but only if working directly with students. For example, opportunities like volunteering at an event or in the office do not require a background check.
                            <br/>
                            The background check process is simple and confidential, please contact us to get the process started!
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link7">
                            As organizations are unable to share confidential info, you will need to be re-background checked with every new organization you are interested in volunteering with.
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link8">
                            Your data is kept strictly confidential and only our Custodian of Records has access to the results of your background check.
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </body>
    );
}

export default FAQPage;