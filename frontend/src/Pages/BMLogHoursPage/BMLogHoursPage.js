import "./BMLogHoursPage.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function BMLogHoursPage(props) {
    //stores inputs from form
    const [startDT, setStartDT] = useState("");
    const [endDT, setEndDT] = useState("");
    const [tasks, setTasks] = useState("");

    var opportunities;
    var key;

    if (props.user !== null && props.user.opportunities !== null) {
        opportunities = props.user.opportunities;
        Object.keys(opportunities).map((item) => {
            key = item;
            return null;
        })
        opportunities = opportunities[key];
    }

    function isValidForm() {
        if (startDT === "" || endDT === "" || tasks === "") {
            alert("Incomplete form. Please try again.");
            return false;
        }
        else if (startDT > endDT) {
            alert("Start and end dates are invalid. Please enter dates again.");
            return false;
        }
        return true;
    }

    //push form as element in opportunity array in volunteer schema
    function handleSubmit() {
        // make sure opportunties is defined
        if (opportunities === null || opportunities === undefined) return;
        //check if form is valid
        if (!isValidForm()) return;
        
        //if opportunities alreayd has the task, append start and end d/t to existing array
        var contains = false;
        opportunities.forEach(function(item) {
            if(item.task.toLowerCase() === tasks.toLowerCase()) {
                item.start.push(startDT);
                item.end.push(endDT);
                contains = true;
            }
        })
        //else add the opportunity
        if(!contains) {
            var newOpp = {
                task: tasks,
                start: [startDT],
                end: [endDT],
                description: "",
                donated: []
            }
    
            opportunities.push(newOpp)
        }

        // push new opportunities to database
        var newOpportunites = props.user.opportunities;
        console.log(newOpportunites);
        newOpportunites[key] = opportunities;
        const updateVolunteer = {
            _id: props.user._id,
            AOI: props.user.AOI,
            address: props.user.address,
            boardMember: props.user.boardMember,
            communityRole: props.user.communityRole,
            email: props.user.email,
            experience: props.user.experience,
            firstName: props.user.firstName,
            googleId: props.user.googleId,
            lastName: props.user.lastName,
            outreach: props.user.outreach,
            phoneNum: props.user.phoneNum,
            signature: props.user.signature,
            tasks: props.user.tasks,
            username: props.user.username,
            workHistory: props.user.workHistory,
            _v: props.user._v,
            opportunities: newOpportunites
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/postVolunteer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateVolunteer)
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });
    }

    return (
        <body id="logHoursPage">
            <h1 id="LHPageTitle">BOARD MEMBER LOG HOURS</h1>
            <Form >
                <label for="startDateTime">Start Date and Time:</label><br />
                <input type="datetime-local" id="startDate" name="startDateTime" onChange={e => setStartDT(e.target.value)} /><br /><br />
                <label for="endDateTime">End Date and Time:</label><br />
                <input type="datetime-local" id="endDate" name="endDateTime" onChange={e => setEndDT(e.target.value)} /><br /><br />
                <Form.Group>
                    <Form.Label>Task (i.e. "Board meeting")</Form.Label>
                    <Form.Control as="textarea" rows={1} onChange={e => setTasks(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
        </body>
    );
}

export default BMLogHoursPage;

