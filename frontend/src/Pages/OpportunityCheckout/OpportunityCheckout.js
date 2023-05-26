import "./OpportunityCheckout.css";
import React from "react";
import dateFormat from "dateformat";
import { withRouter } from "react-router";

class OpportunityCheckout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.user,
            cart: props.cart,
            deleteFromCart: props.deleteFromCart,
            emptyCart: props.emptyCart,
            rerender: false,
            business: "",
        };
        this.handleBusiness = this.handleBusiness.bind(this);
        this.handleDateCheckBox = this.handleDateCheckBox.bind(this);
    }
    navigateTo = () => {
        let url = "/registrationConfirmation";
        this.props.history.push({
            pathname: url,
        });
    };

    postTask = async (
        roleName,
        description,
        start,
        end,
        oppId,
        volId,
        donated,
        business
    ) => {
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
            business: business,
        };
        if (newOpp.task === "General Committee Member") {
            newOpp.start = [new Date()];
            newOpp.end = [new Date()];
        }

        if (
            newOpp.start !== null &&
            newOpp.start !== undefined &&
            newOpp.start.length
        ) {
            console.log(newOpp.start);
            console.log(newOpp.start.length);
            const url = `${process.env.REACT_APP_SERVER_URL}/api/volunteer/VolunteerTask/`;
            console.log(url);
            console.log(JSON.stringify(newOpp));
            fetch(url, {
                method: "POST",
                // mode: 'cors',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOpp),
            });
            this.state.emptyCart();
        } else {
            console.log("no start");
            console.log(newOpp.start);
            console.log(newOpp.end);
        }
    };

    handleBusiness(e) {
        let value = e.target.value;
        this.setState({ business: value });
        console.log(this.state.business);
    }

    handleDateCheckBox(e, task, endTime, index) {
        let selectedTimes = document.getElementsByName(
            `selectedTimes${task._id}`
        );
        let startTimeSelections = task.selectedStart;
        let endTimeSelections = task.selectedEnd;
        console.log("selectedTimes", selectedTimes);
        console.log("cart", this.state.cart);
        console.log("task", task);

        selectedTimes.forEach((item) => {
            let includedStart = startTimeSelections.includes(item.value);
            console.log("includedStart", includedStart);

            if (item.checked) {
                if (!includedStart) {
                    startTimeSelections.push(item.value);
                    endTimeSelections.push(endTime);
                }
            } else {
                if (includedStart) {
                    startTimeSelections = startTimeSelections.filter(function (
                        el
                    ) {
                        return el !== item.value;
                    });

                    endTimeSelections = endTimeSelections.filter(function (el) {
                        return el !== endTime;
                    });
                }
            }
        });

        task.selectedStart = startTimeSelections;
        task.selectedEnd = endTimeSelections;
        console.log("startTimeSelections", startTimeSelections);
        console.log("endTimeSelections", endTimeSelections);
    }

    handleAdditionalNotesChange(e, task) {
        const updatedTask = { ...task, additionalNotes: e.target.value };
        const updatedCart = this.state.cart.map((t) => (t === task ? updatedTask : t));
        this.setState({ cart: updatedCart });
    }

    render() {
        return (
            <body>
                {this.state.cart
                    ? this.state.cart.map((task) => {
                          if (!task["selectedStart"]) {
                              task["selectedStart"] = [];
                              task["selectedEnd"] = [];
                              console.log(task);
                          }
                      })
                    : null}
                <div id="calHeader">
                    <h1 className="calTitle">MY CART</h1>
                </div>
                {this.state.cart
                    ? this.state.cart.map((task, index) => {
                          return (
                              <div className="cartContainer">
                                  <br></br>
                                  <p className="selectHeader">Select Times:</p>
                                  <div id="taskCard">
                                      <div className="roleNameAndTime">
                                          <p id="roleHeader">Role:</p>
                                          <div id="roleName">
                                              {task.roleName}
                                          </div>
                                      </div>
                                      <div id="roleHeadertimes">
                                          Check One or More Times Below:
                                      </div>
                                      <div className="roleNameAndTime">
                                          <p id="roleHeader">Times:</p>
                                          <div id="times">
                                              {task.start.map((start, i) => {
                                                  let times = [];
                                                  times.push(start);
                                                  times.push(task.end[i]);
                                                  return (
                                                      <ul id="TimeList">
                                                          <li>
                                                              {dateFormat(
                                                                  start,
                                                                  " mmmm dS, yyyy "
                                                              )}{" "}
                                                              @
                                                              {dateFormat(
                                                                  start,
                                                                  " hh:MM TT"
                                                              )}
                                                              --
                                                              {dateFormat(
                                                                  task.end[i],
                                                                  "hh:MM TT"
                                                              )}
                                                              <input
                                                                  className="form-checkbox"
                                                                  onChange={(
                                                                      e
                                                                  ) =>
                                                                      this.handleDateCheckBox(
                                                                          e,
                                                                          task,
                                                                          task
                                                                              .end[
                                                                              i
                                                                          ],
                                                                          index
                                                                      )
                                                                  }
                                                                  value={start}
                                                                  type="checkbox"
                                                                  name={`selectedTimes${task._id}`}
                                                              />
                                                          </li>
                                                          <br />
                                                      </ul>
                                                  );
                                              })}
                                          </div>
                                      </div>
                                      <br />
                                      <div id="roleDesc">Description:</div>
                                      <div id="roleDescText">
                                          {task.description}
                                      </div>
                                      <div id="additionalNotes">
                                        <div id="additionalNotesHeader">Additional Notes:</div>
                                        <textarea
                                            className="additionalNotesBox"
                                            onChange={(e) =>
                                                this.handleAdditionalNotesChange(e, task)
                                            }
                                            value={task.additionalNotes || ""}
                                        />
                                        </div>
                                      <div id="additionalReq">
                                          Additional Requirements:
                                      </div>
                                      <div id="additionalReqText">
                                          {task.additionalInfo.map((item) => {
                                              return <div>{item}</div>;
                                          })}
                                          <button
                                              id="cartButtonStyle"
                                              onClick={() => {
                                                  this.state.deleteFromCart(
                                                      task
                                                  );
                                                  this.setState({
                                                      rerender:
                                                          !this.state.rerender,
                                                  });
                                              }}
                                          >
                                              Delete Task
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : this.state}
                {this.state.cart.length ? (
                    <div>
                        <div className="businessInput">
                            <div className="inputStyles">
                                <label htmlFor="First Name">
                                    My Business (optional)
                                </label>
                                <input
                                    value={this.state.business}
                                    onChange={this.handleBusiness}
                                    type="text"
                                    name="First Name"
                                    placeholder="Enter Name of Your Business"
                                />
                            </div>
                        </div>
                        <div className="confirmCheckout" id="buttonContainer">
                            {/* <Link to="/registrationConfirmation" id="buttonStyles"  */}
                            <button
                                id="buttonStyles"
                                onClick={() => {
                                    console.log(this.state.cart);
                                    this.state.cart.map((task, i) => {
                                        this.postTask(
                                            task.roleName,
                                            task.description,
                                            task.selectedStart,
                                            task.selectedEnd,
                                            task.oppId,
                                            task.volId,
                                            task.donated,
                                            this.state.business
                                        );
                                        // return(
                                        //     <div>
                                        //         {this.postTask(task.roleName, task.description, task.selectedStart, task.selectedEnd, task.oppId, task.volId, task.donated, this.state.business)}
                                        //     </div>
                                        // )
                                    });
                                    this.navigateTo();
                                }}
                            >
                                Confirm Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div id="taskCard">
                        <br></br>
                        <p className="emptyCartHeader">Cart is Empty</p>
                    </div>
                )}
            </body>
        );
    }
}

export default withRouter(OpportunityCheckout);
