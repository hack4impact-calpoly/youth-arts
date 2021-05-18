import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import './OpportunityDetail.css'
import ActionButton from "../../Components/ActionButton/ActionButton";
import ImageCarousel from './ImageCarousel/ImageCarousel'
// import { CarouselData } from './ImageCarousel/CarouselData'
import dateFormat from 'dateformat';
import {MdClose} from 'react-icons/md'
import SignInWithGoogleButton from '../../Components/SignInWithGoogleButton/GoogleButton'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateMomentUtils from '@date-io/moment'
import DateFnsUtils from '@date-io/date-fns'
import {KeyboardDateTimePicker} from '@material-ui/pickers';
import {Link} from 'react-router-dom';
//import DateMomentUtils from '@date-io/moment'; 
import SubmitButton from "../../Components/SubmitButton/SubmitButton";
import { withRouter } from "react-router";
import {Modal, Button} from "react-bootstrap";


class OpportunityDetail extends React.Component{

    constructor(props) {
        super(props);
        // const { user } = props;
        this.state = {
            user: props.user,
            cart: props.cart,
            updateCart: props.updateCart,
            start_event: [],
            end_event: [],
            tasks: [],
            requirements: [],
            additionalInfo: [],
            wishlist: [],
            volunteers: [],
            showDonateModal: false,
            showUserDonateModal: false,
            showSignInModal: false,
            showCartModal: false,
            signedIn: true,
            admin: true,
            volunteerList: [],
            updateTime: false
        };
    }

    updateCartWithOpportunity(task){
        task["oppId"] = this.state._id
        task["volId"] = this.state.user._id
        this.state.updateCart(task)
    }
    

