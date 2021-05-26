import "./ReportsPage.css"
import ReportsSearchOpportunities from "../../Components/ReportsSearchOpportunities/ReportsSearchOpportunities"
import NavBar from "../../Components/NavBar/NavBar";
import React, {useEffect, useState} from 'react';

const ReportsPage = (props) => {
    const { user } = props;
    return (
        <body>
            <NavBar user={user}/>
            <div id="repHeader">
                <h1 className="repTitle">REPORTS</h1>
            </div>
            <div className="reportsTextWrapper">
                <h4 className="reportsText">To export all opportunity data, click 'EXPORT' in the top toolbar of the table. </h4>
                <h4 className="reportsText">To export all the volunteer's information for a particular opportunity, click 'Export Volunteers'.</h4>
                <h4 className="reportsText">To export just the volunteer's phone numbers, click 'Export Phone Numbers'.</h4>
            </div>
            <ReportsSearchOpportunities user={user}/>
        </body>
    );
}

export default ReportsPage;