import "./SearchOpportunities.css"
import Footer from "./../Footer/Footer"
import Pagination from "./Pagination"
import OpportunityCard from "./../OpportunityCard/OpportunityCard"
import { useEffect, useState } from "react"
import SubmitButton from "./../SubmitButton/SubmitButton"
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from 'moment'

function SearchOpportunities(props) {
    const {user} = props;
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
            if(result) {
                result = result.filter(opp => opp.title != "Board Member");
                result = result.filter(opp => {
                    let diff = moment.duration(moment(opp.end_event[opp.end_event.length - 1]).diff(moment().startOf('day'))).asHours();
                    if (!moment.duration(moment(opp.end_event[opp.end_event.length - 1]).diff(moment().startOf('day'))).asHours()) {
                        diff = 0;
                    }
                    return diff >= 0
                });
                setOpportunities(result.sort((a, b) => a.start_event < b.start_event ? -1 : 1));
            }
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
    if(sortBy === "oppAlphabetical") {
        filteredOpps = filteredOpps.sort((a, b) => {
            return a.title.localeCompare(b.title)
        });
    }
    if(sortBy === "oppType") {
        filteredOpps = filteredOpps.sort((a, b) => {
            return a.skills[0].localeCompare(b.skills[0])
        });
    }
    else if(sortBy === "date") {
        filteredOpps = filteredOpps.sort((a, b) => a.start_event < b.start_event ? -1 : 1)
    }
    

    //filter logic
    if (filterBy === "Classroom") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.skills.includes("Classroom")
        });
    }
    else if (filterBy === "Event") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.skills.includes("Event")
        });
    }
    else if (filterBy === "Fundraiser") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.skills.includes("Fundraiser")
        });
    }
    else if (filterBy === "Maintenance") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.skills.includes("Maintenance")
        });
    }
    else if (filterBy === "Office/Admin") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.skills.includes("Office/Admin")
        });
    }
    else if (filterBy === "Performance") {
        filteredOpps = filteredOpps.filter(opportunity => {
            return opportunity.skills.includes("Performance")
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
                        <option value="oppAlphabetical">Alphabetical</option>
                        <option value="oppType">Interest</option>
                    </select>

                    <label for="filterBy">Filter By:</label>
                    <select id="filterBy" name="filterBy" onChange={e => setFilterBy(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="Classroom">Classroom</option>
                        <option value="Event">Event</option>
                        <option value="Fundraiser">Fundraiser</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Office/Admin">Office/Admin</option>
                        <option value="Performance">Performance</option>
                    </select>
                </Col>
                {user && user.admin && <Col id="button">
                    <SubmitButton onClick={navigateTo} buttonText="ADD OPPORTUNITY"/>
                </Col>}
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