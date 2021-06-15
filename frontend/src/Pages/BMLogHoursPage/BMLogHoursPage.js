import "./BMLogHoursPage.css";
import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import dateFormat from 'dateformat';

function BMLogHoursPage(props) {
    //stores inputs from form
    const [startDT, setStartDT] = useState(new Date());
    const [endDT, setEndDT] = useState(new Date());
    const [tasks, setTasks] = useState("");
    const [showLoggedModal, setshowLoggedModal] = useState(false);
    const [boardOpportunity, setboardOpportunity] = useState({});
    const [rerender, setRerender] = useState(false);

    var opportunities;
    var key;
    var firstTime = false;
    var firstBoard = false;
    var firstTimeBoard = false;
    var updateBoard = false;

    if(props.user !== null && !props.user.boardMember && (props.user.opportunities === null || props.user.opportunities === undefined)) {
        opportunities = "false";
    }
    else if (props.user !== null && props.user.boardMember && props.user.opportunities !== null && props.user.opportunities !== undefined) {
        opportunities = props.user.opportunities;
        Object.keys(opportunities).map((item) => {
            console.log(item);
            if (item === '6099c78c001ee300081c1dab')
            {
                console.log(true);
                key = item;
            }
            return null;
        })
        console.log(props.user.opportunities);
        if(key === null || key === undefined) {
            firstTime = true;
            opportunities = [];
        }
        else
        {
            opportunities = props.user.opportunities[key];
            console.log(opportunities);
        }
    }
    else {
        opportunities = [];
        firstTime = true;
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getOpportunity/6099c78c001ee300081c1dab`)
        .then(response => {
            response.json()
            .then(data => {
                setboardOpportunity(data);
            });
        });
    }, []);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getOpportunity/6099c78c001ee300081c1dab`)
        .then(response => {
            response.json()
            .then(data => {
                setboardOpportunity(data);
            });
        });
    }, [updateBoard]);

    function isValidForm() {
        if (startDT === "" || endDT === "" || tasks === "") {
            alert("Incomplete form. Please try again.");
            return false;
        }
        else if (startDT > endDT) {
            alert("Start date is after end date. Please correct and try again.");
            return false;
        }
        return true;
    }

    //push form as element in opportunity array in volunteer schema
    function handleSubmit(e) {
        e.preventDefault();
        console.log(opportunities);
        // make sure opportunties is defined
        if (opportunities === "false") return;
        //check if form is valid
        if (!isValidForm()) return;
        
        //if opportunities alreayd has the task, append start and end d/t to existing array
        var contains = false;
        opportunities.forEach(function(item) {
            if(item.task.toLowerCase() !== "" && item.task.toLowerCase() === tasks.toLowerCase()) {
                item.start.push(startDT);
                item.end.push(endDT);
                contains = true;
                console.log(item.start);
                console.log(item.end);
                console.log(item)
                console.log(typeof item.start[0]);
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
            console.log(newOpp);
            console.log(typeof newOpp.start[0]);
        }
        

        // push new opportunities to database
        var newOpportunites;
        if(!firstTime) {
            newOpportunites = props.user.opportunities;
            newOpportunites[key] = opportunities;
        }
        else {
            newOpportunites = props.user.opportunities;
            newOpportunites['6099c78c001ee300081c1dab'] = opportunities;
            // newOpportunites = {};
            // newOpportunites = {'6099c78c001ee300081c1dab' : opportunities};
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

        let volunteers = boardOpportunity.volunteers;
        Object.keys(volunteers).map((item) => {
            key = item;
            return null;
        })
        volunteers = volunteers[key];
        if(key === null || key === undefined) {
            firstTime = true;
            volunteers = [];
        }

        if ((volunteers == [] || volunteers.length <= 0 || volunteers == undefined || volunteers == null) && volunteers[props.user._id] == null) {
            contains = false;
            volunteers = []
        }
        else 
        {
            volunteers = boardOpportunity.volunteers[props.user._id];
            contains = false;
            volunteers.forEach(function(item) {
                if(item.task.toLowerCase() !== "" && item.task.toLowerCase() === tasks.toLowerCase()) {
                    item.start.push(startDT);
                    item.end.push(endDT);
                    contains = true;
                }
            })
            
        }
        if(!contains) {
            var newVol = {
                task: tasks,
                start: [startDT],
                end: [endDT],
                description: "",
                donated: []
            }
            volunteers.push(newVol);
        }
        // push new opportunities to database
        
        var newVolunteers;
        let id = props.user._id
        if(!firstTime) {
            newVolunteers = boardOpportunity.volunteers;
            newVolunteers[props.user._id] = volunteers;
        }
        else {
            newVolunteers = {};
            newVolunteers[props.user._id] = volunteers;
        }
        boardOpportunity['volunteers'] = newVolunteers;
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateOpportunity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boardOpportunity)
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
                updateBoard = !updateBoard;
            });
        });
        setshowLoggedModal(!showLoggedModal);
    }

    return (
        <body>
            <div id="calHeader">
                    <h1 className="calTitle">BOARD MEMBER LOG HOURS</h1>
            </div>
            <div id="logHoursPage"> 
            <Form >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                    name="startDateTime"
                    label="Start Date/Time"
                    value={startDT? startDT : dateFormat((new Date()), " mmmm dS, yyyy ") }
                    onChange={e => {setStartDT(e);
                                    console.log(e);
                                    setRerender(!rerender);}}
                    />
                    <br></br>
                    <br></br>
                    <DateTimePicker
                    name="endDateTime"
                    label="End Date/Time"
                    value={endDT? endDT : (new Date())}
                    onChange={e => {setEndDT(e);
                                    setRerender(!rerender);}}
                    />
                </MuiPickersUtilsProvider>
                <br></br>
                <Form.Group>
                    <br></br>
                    <Form.Label>Task (i.e. "Board meeting")</Form.Label>
                    <Form.Control as="textarea" rows={1} onChange={e => setTasks(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>

            {showLoggedModal ? <Modal className="ModalText"
                show={showLoggedModal}
                onHide={() => setshowLoggedModal(!showLoggedModal)}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Success! You logged Board Member hours.</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modalButtons">
                <Link to="/" id="modalButton" className="linkPadding">Go to Dashboard</Link>
                <Button id="modalButton" variant="primary"
                        onClick={() => setshowLoggedModal(!showLoggedModal)}>Log more hours</Button>
                </Modal.Body>
            </Modal> : null}
            </div>
        </body>

        

    );
}

export default BMLogHoursPage;

