import "./Directory.css";
import axios from "axios";
import Pagination from "./../../Components/SearchOpportunities/Pagination";
import DirectoryRow from "./../../Components/DirectoryRow/DirectoryRow";
import { useEffect, useState } from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

function Directory(props) {
    //get all volunteers and store in directory
    const [directory, setDirectory] = useState("");
    async function fetchAll() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/volunteers`, { credentials: 'include' });
            return response.data;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    useEffect(() => {
        fetchAll().then(result => {
            //if(result && user !== null && user.admin === true)
            if(result) {
                console.log(result);
                result.sort(function(a, b) {
                    return a.lastName.localeCompare(b.lastName);
                 });
                setDirectory(result);
            }

                
        });
    }, [])

    //stores what to be searched
    const [search, setSearch] = useState("");

    //stores pagination current page and how many contacts per page
    const[currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(10)

    //search logic
    var filteredSearch = Object.values(directory).filter(person => {
        if(person.firstName === null || person.lastName === null) return true;
        return person.firstName.toLowerCase().includes(search.toLowerCase()) || person.lastName.toLowerCase().includes(search.toLowerCase());
    })

    //pagination logic
    const indexOfLastPerson = currentPage * contactsPerPage;
    const indexOfFirstPerson = indexOfLastPerson - contactsPerPage;
    const currentContacts = filteredSearch.slice(indexOfFirstPerson, indexOfLastPerson);

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <body >

            <div id="calHeader">
                    <h1 className="calTitle">DIRECTORY</h1>
            </div>
        <div id="directoryPage">
            <h4>Search Directory</h4>
            <hr />

            <input type="text" placeholder="Enter Name Here" onChange={e => setSearch(e.target.value)} />

            <Container id="directoryTable" fluid>
                <Row id="directoryHeader">
                    <Col>First Name</Col>
                    <Col>Last Name</Col>
                    <Col>Phone Number</Col>
                    <Col>Email</Col>
                    <Col>Address</Col>
                </Row>
                {currentContacts.map((person, index) => (
                    <Link id="directoryLink" to={"/volunteer/#" + person._id}><DirectoryRow key={index} {...person} /></Link>
                ))}
            </Container>

            <Pagination
                postsPerPage={contactsPerPage}
                totalPosts={filteredSearch.length}
                paginate={paginate}
            />
            </div>
        </body>
    );
}

export default Directory;