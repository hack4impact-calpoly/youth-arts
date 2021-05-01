import "./OpportunityCheckout.css"
import NavBar from "../../Components/NavBar/NavBar";
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
            rerender: false

        };
        
        this.handleDateCheckBox = this.handleDateCheckBox.bind(this);
  
    }

    handleDateCheckBox(e, task) {
        const newSelection = e.target.value;
        let newSelectionArray;
        console.log(this.state.selectedTimes);
        console.log(task);
        console.log(e.target.value);
    
        if (this.state.selectedTimes[task].indexOf(newSelection) != -1) {
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
                <h1 className="taskHeader" >My Tasks</h1>
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
                          <div className="roleNameAndTime">
                              <p id="roleHeader">
                                  Start:
                              </p>
                              <div id="times">
                                  {task.start.map(start =>
                                      {
                                          return(
                                             
                                              <ul id="TimeList">
                                                <li>{dateFormat(start, " mmmm dS, yyyy ")} @
                                                  {dateFormat(start, " hh:mm")}</li>
                                                  <br/>
                                              </ul>
                                          );
                                      })}
                                  </div>
                                  <p id="roleHeader">
                                      End:
                                  </p>

                                  <div id="times">
                                      {task.end.map(end =>
                                          {
                                              return(
                                                  <ul id="TimeList">
                                                      <li>{dateFormat(end, " mmmm dS, yyyy ")} @
                                                          {dateFormat(end, " hh:mm")}
                                                          <input
                                                            className="form-checkbox"
                                                            onChange={(e) => this.handleDateCheckBox(e, index)}
                                                            value={end}
                                                            // checked= { ((this.state.selectedTimes)[index]).indexOf(end) != -1 }
                                                            type="checkbox" />
                                                      </li>
                                                      <br/>
                                                  </ul>
                                              );})}
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
            <div id="buttonContainer">
            <Link to="/registrationConfirmation" id="buttonStyles">Confirm Checkout</Link>
            </div>
            </body>)
    }
}

export default OpportunityCheckout;