import "./CalendarPage.css";
import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function CalendarPage(props) {
  return (
    <div>
      <Header user={props.user} />
      <div id="calHeader">
        <h1 className="calTitle">CALENDAR</h1>
      </div>
      <body>
        <br />
        <h4 className="calText">
          Below is our upcoming event schedule. For questions or further
          information, feel free to contact us at (805) 238-5825.
        </h4>
        <div id="calendarEmbedWrapper">
          <iframe
            title="Events"
            id="calendarEmbed"
            src="https://calendar.google.com/calendar/embed?src=c_v9f2ir4pphbmcsvjnu3fthd58o%40group.calendar.google.com&ctz=America%2FLos_Angeles"
          />
          <div id="calendarEmbedBlocker" />
        </div>
      </body>

      <Footer />
    </div>
  );
}

export default CalendarPage;
