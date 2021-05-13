import "./CalendarPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import logo from "./../../Images/PRYAC_mark.png";
import Footer from "../../Components/Footer/Footer";
import React from 'react';


function CalendarPage(props) {
    return (
        <div>
            <NavBar user={props.user}/>
                <div id="authHeader">
                <img id="authLogo" src={logo} alt="logo"/>
                <h1 id="welcomeBack"> Calendar </h1>
            </div>
            <body> 
                <br></br>
                <h4 className="calText">Below is our upcoming event schedule. For questions or further information, feel free to contact us at (805) 238-5825.</h4>
                <div id="calendarEmbedWrapper">
                    <iframe title="Events" id="calendarEmbed" src='https://calendar.google.com/calendar/embed?src=c_v9f2ir4pphbmcsvjnu3fthd58o%40group.calendar.google.com&ctz=America%2FLos_Angeles'></iframe>
                    <div id="calendarEmbedBlocker"></div>
                </div>
            </body>
            
            <Footer />
        </div>
    );
}

export default CalendarPage;