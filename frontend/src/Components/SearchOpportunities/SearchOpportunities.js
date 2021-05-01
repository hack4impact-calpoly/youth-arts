import "./SearchOpportunities.css"
import Footer from "./../Footer/Footer"
import Pagination from "./Pagination"
import OpportunityCard from "./../OpportunityCard/OpportunityCard"
import { useEffect, useState } from "react"
import classroom from "./../../../src/Images/PRYAC_Icons/classroom.png"
import comittee from "./../../../src/Images/PRYAC_Icons/comittee.png"
import event from "./../../../src/Images/PRYAC_Icons/event.png"
import SubmitButton from "./../SubmitButton/SubmitButton"
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SearchOpportunities() {
    //need to connect backend here and set to opportunities
    const history = useHistory();
    const navigateTo = () => history.push('/addOpportunity');
    const [opportunities, setOpportunities] = useState("");
    async function fetchAll() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/opportunities`);
            return response.data;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        fetchAll().then(result => {
            if(result)
                setOpportunities(result);
        })
    }, [])


    //stores whats being filtered/sorted/searched
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [filterBy, setFilterBy] = useState("");

    //for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

    //search logic
    var filteredOpps = Object.values(opportunities).filter(opportunity => {
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
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("classroom")
        });
    }
    else if (filterBy === "comittee") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("comittee")
        });
    }
    else if (filterBy === "event") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("event")
        });
    }
    else if (filterBy === "fundraiser") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("fundraiser")
        });
    }
    else if (filterBy === "maintenance") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("maintenance")
        });
    }
    else if (filterBy === "office-admin") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.type.toLowerCase().includes("office-admin")
        });
    }
    else if (filterBy === "performance") {
        filteredOpps = filteredOpps.filter(opportunity => {
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
                    <SubmitButton onClick={navigateTo} buttonText="ADD OPPORTUNITY"/>
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