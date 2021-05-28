import "./ReportsPage.css"
import ReportsSearchOpportunities from "../../Components/ReportsSearchOpportunities/ReportsSearchOpportunities"
import NavBar from "../../Components/NavBar/NavBar";
import Header from "../../Components/Header/Header";
import React, {useEffect, useState} from 'react';

const ReportsPage = (props) => {
    const { user } = props;
    return (
        <body>
            <Header user={user}/>
            <div id="repHeader">
                <h1 className="repTitle">REPORTS</h1>
            </div>
            <div className="reportsTextWrapper">
                <h6 className="reportsText">• Click 'EXPORT' in the top toolbar of the table to export all opportunity data. </h6>
                <h6 className="reportsText">• Check the preferred rows and click 'EXPORT' to export only selected opportunity data. </h6>
                <h6 className="reportsText">• Click 'Export Volunteers' to export all of the volunteer's information for an opportunity.</h6>
                <h6 className="reportsText">• Click 'Export Phone Numbers' to export volunteer phone numbers and names for an opportunity.</h6>
                <h6 className="reportsText">• Click an opportunity row to see all the information about an opportunity.</h6>
            </div>
            <ReportsSearchOpportunities user={user}/>
        </body>
    );
}

export default ReportsPage;