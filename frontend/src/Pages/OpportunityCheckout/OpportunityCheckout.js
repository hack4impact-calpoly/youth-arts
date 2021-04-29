import "./OpportunityCheckout.css"
import NavBar from "../../Components/NavBar/NavBar";
import React from "react";
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';

class OpportunityCheckout extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cart: props.cart,
            deleteFromCart: props.deleteFromCart
        };
    }
   
    render()
    {    return (
            <body>
                <h1 className="taskHeader" >My Tasks</h1>
               {this.state.cart.map(task =>
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
                              <button id="cartButtonStyle" onClick={() => this.state.deleteFromCart(task)}>Delete Task</button>
                          </div>
                      </div>
                      </div>
                    ) 
                }
                )}
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