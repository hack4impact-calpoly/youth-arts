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
            sampleText: props.sampleText,
        };
    }

    componentDidMount() {
        const id = window.location.hash.substr(1);
        fetch('http://localhost:3000/api/opportunityDetail' + id)
        .then(res => res.json())
        .then(opportunity => {
            this.setState({...opportunity});
        });
    }


  render() {
    return (
        <div >
          <NavBar/>
          <div className="TitleImageContainer">
                <div className="opportunityTitle">
                    Barn Bash & Dance Benefit         
                    <div className="imageCarousel">
                        <ImageCarousel slides={CarouselData}/>
                    </div>  
                </div>
            </div>
            <div className="outerContainer">  
                <div id="descriptionHeader">DESCRIPTION: </div>
                        <div className="DescriptionAndDateContainer">
                            <p className="descriptionText">
                                {this.state.sampleText}
                            </p>
                            <p id="dateAndTime">
                                WHEN:
                                <p className="dateText">
                                    May 4, 2019
                                </p>
                            </p>
                            <p id="location">
                                WHERE:
                                <p className="dateText">
                                    Rolling Hills Ranch, 7275 Cross Canyons Rd., San Miguel, CA
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
                                            <div className="roleNameAndTime">
                                                <p id="roleHeader">
                                                    Role:
                                                </p>
                                                <div id="roleName">
                                                    Parking Lot Helper
                                                </div>
                                                <p id="roleHeader">
                                                    Times:
                                                </p>
                                                <div id="roleName">
                                                    3:30-5:30pm or 5-7pm
                                                </div>
                                            </div>
                                            <div id="roleDesc">
                                                    Description:
                                            </div>
                                            <div id="roleDescText">
                                            Work in the historic barn to serve guests wine and beer. Don't worry, no fancy mixing required. Teams are great here and will have a lot of fun during their shift
                                            </div>
                                            <div className="roleNameAndTime">
                                                <p id="roleHeader">
                                                    Role:
                                                </p>
                                                <div id="roleName">
                                                    Parking Lot Helper
                                                </div>
                                                <p id="roleHeader">
                                                    Times:
                                                </p>
                                                <div id="roleName">
                                                    3:30-5:30pm or 5-7pm
                                                </div>
                                            </div>
                                            <div id="roleDesc">
                                                    Description:
                                            </div>
                                            <div id="roleDescText">
                                            Work in the historic barn to serve guests wine and beer. Don't worry, no fancy mixing required. Teams are great here and will have a lot of fun during their shift
                                            </div>
                                        </div>

                                </div>
                                <div id="reqBody">
                                <ul className="listStyle">
                                    <li>Wear black pants and a white shirt</li>
                                    <br/>
                                    <li>Tie long hair back</li>
                                    <br/>
                                    <li>Students must be 13+ </li>
                                    <br/>
                                    <li>Students must provide their own transportation </li>
                                </ul>
                                </div>
                                <div id="itemsBody">
                                <ul className="listStyle">
                                    <li>None</li>
                                </ul>
                                </div>
                        </div>
                        <div id="addInfoHeader">ADDITIONAL INFORMATION:</div>
                        <p className="addInfoText">
                        </p>
            </div>  

            <div id="buttonContainer">
                <input id="buttonStyles" type="button" value="Add to cart"/>
                <input id="buttonStyles" type="button" value="Donate"/>
            </div>
       </div>
    );
  }
}

export default OpportunityDetail;
