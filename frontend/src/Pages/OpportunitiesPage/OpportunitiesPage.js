import "./OpportunitiesPage.css"
import NavBar from "../../Components/NavBar/NavBar";
import SearchOpportunities from "../../Components/SearchOpportunities/SearchOpportunities"
import React, {useEffect, useState} from 'react';

function OpportunitiesPage() {
    const [user, setUser] = useState({});
    return (
        <body>
            <NavBar />
            <div id="oppsHeader">
                <h1 id="oppsTitle">OPPORTUNITIES</h1>
            </div>
            <SearchOpportunities />
        </body>
    );
}

export default OpportunitiesPage;