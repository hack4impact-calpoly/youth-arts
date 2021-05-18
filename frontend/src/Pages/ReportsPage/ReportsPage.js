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
            <ReportsSearchOpportunities user={user}/>
        </body>
    );
}

export default ReportsPage;