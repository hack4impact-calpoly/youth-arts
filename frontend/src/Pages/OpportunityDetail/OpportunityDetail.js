import NavBar from '../../Components/NavBar/NavBar'
import React, {useState} from 'react';
import Footer from '../../Components/Footer/Footer';
import icon from './user.png';
import './OpportunityDetail.css'
import ImageCarousel from './ImageCarousel/ImageCarousel'
import { CarouselData } from './ImageCarousel/CarouselData'

class OpportunityDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            updateCart: props.updateCart,
            start_event: props.start_event,
            // location: props.location,
            // description: props.description,
            requirements: props.reqList,
            additionalInfo: props.additionalInfo,
            tasks: props.tasks
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


  render() {
    return (
        <div >
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
                                    {this.state.start_event}
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
                                <div id="taskBody">
                                        <div>
                                            {this.state.tasks.map((task) =>
                                            {
                                              return(
                                                  <div id="taskCard">
                                                    <div className="roleNameAndTime">
                                                        <p id="roleHeader">
                                                        Role:
                                                        </p>
                                                        <div id="roleName">
                                                        {task.roleName}
                                                        </div>
                                                        <p id="roleHeader">
                                                        Times:
                                                        </p>
                                                        <div id="roleName">
                                                        {task.times}
                                                        </div>
                                                    </div>
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
                                                        {task.additionalRequirements}
                                                        <button id="cartButtonStyle" onClick={() => this.state.updateCart(this.state.task)}>Add to Cart</button>
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
                                        <li>None</li>
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

            <div id="buttonContainer">
                <input id="buttonStyles" type="button" value="Donate"/>
            </div>
       </div>
    );
  }
}

export default OpportunityDetail;
