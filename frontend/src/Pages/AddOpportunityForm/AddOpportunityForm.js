
import './AddOpportunityForm.css';
import Header from "../../Components/Header/Header";
import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import SubmitButton from '../../Components/SubmitButton/SubmitButton'
import ImageUploadMulti from '../../Components/ImageUpload/ImageUploadMulti'
import { withRouter } from "react-router";
import classroom from '../../Images/classroom.png'
import event from '../../Images/event.png'
import fundraiser from '../../Images/fundraiser.png'
import maintenance from '../../Images/maintenance.png'
import officeAdmin from '../../Images/office-admin.png'
import performance from '../../Images/performance.png'
import moment from "moment";
import { useHistory } from "react-router-dom";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function AddOpportunityForm(props) {

  const[notValid, setnotValid] = useState(false);
  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const opp = {}
    if (opportunity.id == "")
    {
      const opp = {
        title: opportunity.title,
         description: opportunity.description,
         pictures: opportunity.pictures,
         start_event: opportunity.start_event,
         end_event: opportunity.end_event,
         skills: opportunity.skills,
         wishlist: opportunity.wishlist,
         location: opportunity.location,
         requirements: opportunity.requirements,
         tasks: opportunity.tasks,
         additionalInfo: opportunity.additionalInfo,
         volunteers: opportunity.volunteers }

    }
    else{
      const opp = {
        _id: opportunity.id, 
        title: opportunity.title,
         description: opportunity.description,
         pictures: opportunity.pictures,
         start_event: opportunity.start_event,
         end_event: opportunity.end_event,
         skills: opportunity.skills,
         wishlist: opportunity.wishlist,
         location: opportunity.location,
         requirements: opportunity.requirements,
         tasks: opportunity.tasks,
         additionalInfo: opportunity.additionalInfo,
         volunteers: opportunity.volunteers }

    }


    if (opp.title === "" ||
        opp.description === "" ||
        opp.start_event === [""] ||
        opp.end_event === [""] ||
        opp.skills === [""]
        )
    {
      console.log("notvalid")
      setnotValid(true)
    }
    else
    {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateOpportunity/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(opp)
      }).then(response => {
          response.json().then(data => {
          console.log("Successful" + data);
        });
      });
    }
    refresh()

  }

  const icons = [classroom, event, fundraiser, maintenance, officeAdmin, performance];
  const AOIOptions = ["Classroom", "Event", "Fundraiser", "Maintenance", "Office/Admin", "Performance"];

  if (props.location.state !== undefined) 
  {
    props.state.opportunity = props.location.state.opportunity;
  }
  else
  {
    props.state.opportunity = {
      title: "",
       description: "",
       pictures: [],
       start_event: [new Date()],
       end_event: [new Date()],
       skills: [""],
       wishlist: [""],
       location: "",
       requirements: [""],
       additionalInfo: [""],
       volunteers: {},
       id: "",
       tasks: [{start: [new Date()], end: [new Date()], additionalInfo: [""], roleName: "", description: ""}], 
      }
  }
  const[opportunity] = useState(props.state.opportunity);
  
  const [taskList] = useState(opportunity.tasks);

  const [wishList, setWishList] = useState(opportunity.wishlist);
  const [rerender, setRerender] = useState(false);

  const handleAOICheckBox = (e) => {
    const newSelection = e.target.value;
    if (opportunity.skills && opportunity.skills.indexOf(newSelection) !== -1) {
      opportunity.skills.splice(opportunity.skills.indexOf(newSelection), 1);
    } else {
      opportunity.skills.push(newSelection);
    }
    if (opportunity.skills.indexOf("") !== -1)
    {
      opportunity.skills.splice(opportunity.skills.indexOf(""), 1);
    }
    setRerender(!rerender);
  }

  const handleChangeTaskTitle = (e, index) => {
    (opportunity.tasks)[index].roleName = e.target.value;
    setRerender(!rerender);
  }
  const handleChangeTaskDesc = (e, index) => {
    (opportunity.tasks)[index].description = e.target.value;
    setRerender(!rerender);
  }

  const handleAddInputTask = () => {
      const date = new Date();
      const task = {roleName: "", description: "", start: [date.toISOString()], end: [date.toISOString()], additionalInfo: [""]};
      (opportunity.tasks).push(task);
      setRerender(!rerender);
  }
  const handleDeleteInputTask = index  => {
    opportunity.tasks.splice(index, 1);
    setRerender(!rerender);
}

const handleChangeWishList = (e, index) => {
    const list = opportunity;
    (list.wishlist)[index] = e.target.value;
    setWishList(opportunity.wishlist);
    setRerender(!rerender);
  }