    async componentDidMount() {
        let id = window.location.pathname;
        id = id.replace("/opportunityDetail/", "");
        //console.log(id);
        const url = `${process.env.REACT_APP_SERVER_URL}/api/opportunityDetail/` + id;
        await fetch(url)
        .then(res => res.json())
        .then(opportunity => {
            this.setState({...opportunity});
            
        });  

        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/volunteers/`)
        .then(res => res.json())
        .then(vols => {
            this.setState({volunteerList : vols});
        });  
    }

    postDonations(){
        //this.changeDonateModal();
    }

    changeDonateModal = () => {
        this.setState({showDonateModal: !this.state.showDonateModal});
    };

    changeUserDonateModal = () => {
        this.setState({showUserDonateModal: !this.state.showUserDonateModal});
    };

    changeSignInModal = () => {
        this.setState({showSignInModal: !this.state.showSignInModal});
    };

    changeCartModal = (task) => {
        this.setState({showCartModal: !this.state.showCartModal});
    };

    navigateTo = () => {
        let url = '/addOpportunity/' + this.state._id;
       // console.log(this.props);
        //console.log(this.state);
        this.props.history.push({
            pathname: url,
            state: { opportunity: { 
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
                    }}});
    }

    sortTaskArray(a, b) {
        if (a[0] > b[0]) return -1;
        if (a[0] < b[0]) return 1;
        return 0;
    }

    postStartTime(date, volId, taskIndex, i) { 

        this.setState({updateTime: !this.state.updateTime})

        const startTimeBody = {
            id: this.state._id,
            date: date,
            volId: volId,
            taskIndex: taskIndex,
            timeIndex: i
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/api/opportunityStartTime/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(startTimeBody)
        });

    }


    postEndTime(date, volId, taskIndex, i) {

        const endTimeBody = {
            id: this.state._id,
            date: date,
            volId: volId,
            taskIndex: taskIndex,
            timeIndex: i
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/api/opportunityEndTime/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(endTimeBody)
        });
        this.setState({updateTime: !this.state.updateTime})

    }
    
    

  render() {
    return (
        <div className={ this.state.showDonateModal | this.state.showSignInModal | this.state.showUserDonateModal ? "darkBackground" : ""}>
          {this.state.admin && 
                   <nav className="adminEdit">
                        <SubmitButton buttonText="Edit Opportunity" onClick={this.navigateTo}>Edit Opportunity--{'>'}</SubmitButton>
                   </nav>}
          <div className="TitleImageContainer">
                <div className="opportunityTitle">
                    {this.state.title}  
                    <div className="imageCarousel">
                        <ImageCarousel slides={this.state.pictures}/>
                    </div>  
                </div>
            </div>
            <div className="outerContainer">  
                <div id="descriptionHeader">DESCRIPTION: </div>
                        <div className="DescriptionAndDateContainer">
                            <p className="descriptionText">
                                {this.state.description}
                            </p>
                            <p id="dateAndTime">
                                WHEN:
                                <p className="dateText">

                                    {this.state.start_event.map(start =>
                                    {
                                        return(
                                            <div>
                                                {dateFormat(start, " mmmm dS, yyyy ")} @
                                                {dateFormat(start, "h:MM TT", true)}
                                            </div>
                                        );
                                    })}
                                    <br/>
                                     To:
                                    <br/>
                                    <br/>
                                    {this.state.end_event.map(end =>
                                    {
                                        return(
                                            <div>
                                                {dateFormat(end, " mmmm dS, yyyy ")} @
                                                {dateFormat(end, " h:MM TT", true)}
                                            </div>
                                        );
                                    })}
                                </p>
                            </p>
                            <p id="location">
                                WHERE:
                                <p className="dateText">
                                    {this.state.location}
                                </p>
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
                                <div id={this.state.showDonateModal | this.state.showSignInModal | this.state.showUserDonateModal ? "darkTaskBody" : "taskBody"}>
                                        <div>
                                           {this.state.tasks.map(task =>
                                            {
                                              return(
                                                  <div id={this.state.showDonateModal | this.state.showSignInModal | this.state.showUserDonateModal? "darkTaskCard" : "taskCard"}>
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
                                                                            {dateFormat(start, " hh:MM")}</li>
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
                                                                                    {dateFormat(end, " hh:MM")}</li>
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
                                                        {console.log(task)}
                                                        <button id="cartButtonStyle" onClick={this.state.user ? 
                                                        () => {this.updateCartWithOpportunity(task); this.changeCartModal(task)}  : this.changeSignInModal}>Add to Cart</button>
                                                    </div>
                                                </div>
                                              )  
                                            })}
                                        </div>
                                </div>
                                <div className="reqAndItems">
                                    <div id="reqBody">
                                    <ul className="listStyle">
                                        {this.state.requirements.map((req) => {
                                        return (
                                            <div>
                                                <li>{req}</li>
                                                <br/>
                                            </div>
                                        )})}
                                    </ul>
                                    </div>
                                    <div id="itemsBody">
                                    <ul className="listStyle">
                                        {this.state.wishlist.map( item =>
                                            {return(
                                                <div>
                                                    <li>{item}</li>
                                                    <br/>
                                                </div>
                                            )})}
                                      <div id="buttonContainer">
                                         <button id="buttonStyles" onClick={!this.state.user ? this.changeDonateModal : this.changeUserDonateModal}>Donate</button> 
                                    </div>
                                    
                                    </ul>
                                    </div>
                                </div>
                                <div className="addInfoContainer">
                                    <div id="addInfoHeader">ADDITIONAL INFORMATION:</div>
                                    <p className="addInfoText">
                                    <ul className="listStyle">
                                          {this.state.additionalInfo.map((req) => {
                                          return (
                                                <div>
                                                    <li>{req}</li>
                                                    <br/>
                                                </div>
                                            )})}
                                    </ul>
                                    </p>
                             </div>
                        </div>
            </div>  
             {this.state.admin 
                        && <div className="tableContainer">
                            <div id="volunteerHeader">
                                VOLUNTEERS
                            </div>
                            <table className="detailTable">
                                <thead>
                                    <tr>
                                        <th>Volunteer</th>
                                        <th>Task</th>
                                        <th>Start Times</th>
                                        <th>End Times</th>
                                        <th>Donated Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {this.state.volunteers ? (Object.keys(this.state.volunteers)).map(volunteers =>
                                        {
                                            var vol = (this.state.volunteerList).find(x => x._id === volunteers);
                                            return(
                                                <div>
                                                    {vol && (Object.keys(this.state.volunteers[volunteers])).map((volunteer, i) =>
                                                        {
                                                            const start = "start"
                                                            const end = "end"
                                                            const key_value = Object.entries(this.state.volunteers[volunteers][volunteer]);
                                                            const key_set = Object.keys(this.state.volunteers[volunteers]);
                                                            const volId = volunteers;
                                                            const taskIndex = volunteer;
                                                            //console.log(volunteer);
                                                            //console.log(key_value);
                                                            key_value.sort(this.sortTaskArray);
                                                            return (
                                                                <tr>
                                                                    {vol && <td className="detailTD">{
                                                                
                                                                    
                                                                    <div>
                                                                        {console.log(vol)}
                                                                        {vol.firstName}
                                                                        <br/>
                                                                        {vol.lastName}  
                                                                    </div>
                                                                    }
                                                                </td>}
                                                                {key_value.map((volData, v) =>
                                                                {
                                                                //console.log(volData, v)
                                                                //console.log(key_value[1][1])
                                                                if (volData[0] ==="task") {
                                                                    //console.log(volData[1])
                                                                    return (
                                                                        <td className="detailTD">{
                                                                            
                                                                            <td>
                                                                                {volData[1]}     
                                                                            </td>
                                                                            }
                                                                        </td>
                                                                    );
                                                                }
                                                                else if(volData[0] === start)
                                                                {

                                                                    //.log((volData[1]));
                                                                    return (
                                                                       
                                                                        <td className="detailTD">{
                                                                            
                                                                            <div>
                                                                                {(volData[1]).map( (time, i) => 
                                                                                {
                                                                                    return(
                                                                                        <div>
                                                                                             <br/>
                                                                                            {dateFormat(time, " mmmm dS, yyyy ")} @
                                                                                            {dateFormat(time, " hh:MM")}
                                                                                        
                                                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                                            <br/>
                                                                                            <label id="checkIn">Check In: 
                                                                                                {/*<button id="timeButton" onClick={() =>
                                                                                                this.postTime()
                                                                                                }>submit</button>*/}
                                                                                            </label>
                                                                                            <KeyboardDateTimePicker id="startInput"
                                                                                                utils={DateMomentUtils}
                                                                                                value={time}
                                                                                                onChange={date => this.postStartTime(date, volId, taskIndex, i)}/>
                                                                                        </MuiPickersUtilsProvider>
                                                                                   
                                                                                    </div>
                                                                                    );
                                                                                    })} 
                                                                            </div>
                                                                            }
                                                                        </td>
                                                                    )
                                                                }
                                                                else if(volData[0] === end)
                                                                {
                                                                    return (
                                                                        
                                                                        <td className="detailTD">{
                                                                            // (i < (key_set.length - 1)) && 
                                                                            <div>
                                                                                {(volData[1]).map( (time) => 
                                                                                {
                                                                                    return(
                                                                                        <div>
                                                                                             <br/>
                                                                                            {dateFormat(time, " mmmm dS, yyyy ")} @
                                                                                            {dateFormat(time, " hh:MM")}

                                                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                                                <br/>
                                                                                                <label id="checkIn">Check Out:</label>
                                                                                                <KeyboardDateTimePicker utils={DateMomentUtils}
                                                                                                value={time}
                                                                                                onChange={date => this.postEndTime(date, volId, taskIndex, i)}/>
                                                                                            </MuiPickersUtilsProvider>
                                                                                        </div>
                                                                                    )})}

                                                                            </div>
                                                                            }
                                                                        </td>
                                                                        )
                                                                }                         
                                                                else if(volData[0] === "donated") {
                                                                    return(
                                                                        <td className="detailTD">{ 
                                                                            (volData[1]).map(item => {
                                                                                return (
                                                                                    <li>{item}</li>
                                                                                );
                                                                            })
                                                                        }
                                                                        </td>
                                                                
                                                                    )
                                                                }
                                                            })}
                                                        </tr>)})}
                                                        </div>
                                                    )}) : "No Volunteers Found"}
                                            </tbody>
                                        </table>
                                    </div>}

                            <Modal 
                                show={this.state.showCartModal}
                                onHide={this.changeCartModal}
                                backdrop="static"
                                keyboard={false}>
                                <Modal.Header closeButton>
                                <Modal.Title>Success! Task has been added</Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="modalButtons">
                                <Link to="/opportunityCheckout" id="modalButton" className="linkPadding">Go to Cart</Link>
                                <Button id="modalButton" variant="primary"
                                        onClick={this.changeCartModal}>Add more tasks</Button>
                                </Modal.Body>
                            </Modal>

                            <Modal 
                                show={this.state.showDonateModal}
                                onHide={this.changeDonateModal}
                                backdrop="static"
                                keyboard={false}>
                                <Modal.Header closeButton>
                                <Modal.Title>Sign In to Donate</Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="signIn">
                                    <SignInWithGoogleButton/>
                                </Modal.Body>
                            </Modal>

                            <Modal 
                                show={this.state.showUserDonateModal}
                                onHide={this.changeUserDonateModal}
                                backdrop="static"
                                keyboard={false}>
                                <Modal.Header closeButton>
                                <Modal.Title>Select Items to Donate</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {this.state.wishlist.map( item =>
                                        {return(
                                            <div>
                                                <li>{item}
                                                    <input
                                                    className="form-checkbox"
                                                    type="checkbox"/>
                                                </li>
                                                <br/>
                                            </div>)})}
                                </Modal.Body>
                                <Modal.Footer>
                                <Button id="modalButton" variant="primary"
                                        onClick={this.postDonations}>Confirm Donation</Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal 
                                show={this.state.showSignInModal}
                                onHide={this.changeSignInModal}
                                backdrop="static"
                                keyboard={false}>
                                <Modal.Header closeButton>
                                <Modal.Title>Sign In to Add to Cart</Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="signIn">
                                    <SignInWithGoogleButton/>
                                </Modal.Body>
                            </Modal>

                           {/*{this.state.showUserDonateModal && 
                                            <div className="popUpBackground" class="overlay">
                                                <div className="ModalWrapper">
                                                    <div className="ModalContent">
                                                        <div id="donateItemsHeader">
                                                            Select Items To Donate:
                                                        </div>
                                                        <div id="donateItems">
                                                            {this.state.wishlist.map( item =>
                                                            {return(
                                                                <div>
                                                                    <li>{item}
                                                                    <input
                                                                        className="form-checkbox"
                                                                        type="checkbox" />
                                                                    </li>
                                                                    <br/>
                                                                </div>
                                                            )})}
                                                        </div>
                                                        <div className="closeModal">
                                                            <MdClose id="exitIcon" onClick={this.changeUserDonateModal}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }*/}

                           {/* {this.state.showDonateModal && 
                                            <div className="popUpBackground" class="overlay">
                                                <div className="ModalWrapper">
                                                    <div className="ModalContent">
                                                        <div id="signIn">
                                                            <SignInWithGoogleButton/>
                                                            <p id="or">
                                                                or
                                                            </p>
                                                            <button id="guestCheckout">Checkout as Guest</button>
                                                        </div>
                                                        <div className="closeModal">
                                                            <MdClose id="exitIcon" onClick={this.changeDonateModal}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }*/}

                       { /*{!this.state.user && this.state.showSignInModal &&
                                        <div className="popUpBackground">
                                            <div className="ModalWrapper">
                                                <div className="ModalContent">
                                                    <div id="signIn">
                                                        <p id="signInMessage">
                                                            Sign In to Add to Cart
                                                        </p>
                                                        <SignInWithGoogleButton/>
                                                    </div>
                                                    <div className="closeModal">
                                                        <MdClose id="exitIcon" onClick={this.changeSignInModal}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                        */}
                    </div>);}}

export default withRouter(OpportunityDetail);
