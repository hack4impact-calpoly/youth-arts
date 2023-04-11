import "./OpportunitiesPage.css";
import React from "react";
import Header from "../../Components/Header/Header";
import SearchOpportunities from "../../Components/SearchOpportunities/SearchOpportunities";

function OpportunitiesPage(props) {
  const { user } = props;
  return (
    <body>
      <Header user={user} />
      <div id="oppsHeader">
        <h1 id="oppsTitle">OPPORTUNITIES</h1>
      </div>
      <SearchOpportunities user={user} />
    </body>
  );
}

export default OpportunitiesPage;
