import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import './OpportunityDetail.css'
import ActionButton from "../../Components/ActionButton/ActionButton";
import ImageCarousel from './ImageCarousel/ImageCarousel'
import { CarouselData } from './ImageCarousel/CarouselData'
import dateFormat from 'dateformat';
import {MdClose} from 'react-icons/md'
import SignInWithGoogleButton from '../../Components/SignInWithGoogleButton/GoogleButton'


class OpportunityDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            updateCart: props.updateCart,
            start_event: [],
            end_event: [],
            tasks: [],
            requirements: [],
            additionalInfo: [],
            wishlist: [],
            volunteers: [],
            showDonateModal: false,
            showSignInModal: false,
            signedIn: false,
            admin: true
        };
    }

    componentDidMount() {
        const id = window.location.hash;
        console.log(id);
        fetch('http://localhost:3001/api/opportunityDetail/604c7b80a52b3a681039b3d5')
        .then(res => res.json())
        .then(opportunity => {
            this.setState({...opportunity});
        });
    }

    changeDonateModal = () => {
        this.setState({showDonateModal: !this.state.showDonateModal});
    };

    changeSignInModal = () => {
        this.setState({showSignInModal: !this.state.showSignInModal});
    };

  render() {
    return (
        <div className={ this.state.showDonateModal | this.state.showSignInModal ? "darkBackground" : ""}>
          {this.state.admin && 
                   <nav className="adminEdit">
                        <a href="/addOpportunity">Edit Opportunity--></a>
                   </nav>}
          <div className="TitleImageContainer">
                <div className="opportunityTitle">
                    {this.state.title}  
                    <div className="imageCarousel">
                        <ImageCarousel slides={CarouselData}/>
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
                                                {dateFormat(start, " hh:mm")}
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
                                                { dateFormat(end, " hh:mm")}
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
                                <div id={this.state.showDonateModal | this.state.showSignInModal ? "darkTaskBody" : "taskBody"}>
                                        <div>
                                           { this.state.tasks.map(task =>
                                            {
                                              return(
                                                  <div id={this.state.showDonateModal | this.state.showSignInModal ? "darkTaskCard" : "taskCard"}>
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
                                                                                    {dateFormat(end, " hh:mm")}</li>
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
                                                        <button id="cartButtonStyle" onClick={this.state.signedIn ? 
                                                        () => this.state.updateCart(this.state.task) : this.changeSignInModal}>Add to Cart</button>
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
                                    <div>
                            <div id="volunteerHeader">
                                VOLUNTEERS
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tasks</th>
                                        <th>Start Times</th>
                                        <th>End Times</th>
                                        <th>Donated Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {Object.keys(this.state.volunteers).map(volunteers =>
                                        {
                                            return(
                                                <tr>
                                                    {Object.keys(this.state.volunteers[volunteers]).map((volunteer, i) =>
                                                        {
                                                            const start = "start"
                                                            const end = "end"
                                                            const key_value = this.state.volunteers[volunteers][volunteer];
                                                            const key_set = Object.keys(this.state.volunteers[volunteers]);
                                                            if(volunteer === start)
                                                            {
                                                                return (
                                                                    <td>{(i < (key_set.length - 1)) && 
                                                                        <div>
                                                                            {dateFormat(key_value, " mmmm dS, yyyy ")} @
                                                                            {dateFormat(key_value, " hh:mm")}
                                                                        </div>
                                                                        }
                                                                    </td>
                                                                 
                                                                )
                                                            }
                                                            else if(volunteer === end)
                                                            {
                                                                return (
                                                                    <td>{(i < (key_set.length - 1)) && 
                                                                        <div>
                                                                            {dateFormat(key_value, " mmmm dS, yyyy ")} @
                                                                            {dateFormat(key_value, " hh:mm")}
                                                                        </div>
                                                                        }
                                                                    </td>
                                                                )
                                                            }
                                                            else if(key_set.length-1 == i)
                                                            {

                                                            }
                                                            else{
                                                                return(
                                                                
                                                                    <td>{(i < (key_set.length - 1)) && key_value}</td>
                                                             )}})}
                                                        </tr>
                                                    )})}
                                            </tbody>
                                        </table>
                                    </div>
                                    </p>
                             </div>

                        </div>
            </div>  
            {this.state.showDonateModal && 
                <div className="popUpBackground">
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
             }
            {this.state.showSignInModal &&
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
            <div id="buttonContainer">
                <button id="buttonStyles" onClick={!this.state.signedIn ? this.changeDonateModal : ""}>Donate</button> 
            </div>
       </div>
    );
  }
}

export default OpportunityDetail;
