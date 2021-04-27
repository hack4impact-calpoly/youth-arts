import "./CalendarPage.css";
import NavBar from "../../Components/NavBar/NavBar";
import logo from "./../../Images/PRYAC_mark.png";
import Footer from "../../Components/Footer/Footer";
import React, {useEffect, useState} from 'react';


function CalendarPage(props) {
    const [user, setUser] = useState();
    console.log(props);
    
    // if (mainUser !== null && mainUser !== undefined && mainUser !== {})
    // {
    //     console.log(mainUser)
    //     setUser(user);
    // }
    return (
        <div>
            <NavBar />
                <div id="authHeader">
                <img id="authLogo" src={logo} alt="logo"/>
                <h1 id="welcomeBack"> Calendar </h1>
            </div>
            <body> 
                <div id="calendarEmbedWrapper">
                    <iframe id="calendarEmbed" src='https://calendar.google.com/calendar/embed?src=c_v9f2ir4pphbmcsvjnu3fthd58o%40group.calendar.google.com&ctz=America%2FLos_Angeles'></iframe>
                    <div id="calendarEmbedBlocker"></div>
                </div>
            </body>
            
            <Footer />
        </div>
    );
}

export default CalendarPage;