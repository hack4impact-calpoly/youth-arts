import "./SearchOpportunities.css"
import Footer from "./../Footer/Footer"
import Pagination from "./Pagination"
import OpportunityCard from "./../OpportunityCard/OpportunityCard"
import { useState } from "react"
import classroom from "./../../../src/Images/PRYAC_Icons/classroom.png"
import comittee from "./../../../src/Images/PRYAC_Icons/comittee.png"
import event from "./../../../src/Images/PRYAC_Icons/event.png"
import SubmitButton from "./../SubmitButton/SubmitButton"
import {Row, Col} from "react-bootstrap";


function SearchOpportunities() {
    //need to connect backend here and set to opportunities
    const opportunities = [
        {
            image: classroom,
            title: "Classroom 1",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "classroom",
            date: 10
        },
        {
            image: classroom,
            title: "Classroom 2",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "classroom",
            date: 1
        },
        {
            image: event,
            title: "Event 3",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "event",
            date: 5
        },
        {
            image: comittee,
            title: "Comittee 4",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "comittee",
            date: 7
        },
        {
            image: comittee,
            title: "Comittee 5",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "comittee",
            date: 0
        },
        {
            image: comittee,
            title: "Comittee 6",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "comittee",
            date: 6
        },
        {
            image: event,
            title: "Event 7",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "event",
            date: 9
        },
        
        {
            image: event,
            title: "Event 8",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "event",
            date: 3
        },
        {
            image: classroom,
            title: "Classroom 9",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "classroom",
            date: 11
        },
        {
            image: event,
            title: "Event 10",
            location: "Location",
            desc: "Description aljsdkfhlajsdfhljasdlfjkahsldjfhalsjkdfhlajksdfhlajksdfhajksdfkjasdf",
            type: "event",
            date: 8
        }
    ]

    //stores whats being filtered/sorted/searched
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [filterBy, setFilterBy] = useState("");

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    //search logic
    var filteredOpps = opportunities.filter(opportunity => {
        return opportunity.title.toLowerCase().includes(search.toLowerCase())
    })

    //sort logic
    if(sortBy === "oppType") {
        filteredOpps = filteredOpps.sort((a, b) => a.type.localeCompare(b.type));
    }
    else if(sortBy === "date") {
        filteredOpps = filteredOpps.sort((a, b) => a.date < b.date ? -1 : 1)
    }
    

    //filter logic
    if (filterBy === "classroom") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("classroom")
        });
    }
    else if (filterBy === "comittee") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("comittee")
        });
    }
    else if (filterBy === "event") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("event")
        });
    }
    else if (filterBy === "fundraiser") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("fundraiser")
        });
    }
    else if (filterBy === "maintenance") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("maintenance")
        });
    }
    else if (filterBy === "office-admin") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("office-admin")
        });
    }
    else if (filterBy === "performance") {
        filteredOpps = opportunities.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("performance")
        });
    }

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredOpps.slice(indexOfFirstPost, indexOfLastPost);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <Row id="search">
                <Col>
                    <h4>Search Opportunities</h4>
                    <hr />
                    <input type="text" placeholder="Enter Keywords Here" onChange={e => setSearch(e.target.value)} />

                    <label for="sortBy">Sort By:</label>
                    <select id="sortBy" name="sortBy" onChange={e => setSortBy(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="date">Date</option>
                        <option value="oppType">Opportunity Type</option>
                    </select>

                    <label for="filterBy">Filter By:</label>
                    <select id="filterBy" name="filterBy" onChange={e => setFilterBy(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="classroom">Classroom</option>
                        <option value="comittee">Comittee</option>
                        <option value="event">Event</option>
                        <option value="fundraiser">Fundraiser</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="office-admin">Office Admin</option>
                        <option value="performance">Performance</option>
                    </select>
                </Col>
                <Col id="button">
                    <SubmitButton buttonText="ADD OPPORTUNITY"/>
                </Col>
            </Row>

            <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={filteredOpps.length}
                    paginate={paginate}
            />

            <br />

            <div id="opportunities">
                {currentPosts.map((opportunity, index) => (
                    <OpportunityCard key={index} {...opportunity} />
                ))}
            </div>

            <br />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filteredOpps.length}
                paginate={paginate}
            />

            <br />

            <Footer />
        </div>
    )
}

export default SearchOpportunities;