import "./ReportsPage.css";
import ReportsSearchOpportunities from "../../Components/ReportsSearchOpportunities/ReportsSearchOpportunities";
import Header from "../../Components/Header/Header";
import React from "react";

const ReportsPage = (props) => {
    const { user } = props;
    return (
        <body>
            <Header user={user} />
            <div id="repHeader">
                <h1 className="repTitle">REPORTS</h1>
            </div>
            <div className="reportsTextWrapper">
                <h4 className="reportsText">
                    Choose from the following options:{" "}
                </h4>
                <div className="reportsTextOptions">
                    <div className="reportsTextOptionsRow">
                        <h5 className="reportsTextOp">
                            &emsp;1. All opportunity data in table CSV
                        </h5>
                        <h6 className="reportsTextBullet">
                            &emsp;&emsp;• Click 'EXPORT' in the top toolbar of
                            the table.
                        </h6>
                        <h5 className="reportsTextOp">
                            &emsp;2. Selected opportunity data CSV{" "}
                        </h5>
                        <h6 className="reportsTextBullet">
                            &emsp;&emsp;• Select the checkbox for the preferred
                            opportunity rows{" "}
                        </h6>
                        <h6 className="reportsTextBullet">
                            &emsp;&emsp;• Click 'EXPORT' in the top toolbar of
                            the table{" "}
                        </h6>
                    </div>
                    <div>
                        <h5 className="reportsTextOp">
                            &emsp;3. Volunteer data for one opportunity CSV{" "}
                        </h5>
                        <h6 className="reportsTextBullet">
                            &emsp;&emsp;• Click 'Export Volunteers' next to the
                            preferred opportunity.{" "}
                        </h6>
                        <h5 className="reportsTextOp">
                            &emsp;4. Volunteer phone numbers and names for one
                            opportunity CSV
                        </h5>
                        <h6 className="reportsTextBullet">
                            &emsp;&emsp;• Click 'Export Phone Numbers' next to
                            the preferred opportunity.{" "}
                        </h6>
                    </div>
                    <div>
                        <h5 className="reportsTextOp">
                            &emsp;5. View all information about an opportunity{" "}
                        </h5>
                        <h6 className="reportsTextBullet">
                            &emsp;&emsp;• Click on one of the opportunity rows.
                        </h6>
                    </div>
                </div>
            </div>
            <ReportsSearchOpportunities user={user} />
        </body>
    );
};

export default ReportsPage;