const handleAddInputWish = () => {
    opportunity.wishlist.push("");
    setWishList(opportunity.wishlist);
    setRerender(!rerender);
}
const handleDeleteInputWish = index  => {
  opportunity.wishlist.splice(index, 1);
  setWishList(opportunity.wishlist);
  setRerender(!rerender);
}

const handleEndChangeDate = (e, index) => {
  (opportunity.end_event)[index] = e;
  setRerender(!rerender);
}
const handleStartChangeDate = (e, index) => {
  (opportunity.start_event)[index] = e;
  setRerender(!rerender);
}
const handleAddInputDate = (e) => {
  const date = new Date();
  (opportunity.end_event).push(date);
  (opportunity.start_event).push(date);
  setRerender(!rerender);
}
const handleDeleteInputDate = index  => {
  opportunity.start_event.splice(index, 1);
  opportunity.end_event.splice(index, 1);
  setRerender(!rerender);
}

const handleEndChangeDateTask = (e, i, di) => {
  (opportunity.tasks)[i].end[di] = e;
  setRerender(!rerender);
}
const handleStartChangeDateTask = (e, i, di) => {
  (opportunity.tasks)[i].start[di] = e;
  setRerender(!rerender);
}
const handleAddInputDateTask = (i) => {
  const date = new Date();
  (((opportunity.tasks)[i]).end).push(date);
  (((opportunity.tasks)[i]).start).push(date);
  setRerender(!rerender);

}
const handleDeleteInputDateTask = (i, di) => {
  (opportunity.tasks)[i].start.splice(di, 1);
  (opportunity.tasks)[i].end.splice(di, 1);
  setRerender(!rerender);
}
const handleChangeDescription = (e) => {
  opportunity.description = e.target.value;
  setRerender(!rerender);

}
const handleChangeTitle = (e) => {
  opportunity.title = e.target.value;
  setRerender(!rerender);
}
const handleChangeLocation = (e) => {
  opportunity.location = e.target.value;
  setRerender(!rerender);
}

const handleChangeTaskReq = (e, i, di) => {
  (((opportunity.tasks)[i]).additionalInfo)[di] = e.target.value;
  setRerender(!rerender);
}
const handleAddTaskReq = (i) => {
  (((opportunity.tasks)[i]).additionalInfo).push("");
  setRerender(!rerender);

}
const handleDeleteTaskReq = (i, di) => {
  (opportunity.tasks)[i].additionalInfo.splice(di, 1);
  setRerender(!rerender);
}

const handleChangeOppReq = (e, index) => {
  (opportunity.requirements)[index] = e.target.value;
  setRerender(!rerender);
}
const handleAddOppReq = () => {
  opportunity.requirements.push("");
  setRerender(!rerender);
}
const handleDeleteOppReq = index  => {
opportunity.requirements.splice(index, 1);
setRerender(!rerender);
}

const handleChangeOppInfo = (e, index) => {
  (opportunity.additionalInfo)[index] = e.target.value;
  setRerender(!rerender);
}
const handleAddOppInfo = () => {
  opportunity.additionalInfo.push("");
  setRerender(!rerender);
}
const handleDeleteOppInfo = index  => {
opportunity.additionalInfo.splice(index, 1);
setRerender(!rerender);
}

const refresh = () => {
  history.push(history.location);
  setTimeout(() => history.push(history.goBack()), 10);
  history.goBack();
};

