import "./OpportunitiesPage.css"
import NavBar from "../../Components/NavBar/NavBar";
import SearchOpportunities from "../../Components/SearchOpportunities/SearchOpportunities"

function OpportunitiesPage() {
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