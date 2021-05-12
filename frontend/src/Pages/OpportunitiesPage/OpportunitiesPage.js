import "./OpportunitiesPage.css"
import NavBar from "../../Components/NavBar/NavBar";
import SearchOpportunities from "../../Components/SearchOpportunities/SearchOpportunities"
import React from 'react';

const OpportunitiesPage = (props) => {
    const { user } = props;
    return (
        <body>
            <NavBar user={user}/>
            <div id="oppsHeader">
                <h1 id="oppsTitle">OPPORTUNITIES</h1>
            </div>
            <SearchOpportunities user={user}/>
        </body>
    );
}

export default OpportunitiesPage;