const getFileNames = (files) => {
  for (let i = 0; i < files.length; i++) {
    opportunity.pictures.push('https://pryac.s3-us-west-1.amazonaws.com/' + files[i]);
  }
}

  return (
      <div >
        <Header user={props.user}/>
        <body>
        </body>
        <div className="title">
            <h1>Create or Edit Opportunity</h1>
        </div>
        <div className="formWrapper">
          <form className="OppformStyle">
            <div className="OppformInside">
          <div className="OppinputStyles">
            <label htmlFor="OpportunityTitle">Opportunity Title <span className="red">*</span></label>
                <input className="formInput"
                        onChange={e => handleChangeTitle(e)} type="text" value={(opportunity && opportunity.title) ? opportunity.title : ""} name="OpportunityTitle" placeholder="Enter Opportunity Title Here"/>
                <label htmlFor="OpportunityTitle">Opportunity Date<span className="red">*</span></label>
                {((opportunity && opportunity.start_event) ? opportunity.start_event : [""]).map((date, i) => {
                  let end = (new Date()).toISOString();
                  if (opportunity.end_event) 
                  {
                    end = (opportunity.end_event)[i];
                  }
                  var testDateUtc = moment.utc();
                  var localDate = moment(testDateUtc).local();
                  var s = localDate.format("YYYY-MM-DD HH:mm:ss");
                  return(
                    <div key={i}>
                        <div className="inputDate" >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DateTimePicker
                            className="FormDate"
                            label="Start Date/Time"
                            value={date? date : localDate}
                            onChange={e => handleStartChangeDate(e, i)}
                          />
                          <DateTimePicker
                            className="FormDate"
                            label="End Date/Time"
                            value={end? end : localDate}
                            onChange={e => handleEndChangeDate(e, i)}
                          />
                        </MuiPickersUtilsProvider>
                            {(opportunity.start_event).length !== 1 &&
                                <input id="deleteItemDate" type="button" value="X" onClick={() => handleDeleteInputDate(i)}/>
                            }
                        </div>
                        {
                        (opportunity.start_event).length - 1 === i && 
                           <input id="addItemDate" type="button" 
                           value="Add Date" onClick={e => handleAddInputDate(e)}/>
                        }
                    </div>
                  )
              })}
              <label htmlFor="OpportunityLocation">Opportunity Location</label>
                <input onChange={e => handleChangeLocation(e)} type="text" value={(opportunity && opportunity.location) ? opportunity.location : ""} name="OpportunityLocation" placeholder="Enter Opportunity Location Here"/>

                <div className="textStyle">
                  <label htmlFor="OpportunityDescription">Opportunity Description<span className="red">*</span></label>
                  <textarea onChange={e => handleChangeDescription(e)} value={opportunity.description} placeholder="Enter description of opportunity"/>
                  <br/>
                </div>
          </div> 


          <div className="OppinputStyles">
                <label htmlFor="wishlist">Wish List Items</label>
             </div>
               {wishList.map((wish, w) => {
                  return(
                    <div key={w}>
                        <div className="inputButtons" >
                            <input id="taskInput" type="text" name="wishItem" placeholder="Enter Wish List Item"
                            value = {wish}
                            onChange={e => handleChangeWishList(e, w)}/>
                            {wishList.length !== 1 &&
                                <input id="deleteItem" type="button" value="X" onClick={() => handleDeleteInputWish(w)}/>

                            }
                        </div>
                        {wishList.length -1 === w && 
                           <input id="addItem" type="button" value="Add Item" onClick={e => handleAddInputWish(e)}/>
                        }
                    </div>
                  )
              })}

          <div className="OppinputStyles">
            <label htmlFor="tasks">Volunteer Tasks <span className="red">*</span></label>
          </div>
            {taskList.map((task, t) => {
                  return(
                    <div key={t}>
                      <div className="TaskDiv">
                        <div className="inputButtons" >
                          <br></br>
                            <div >
                              <label htmlFor="OpportunityTitle">Task Name <span className="red">*</span></label>
                            </div>
                                <input id="taskInput" type="text" name="task" 
                                  placeholder="Enter Custom Volunteer Task"
                                  value = {task.roleName}
                                  onChange={e => handleChangeTaskTitle(e, t)}/>
                              {taskList.length !== 1 &&
                                <input id="deleteItem" type="button" value="X" onClick={() => handleDeleteInputTask(t)}/>}
                            <div >
                            <br className="headerBreak" />
                              <label htmlFor="OpportunityTitle">Task Description</label>
                            </div>
                            <textarea id="taskInputArea" type="text" name="task" 
                              placeholder="Enter Custom Volunteer Task"
                              value = {task.description}
                              onChange={e => handleChangeTaskDesc(e, t)}/>

                            <div >
                            <br className="headerBreak" />
                              <label htmlFor="OpportunityTitle">Task Date</label>
                            </div>
                            {(task.start ? task.start : [""]).map((taskdate, di) => {
                                let end = (new Date()).toISOString();
                                if (task && task.end) 
                                {
                                  end = (task.end)[di];
                                }
                                return(
                                  <div className="taskDates">
                                  <div key={di}>
                                      <div className="inputDate" >
                                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                          className="FormDate"
                                          label="Start Date/Time"
                                          value={taskdate? taskdate : moment().utc().local()}
                                          onChange={e => handleStartChangeDateTask(e, t, di)}
                                        />
                                        <DateTimePicker
                                          className="FormDate"
                                          label="End Date/Time"
                                          value={end? end : moment().utc().local()}
                                          onChange={e => handleEndChangeDateTask(e, t, di)}
                                        />
                                      </MuiPickersUtilsProvider>
                                          {(task.start).length !== 1 &&
                                              <input id="deleteItemDateTask" type="button" value="X" onClick={() => handleDeleteInputDateTask(t, di)}/>
                                          }
                                      </div>
                                      {
                                      (task.start).length -1 === di && 
                                        <input id="addItemDateTask" type="button" 
                                        value="Add Date" onClick={() => handleAddInputDateTask(t)}/>
                                      }
                                  </div>
                                  </div>
                                )
                            })}
                            <div >
                            <br className="headerBreak" />
                              <label htmlFor="wishlist">Additional Requirements</label>
                              </div>
                                {(task.additionalInfo).map((req, r) => {
                                    return(
                                      <div key={r}>
                                          <div className="inputButtons" id="addReq">
                                              <input id="taskInput" type="text" name="Additional Requirements" placeholder="Enter Additional Requirements"
                                              value = {req}
                                              onChange={e => handleChangeTaskReq(e, t, r)}/>
                                              {(task.additionalInfo && task.additionalInfo.length !== 1) &&
                                                  <input id="deleteItem" type="button" value="X" onClick={() => handleDeleteTaskReq(t, r)}/>
                                              }
                                          </div>
                                          {(task.additionalInfo.length -1 === r) && 
                                            <input id="addItemReq" type="button" value="Add Item" onClick={e => handleAddTaskReq(t)}/>
                                          }
                                      </div>
                                    )
                                })}

                        </div>
                        </div>
                        {taskList.length -1 === t && 
                           <input id="addItem" type="button" 
                           value="Add Task" onClick={e => handleAddInputTask(e)}/>
                        }
                    </div>
                  )
              })}
              
              
          <div className="textStyle">
                
                <label htmlFor="Skill/Interests">Skills/Interests <span className="red">*</span></label>
                <div className="IconSelect">
                  {AOIOptions.map(option => {
                    return (
                      <label key={option}>
                        <img src={icons[(AOIOptions).indexOf(option)]} width= "auto" height="30" alt=""></img>
                        <input
                          className="form-checkbox"
                          onChange={e => handleAOICheckBox(e)}
                          value={option}
                          checked= {opportunity.skills? opportunity.skills.indexOf(option) !== -1 : false}
                          type="checkbox" /> {option}
                      </label>
                    );
                  })}
                </div>
                <br/>
          </div>

          <div className="taskLabel">
            <label htmlFor="wishlist">Requirements</label>
            </div>
              {(opportunity.requirements).map((req, r) => {
                  return(
                    <div key={r}>
                        <div className="inputButtons" >
                            <input className="formInput" id="taskInput" type="text" name="Additional Requirements" placeholder="Enter Additional Requirements"
                            value = {req}
                            onChange={e => handleChangeOppReq(e, r)}/>
                            {(opportunity.requirements && opportunity.requirements.length !== 1) &&
                                <input className="formInput" id="deleteItem" type="button" value="X" onClick={() => handleDeleteOppReq(r)}/>

                            }
                        </div>
                        {(opportunity.requirements.length -1 === r) && 
                          <input id="addItem" type="button" value="Add Requirement" onClick={e => handleAddOppReq()}/>
                        }
                    </div>
                  )
              })}

          <div className="taskLabel">
            <label htmlFor="wishlist">Additional Information</label>
            </div>
              {(opportunity.additionalInfo).map((req, r) => {
                  return(
                    <div key={r}>
                        <div className="inputButtons" >
                            <input id="taskInput" type="text" name="Additional Requirements" placeholder="Enter Additional Requirements"
                            value = {req}
                            onChange={e => handleChangeOppInfo(e, r)}/>
                            {(opportunity.additionalInfo && opportunity.additionalInfo.length !== 1) &&
                                <input id="deleteItem" type="button" value="X" onClick={() => handleDeleteOppInfo(r)}/>

                            }
                        </div>
                        {(opportunity.additionalInfo.length -1 === r) && 
                          <input id="addItem" type="button" value="Add Info" onClick={e => handleAddOppInfo()}/>
                        }
                    </div>
                  )
              })}

          <div className="addImages">
             <label >Add Images</label>
          </div>
          <br/>
          <ImageUploadMulti getFiles={getFileNames.bind(this)}/>
           <br/>       
               {notValid && <label className="errorMessage">* Please Complete Required Fields</label>}  
                <div className="FormbuttonStyle">
                  <SubmitButton onClick={handleFormSubmit} buttonText="Submit"/>
                </div>
            </div>
          </form>
        </div>
        <div className="footer">
            <Footer/>
        </div>
      </div>
  );
}

export default withRouter(AddOpportunityForm);
