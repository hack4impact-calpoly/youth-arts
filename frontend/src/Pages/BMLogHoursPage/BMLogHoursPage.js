import "./BMLogHoursPage.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import ObjectID from "bson-objectid";
import Opportunities from "../../Components/Opportunities/Opportunities";

function BMLogHoursPage(props) {
    //stores inputs from form
    const [startDT, setStartDT] = useState("");
    const [endDT, setEndDT] = useState("");
    const [tasks, setTasks] = useState("");

    var opportunities;
    var key;
    var firstTime = false;

    if(props.user !== null && !props.user.boardMember && (props.user.opportunities === null || props.user.opportunities === undefined)) {
        opportunities = "false";
    }
    else if (props.user !== null && props.user.boardMember && props.user.opportunities !== null && props.user.opportunities !== undefined) {
        opportunities = props.user.opportunities;
        Object.keys(opportunities).map((item) => {
            key = item;
            return null;
        })
        opportunities = opportunities[key];
        if(key === null || key === undefined) {
            firstTime = true;
            opportunities = [];
        }
    }
    else {
        opportunities = [];
        firstTime = true;
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
    function handleSubmit(e) {
        e.preventDefault();
        // make sure opportunties is defined
        if (opportunities === "false") return;
        //check if form is valid
        if (!isValidForm()) return;
        
        //if opportunities alreayd has the task, append start and end d/t to existing array
        var contains = false;
        opportunities.forEach(function(item) {
            console.log(item.task.toLowerCase());
            console.log(tasks.toLowerCase());
            console.log(item.task.toLowerCase() === tasks.toLowerCase());
            if(item.task.toLowerCase() !== "" && item.task.toLowerCase() === tasks.toLowerCase()) {
                item.start.push(startDT);
                item.end.push(endDT);
                contains = true;
                console.log(opportunities);
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
        var newOpportunites;
        if(!firstTime) {
            newOpportunites = props.user.opportunities;
            newOpportunites[key] = opportunities;
        }
        else {
            newOpportunites = {};
            newOpportunites = {'60764b69811b98df6f7f58fc' : opportunities};
        }

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

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateVolunteer`, {
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
                <TextField name="startDateTime" type="datetime-local" onChange={e => setStartDT(e.target.value)} /><br /><br />
                <label for="endDateTime">End Date and Time:</label><br />
                <TextField name="endDateTime" type="datetime-local" onChange={e => setEndDT(e.target.value)} /><br /><br />
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

