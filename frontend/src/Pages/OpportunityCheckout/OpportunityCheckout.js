import "./OpportunityCheckout.css"
import React from "react";
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';
import Moment from "moment";
import tz from "moment-timezone";

class OpportunityCheckout extends React.Component{


    constructor(props) {
        super(props);
        
        this.state = {
            user: props.user,
            cart: props.cart,
            deleteFromCart: props.deleteFromCart,
            emptyCart: props.emptyCart,
            rerender: false,
            business: ""
        };
        this.handleBusiness = this.handleBusiness.bind(this);
        this.handleDateCheckBox = this.handleDateCheckBox.bind(this);
    }
    

    postTask = async (roleName, description, start, end, oppId, volId, donated, business) => {
        console.log(start);
        console.log(end);

        const newOpp = {
            task: roleName,
            start: start,
            end: end,
            description: description,
            donated: donated,
            oppId: oppId,
            volId: volId,
            business: business
        }
        if (start !== null && start !== undefined && start.length)
        {
            console.log(start);
            console.log(start.length);
            const url = `${process.env.REACT_APP_SERVER_URL}/api/VolunteerTask/`;
            console.log(url);
            console.log(JSON.stringify(newOpp));
            fetch(url, {
                method: 'POST',
                // mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOpp)
            });
            this.state.emptyCart();
        }
        else
        {
            console.log("no start");
            console.log(start);
            console.log(end);

        }
    }

    handleBusiness(e) {
        let value = e.target.value;
        this.setState( {business: value} );
        console.log(this.state.business);
      }

    handleDateCheckBox(e, task, endTime, index) {

        let selectedTimes = document.getElementsByName(`selectedTimes${task.roleName}`)
        let startTimeSelections = task["selectedStart"] 
        let endTimeSelections = task["selectedEnd"] 
        

        selectedTimes.forEach(item => 
            
            {

                let includedStart = startTimeSelections.includes(item.value)

                if(item.checked){
                    if(!includedStart)
                    {
                        startTimeSelections.push(item.value)
                        endTimeSelections.push(endTime)
                    }
                }
                else
                { 
                    if(includedStart){
                        startTimeSelections = startTimeSelections.filter(
                           function(el){
                               return el !== item.value
                           }
                        );

                        endTimeSelections = endTimeSelections.filter(
                            function(el){
                                return el !== endTime
                            }
                         );
                    }
                }
            })
        
        task["selectedStart"] = startTimeSelections;
        task["selectedEnd"] = endTimeSelections;
 
      }


   
    render()
    {    
        return (
            <body>
                <h1 className="taskHeader" >My Tasks</h1>
                {this.state.cart ? this.state.cart.map((task) =>
                {
                    task["selectedStart"] = []
                    task["selectedEnd"] = []
                    {console.log(task)}
                }) : this.state}


                <div id="calHeader">
                    <h1 className="calTitle">TASK CART</h1>
                </div>
               {this.state.cart ? this.state.cart.map((task, index) =>
                {
                    return(
                        <div className="cartContainer">                         
                        <p className="selectHeader">Select Times:</p>
                        <div id="taskCard">
                          <div className="roleNameAndTime">
                              <p id="roleHeader">
                              Role:
                              </p>
                              <div id="roleName">
                              {task.roleName}
                              </div>
                          </div>
                          <div id="roleHeader">
                            Check One or More Times Below:
                          </div>
                          <div className="roleNameAndTime">
                              <p id="roleHeader">
                                  Times:
                              </p>
                              <div id="times">
                                  {task.start.map((start, i )=>
                                      {
                                          let times = [];
                                          times.push(start);
                                          times.push(task.end[i]);
                                          return(
                                             
                                              <ul id="TimeList">
                                                <li>{dateFormat(start, " mmmm dS, yyyy ", true)} @
                                                    {dateFormat(start, " hh:MM TT", true)}
                                                    --
                                                    {dateFormat(task.end[i], "hh:MM TT")}
                                                    {console.log(task.end[i])}
                                                    <input
                                                            className="form-checkbox"
                                                            onChange={(e) => this.handleDateCheckBox(e, task, task.end[i], index)}
                                                            value={start}
                                                            type="checkbox"
                                                            name={`selectedTimes${task.roleName}`}/>
                                                </li>
                                                <br/>
                                              </ul>
                                          );
                                      })}
                                  </div>
                          </div>
                          <br/>
                          <div id="roleDesc">
                          Description:
                          </div>
                          <div id="roleDescText">
                              {task.description}
                          </div>
                          <div id="additionalReq">
                              Additional Requirements:
                          </div>
                          <div id="additionalReqText">
                              {task.additionalInfo.map(item =>
                                  {
                                      return(
                                      <div>
                                          {item}
                                      </div>);
                                  }
                              )}
                              <button id="cartButtonStyle" onClick={() => {this.state.deleteFromCart(task); this.setState({rerender: !this.state.rerender})}}>Delete Task</button>
                          </div>
                      </div>
                      </div>
                      
                    ) 
                }
                ) : this.state }
                <div className="businessInput">
                    <div className="inputStyles">
                    <label htmlFor="First Name">My Business (optional)</label>
                    <input value={this.state.business} onChange={this.handleBusiness} type="text" name="First Name" placeholder="Enter Name of Your Business"/>
                    </div>
                </div>
            <div className="confirmCheckout" id="buttonContainer">
            
            <Link to="/registrationConfirmation" id="buttonStyles" 
            onClick={ () => {this.state.cart.map( (task, i) =>
                {
                    return(
                        <div>
                            {this.postTask(task.roleName, task.description, task.selectedStart, task.selectedEnd, task.oppId, task.volId, task.donated, this.state.business)}
                        </div>
                    )
                }
                )}}>Confirm Checkout</Link>
            </div>
            </body>)
    }
}

export default OpportunityCheckout;