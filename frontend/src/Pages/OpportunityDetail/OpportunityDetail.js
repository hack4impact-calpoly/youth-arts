/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-param-reassign */

import React from "react";
import "./OpportunityDetail.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import DateMomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Modal, Button } from "react-bootstrap";
import ImageCarousel from "./ImageCarousel/ImageCarousel";
import SubmitButton from "../../Components/SubmitButton/SubmitButton";
import SignInWithGoogleButton from "../../Components/SignInWithGoogleButton/GoogleButton";

class OpportunityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      updateCart: props.updateCart,
      start_event: [],
      end_event: [],
      tasks: [],
      requirements: [],
      additionalInfo: [],
      wishlist: [],
      volunteers: [],
      donatedItems: [],
      showDonateModal: false,
      showUserDonateModal: false,
      showSignInModal: false,
      showCartModal: false,
      volunteerList: [],
      updateTime: false,
      newVolunteer: "",
      selectedTask: ""
    };

    this.handleDonateCheckBox = this.handleDonateCheckBox.bind(this);
    this.postStartTime = this.postStartTime.bind(this);
    this.postEndTime = this.postEndTime.bind(this);
    this.updateCartWithOpportunity = this.updateCartWithOpportunity.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    this.postDonations = this.postDonations.bind(this);
  }

  async deleteVolunteerTask(oppId, volId, taskId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    const url = `${process.env.REACT_APP_SERVER_URL}/api/volunteer/task`;
    if (confirmed) {
      // Delete task from volunteer
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ oppId, volId, taskId })
      })
        .then((res) => res.json())
        .then((opportunity) => {
          console.log("Volunteer deleted successfully");
          this.setState({ volunteers: opportunity.volunteers });
        })
        .catch((error) => {
          console.error("Error deleting volunteer:", error);
        });
    }
  }

  updateCartWithOpportunity(task) {
    task["oppId"] = this.state._id;
    task["volId"] = this.state.user._id;
    this.state.updateCart(task);
  }

  async componentDidMount() {
    let id = window.location.pathname;
    id = id.replace("/opportunityDetail/", "");
    const url =
      `${process.env.REACT_APP_SERVER_URL}/api/opportunity/detail/` + id;
    await fetch(url)
      .then((res) => res.json())
      .then((opportunity) => {
        this.setState({ ...opportunity });
      });

    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteer/`)
      .then((res) => res.json())
      .then((vols) => {
        this.setState({ volunteerList: vols });
      });
  }

  handleDonateCheckBox() {
    const items = document.getElementsByName("donatedItems");
    let newSelectionArray = this.state.donatedItems;

    items.forEach((item) => {
      const included = newSelectionArray.includes(item.value);

      if (item.checked) {
        if (!included) {
          newSelectionArray.push(item.value);
        }
      } else if (included) {
        newSelectionArray = newSelectionArray.filter((el) => el !== item.value);
      }
    });

    this.setState({ donatedItems: newSelectionArray });
  }

  async updateComponent() {
    let id = window.location.pathname;
    id = id.replace("/opportunityDetail/", "");
    const url =
      `${process.env.REACT_APP_SERVER_URL}/api/opportunity/detail/` + id;
    await fetch(url)
      .then((res) => res.json())
      .then((opportunity) => {
        this.setState({ ...opportunity });
      });

    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteer/`)
      .then((res) => res.json())
      .then((vols) => {
        this.setState({ volunteerList: vols });
      });
    console.log(this.state.volunteerList);
  }

  postDonations = async () => {
    const newOpp = {
      task: "Donated",
      start: [],
      end: [],
      donated: this.state.donatedItems,
      oppId: this.state._id,
      volId: this.state.user._id
    };

    const url = `${process.env.REACT_APP_SERVER_URL}/api/donation/`;

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOpp)
    });
    this.updateComponent();
    this.props.fetchAllVolunteers();
    this.props.fetchAllOpportunities();
  };

  async postTask(
    roleName,
    description,
    start,
    end,
    oppId,
    volId,
    donated,
    business
  ) {
    const newOpp = {
      task: roleName,
      start,
      end,
      description,
      donated,
      oppId,
      volId,
      business
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
      const url = `${process.env.REACT_APP_SERVER_URL}/api/volunteer/VolunteerTask/`;
      await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newOpp)
      });
    } else {
      console.log("no start");
      console.log(newOpp.start);
      console.log(newOpp.end);
    }
    this.updateComponent();
  }

  changeDonateModal = () => {
    this.setState({ showDonateModal: !this.state.showDonateModal });
  };

  changeUserDonateModal = () => {
    this.setState({ showUserDonateModal: !this.state.showUserDonateModal });
  };

  changeSignInModal = () => {
    this.setState({ showSignInModal: !this.state.showSignInModal });
  };

  changeCartModal = () => {
    this.setState({ showCartModal: !this.state.showCartModal });
  };

  navigateTo = () => {
    const url = `/addOpportunity/${this.state._id}`;

    this.props.history.push({
      pathname: url,
      state: {
        opportunity: {
          user: this.state.user,
          id: this.state._id,
          title: this.state.title,
          description: this.state.description,
          pictures: this.state.pictures,
          start_event: this.state.start_event,
          end_event: this.state.end_event,
          skills: this.state.skills,
          wishlist: this.state.wishlist,
          location: this.state.location,
          requirements: this.state.requirements,
          tasks: this.state.tasks,
          additionalInfo: this.state.additionalInfo,
          volunteers: this.state.volunteers
        }
      }
    });
  };

  sortTaskArray(a, b) {
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  }

  postStartTime(date, volId, taskIndex, i) {
    console.log(date);

    const startTimeBody = {
      id: this.state._id,
      date,
      volId,
      taskIndex,
      timeIndex: i
    };

    const url = `${process.env.REACT_APP_SERVER_URL}/api/opportunity/startTime/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(startTimeBody)
    });
    this.props.fetchAllVolunteers();
    this.props.fetchAllOpportunities();
  }

  postEndTime(date, volId, taskIndex, i) {
    const endTimeBody = {
      id: this.state._id,
      date,
      volId,
      taskIndex,
      timeIndex: i
    };

    const url = `${process.env.REACT_APP_SERVER_URL}/api/opportunity/endTime`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(endTimeBody)
    });
    this.props.fetchAllVolunteers();
    this.props.fetchAllOpportunities();
  }

  updateCartWithOpportunity(task) {
    task.oppId = this.state._id;
    task.volId = this.state.user._id;
    this.state.updateCart(task);
  }

  render() {
    return (
      <div
        className={
          this.state.showDonateModal ||
          this.state.showSignInModal ||
          this.state.showUserDonateModal
            ? "darkBackground"
            : ""
        }
      >
        {this.state.user && this.state.user.admin ? (
          <nav className="adminEdit">
            <SubmitButton
              buttonText="Edit Opportunity"
              onClick={this.navigateTo}
            >
              Edit Opportunity--{">"}
            </SubmitButton>
          </nav>
        ) : null}
        <div className="TitleImageContainer">
          <div className="opportunityTitle">
            {this.state.title}
            <div className="imageCarousel">
              <ImageCarousel slides={this.state.pictures} />
            </div>
          </div>
        </div>
        <div className="outerContainer">
          <div id="descriptionHeader">DESCRIPTION: </div>
          <div className="DescriptionAndDateContainer">
            <p className="descriptionText">{this.state.description}</p>
            <p id="dateAndTime">
              WHEN:
              <p className="dateText">
                {this.state.start_event.map((start) => (
                  <div>
                    {dateFormat(start, " mmmm dS, yyyy ")} @
                    {dateFormat(start, "h:MM TT")}
                  </div>
                ))}
                <br />
                To:
                <br />
                <br />
                {this.state.end_event.map((end) => (
                  <div>
                    {dateFormat(end, " mmmm dS, yyyy ")} @
                    {dateFormat(end, " h:MM TT")}
                  </div>
                ))}
              </p>
            </p>
            <p id="location">
              WHERE:
              <p className="dateText">{this.state.location}</p>
            </p>
          </div>
          <div className="row2OuterContainer">
            <div className="row2OuterContainer">
              <div id="row2InnerContainer">
                <div id="taskHeader">
                  <p>TASKS:</p>
                </div>
                <p id="requirementsHeader">REQUIREMENTS</p>
                <p id="itemsHeader">ITEMS</p>
              </div>
            </div>
          </div>
          <div className="bodyContainer">
            <div
              id={
                this.state.showDonateModal ||
                this.state.showSignInModal ||
                this.state.showUserDonateModal
                  ? "darkTaskBody"
                  : "taskBody"
              }
            >
              <div>
                {this.state.tasks.map((task) => (
                  <div
                    id={
                      this.state.showDonateModal ||
                      this.state.showSignInModal ||
                      this.state.showUserDonateModal
                        ? "darkTaskCard"
                        : "taskCard"
                    }
                  >
                    <div className="roleNameAndTime">
                      <p id="roleHeader">Role:</p>
                      <div id="roleName">{task.roleName}</div>
                    </div>
                    <div className="roleNameAndTime">
                      <p id="roleHeader">Start:</p>
                      <div id="times">
                        {task.start.map((start) => (
                          <ul id="TimeList">
                            <li>
                              {dateFormat(start, " mmmm dS, yyyy ")} @
                              {dateFormat(start, " hh:MM TT")}
                            </li>
                          </ul>
                        ))}
                      </div>
                      <p id="roleHeader">End:</p>
                      <div id="times">
                        {task.end.map((end) => (
                          <ul id="TimeList">
                            <li>
                              {dateFormat(end, " mmmm dS, yyyy ")} @
                              {dateFormat(end, " hh:MM TT")}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div id="roleDesc">Description:</div>
                    <div id="roleDescText">{task.description}</div>
                    <div id="additionalReq">Additional Requirements:</div>
                    <div id="additionalReqText">
                      {task.additionalInfo.map((item) => (
                        <div>{item}</div>
                      ))}
                      {console.log(task)}
                      <button
                        type="button"
                        id="cartButtonStyle"
                        onClick={
                          this.state.user
                            ? () => {
                                this.updateCartWithOpportunity(task);
                                this.changeCartModal(task);
                              }
                            : this.changeSignInModal
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reqAndItems">
              <div id="reqBody">
                <ul className="listStyle">
                  {this.state.requirements.map((req) => {
                    if (req === "") {
                      return (
                        <div>
                          <li>None</li>
                          <br />
                        </div>
                      );
                    }
                    return (
                      <div>
                        <li>{req}</li>
                        <br />
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div id="itemsBody">
                <ul className="listStyle">
                  {this.state.wishlist.map((item) => {
                    if (item === "") {
                      return (
                        <div>
                          <li>None</li>
                          <br />
                        </div>
                      );
                    }
                    return (
                      <div>
                        <li>{item}</li>
                        <br />
                      </div>
                    );
                  })}
                  <div id="buttonContainer">
                    <button
                      type="button"
                      id="buttonStyles"
                      onClick={
                        !this.state.user
                          ? this.changeDonateModal
                          : this.changeUserDonateModal
                      }
                    >
                      Donate
                    </button>
                  </div>
                </ul>
              </div>
            </div>
            <div className="addInfoContainer">
              <div id="addInfoHeader">ADDITIONAL INFORMATION:</div>
              <p className="addInfoText">
                <ul className="listStyle">
                  {this.state.additionalInfo.map((req) => {
                    if (req === "") {
                      return (
                        <div>
                          <li>None</li>
                          <br />
                        </div>
                      );
                    }
                    return (
                      <div>
                        <li>{req}</li>
                        <br />
                      </div>
                    );
                  })}
                </ul>
              </p>
            </div>
          </div>
        </div>
        {this.state.user && this.state.user.admin ? (
          <div className="tableContainer">
            <div id="volunteerHeader">VOLUNTEERS</div>
            <table className="detailTable">
              <thead>
                <tr>
                  <th>Volunteer</th>
                  <th>Task</th>
                  <th>Start Times</th>
                  <th>End Times</th>
                  <th>Donated Items</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.volunteers
                  ? Object.keys(this.state.volunteers).map((volunteers) => {
                      const vol = this.state.volunteerList.find(
                        (x) => x._id === volunteers
                      );
                      return (
                        <div>
                          {vol &&
                            Object.keys(this.state.volunteers[volunteers]).map(
                              (volunteer) => {
                                const start = "start";
                                const end = "end";
                                const keyValue = Object.entries(
                                  this.state.volunteers[volunteers][volunteer]
                                );
                                const volId = volunteers;
                                const taskIndex = volunteer;

                                keyValue.sort(this.sortTaskArray);
                                return (
                                  <tr>
                                    {vol && (
                                      <td className="detailTD">
                                        {
                                          <div>
                                            {vol.firstName}
                                            <br />
                                            {vol.lastName}
                                            <br />
                                            <a
                                              className="deleteBtn"
                                              onClick={() =>
                                                this.deleteVolunteerTask(
                                                  this.state._id,
                                                  vol._id,
                                                  this.state.volunteers[volId][
                                                    taskIndex
                                                  ]._id
                                                )
                                              }
                                            >
                                              Delete
                                            </a>
                                          </div>
                                        }
                                      </td>
                                    )}
                                    {keyValue.map((volData, v) => {
                                      if (volData[0] === "task") {
                                        return (
                                          <td className="detailTD">
                                            <td>{volData[1]}</td>
                                          </td>
                                        );
                                      }
                                      if (volData[0] === start) {
                                        return (
                                          <td className="detailTD">
                                            <div>
                                              {volData[1].map(
                                                (time, timeindex) => (
                                                  <div>
                                                    <br />
                                                    {dateFormat(
                                                      time,
                                                      " mmmm dS, yyyy "
                                                    )}{" "}
                                                    @
                                                    {dateFormat(
                                                      time,
                                                      " hh:MM TT"
                                                    )}
                                                    <MuiPickersUtilsProvider
                                                      utils={DateFnsUtils}
                                                    >
                                                      <br />
                                                      <label id="checkIn">
                                                        Check In:
                                                      </label>
                                                      <DateTimePicker
                                                        id="startInput"
                                                        utils={DateMomentUtils}
                                                        value={time}
                                                        onChange={(date) => {
                                                          this.postStartTime(
                                                            date,
                                                            volId,
                                                            taskIndex,
                                                            timeindex
                                                          );
                                                          time = date;
                                                          volData[1].time =
                                                            date;
                                                          volData[1][
                                                            timeindex
                                                          ] = date;
                                                          volData[1].time =
                                                            date;
                                                          this.setState({
                                                            updateTime:
                                                              !this.state
                                                                .updateTime
                                                          });
                                                        }}
                                                      />
                                                    </MuiPickersUtilsProvider>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </td>
                                        );
                                      }
                                      if (volData[0] === end) {
                                        return (
                                          <td className="detailTD">
                                            <div>
                                              {volData[1].map(
                                                (time, timeindex) => (
                                                  <div>
                                                    <br />
                                                    {dateFormat(
                                                      time,
                                                      " mmmm dS, yyyy "
                                                    )}{" "}
                                                    @
                                                    {dateFormat(
                                                      time,
                                                      " hh:MM TT"
                                                    )}
                                                    <MuiPickersUtilsProvider
                                                      utils={DateFnsUtils}
                                                    >
                                                      <br />
                                                      <label id="checkIn">
                                                        Check Out:
                                                      </label>
                                                      <DateTimePicker
                                                        id="startInput"
                                                        utils={DateMomentUtils}
                                                        value={time}
                                                        onChange={(date) => {
                                                          this.postEndTime(
                                                            date,
                                                            volId,
                                                            taskIndex,
                                                            timeindex
                                                          );
                                                          time = date;
                                                          volData[1].time =
                                                            date;
                                                          volData[1][
                                                            timeindex
                                                          ] = date;
                                                          volData[1].time =
                                                            date;
                                                          this.setState({
                                                            updateTime:
                                                              !this.state
                                                                .updateTime
                                                          });
                                                        }}
                                                      />
                                                    </MuiPickersUtilsProvider>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </td>
                                        );
                                      }
                                      if (volData[0] === "donated") {
                                        return (
                                          <td className="detailTD">
                                            {volData[1].map((item) => (
                                              <li>{item}</li>
                                            ))}
                                          </td>
                                        );
                                      }
                                    })}
                                    <td className="detailTD">
                                      {keyValue.find(
                                        (data) => data[0] === "notes"
                                      )?.[1] || ""}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                        </div>
                      );
                    })
                  : "No Volunteers Found"}
              </tbody>
            </table>

            <br />

            <div className="volunteerGrid">
              <div id="dropdown">
                <label htmlFor="volunteers">Available Volunteers:</label>
                <select
                  name="volunteers"
                  onChange={(e) =>
                    this.setState({ newVolunteer: e.target.value })
                  }
                >
                  <option value="">Select Option</option>
                  {this.state.volunteerList
                    .filter((volunteer) =>
                      Object.keys(this.state.volunteers).includes(volunteer._id)
                    )
                    .map((volunteer) => (
                      <option value={volunteer._id}>
                        {`${volunteer.firstName} ${volunteer.lastName}`}
                      </option>
                    ))}
                </select>
              </div>

              <div id="dropdown">
                <label htmlFor="selectTask">Available Tasks:</label>
                <select
                  name="selectTask"
                  onChange={(e) =>
                    this.setState({ selectedTask: e.target.value })
                  }
                >
                  <option value="">Select Option</option>
                  {this.state.tasks.map((task) => (
                    <option value={task.roleName}>{`${task.roleName}`}</option>
                  ))}
                </select>
              </div>

              <div id="volunteerButtonContainer">
                <button
                  type="button"
                  id="buttonStyles"
                  onClick={() => {
                    const result = this.state.tasks.filter(
                      (task) => task.roleName === this.state.selectedTask
                    );
                    this.postTask(
                      result[0].roleName,
                      result[0].description,
                      [new Date()],
                      [new Date()],
                      this.state._id,
                      this.state.newVolunteer,
                      this.state.donatedItems,
                      result[0].business
                    );
                  }}
                >
                  Add Volunteer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}

        <Modal
          className="ModalText"
          show={this.state.showCartModal}
          onHide={this.changeCartModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Success! Task has been added</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modalButtons">
            <Link
              to="/opportunityCheckout"
              id="modalButton"
              className="linkPadding"
            >
              Go to Cart
            </Link>
            <Button
              id="modalButton"
              variant="primary"
              onClick={this.changeCartModal}
            >
              Add more tasks
            </Button>
          </Modal.Body>
        </Modal>

        <Modal
          className="ModalText"
          show={this.state.showDonateModal}
          onHide={this.changeDonateModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign In to Donate</Modal.Title>
          </Modal.Header>
          <Modal.Body id="signIn">
            <SignInWithGoogleButton />
          </Modal.Body>
          <Modal.Footer className="donateModalFooter">
            <Button
              id="donateModalButton"
              variant="primary"
              href="https://donorbox.org/youth-arts-donate"
            >
              Donate Money
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          className="ModalText"
          show={this.state.showUserDonateModal}
          onHide={this.changeUserDonateModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Items to Donate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.wishlist.map((item) => {
              if (item === "") {
                /* Hide donate button since there are no items to donate */
                this.showDonateItemButton = false;
                return "No items to donate";
              }
              return (
                <div>
                  <input
                    name="donatedItems"
                    value={item}
                    onChange={this.handleDonateCheckBox}
                    className="form-checkbox"
                    type="checkbox"
                  />
                  &emsp;
                  {item}
                  <br />
                  <br />
                </div>
              );
            })}
          </Modal.Body>
          <Modal.Footer className="donateModalFooter">
            <Button
              id="donateModalButton"
              variant="primary"
              href="https://donorbox.org/youth-arts-donate"
            >
              Donate Money
            </Button>
            {/* <p>or</p> */}
            {this.showDonateItemButton && (
              <Button
                id="modalButton"
                variant="primary"
                onClick={() => {
                  this.postDonations();
                  this.changeUserDonateModal();
                }}
              >
                Confirm Items
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <Modal
          className="ModalText"
          show={this.state.showSignInModal}
          onHide={this.changeSignInModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign In to Add to Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body id="signIn">
            <SignInWithGoogleButton />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(OpportunityDetail);
