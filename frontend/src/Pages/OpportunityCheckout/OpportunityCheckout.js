import "./OpportunityCheckout.css"
import React from "react";
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';

class OpportunityCheckout extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            user: props.user,
            cart: props.cart,
            deleteFromCart: props.deleteFromCart,
            selectedTimes: Array((props.cart).length + 1).fill([]),
            selectedTasks: [],
            //selectedTimes: [],
            rerender: false

        };
        
        this.handleDateCheckBox = this.handleDateCheckBox.bind(this);
  
    }

    postTask = async (roleName, description, start, end, oppId, volId) => {

        const newOpp = {
            task: roleName,
            start: start,
            end: end,
            description: description,
            donated: [],
            oppId: oppId,
            volId: volId
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/api/VolunteerTask/`;
        console.log(url);
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOpp)
        });
        
    }

    handleDateCheckBox(e, task) {
        const newSelection = e.target.value;
        let newSelectionArray;
        console.log(this.state.selectedTimes);
        console.log(task);
        console.log(newSelection);

        if (this.state.selectedTimes[task].indexOf(newSelection) !== -1) {
          newSelectionArray = this.state.selectedTimes[task].filter(
            s => s !== newSelection
          );
        } else {
        //   newSelectionArray = [...this.state.selectedTimes[task], newSelection];
          newSelectionArray = [...this.state.selectedTimes];
          newSelectionArray[task] = newSelection;
        }
        this.setState( {selectedTimes: newSelectionArray });
      }
   
    render()
    {    
        return (
            <body>
                <div id="calHeader">
                    <h1 className="calTitle">TASK CART</h1>
                </div>
               {this.state.cart ? this.state.cart.map((task, index) =>
                {
                    
                    return(
                        
                        <div className="cartContainer">
                            {this.state.selectedTasks.push(task)}
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
                                          return(
                                             
                                              <ul id="TimeList">
                                                <li>{dateFormat(start, " mmmm dS, yyyy ")} @
                                                    {dateFormat(start, " hh:MM TT", true)}
                                                    --
                                                    {dateFormat(task.end[i], "hh:MM TT", true)}
                                                    <input
                                                            className="form-checkbox"
                                                            onChange={(e) => this.handleDateCheckBox(e, index)}
                                                            value={task.end[i]}
                                                            // checked= { ((this.state.selectedTimes)[index]).indexOf(end) != -1 }
                                                            type="checkbox" />
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
                    <input type="text" name="First Name" placeholder="Enter Name of Your Business"/>
                    </div>
                </div>
            {console.log(this.state.cart)}
            <div className="confirmCheckout" id="buttonContainer">
            <Link to="/registrationConfirmation" id="buttonStyles" 
            onClick={ () => {this.state.cart.map( task =>
                {
                    return(
                        <div>
                            {this.postTask(task.roleName, task.description, task.start, task.end, task.oppId, task.volId)}
                        </div>
                    )
                }
                )}}>Confirm Checkout</Link>
            </div>
            </body>)
    }
}

export default OpportunityCheckout;