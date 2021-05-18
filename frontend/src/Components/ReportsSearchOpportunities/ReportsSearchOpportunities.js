import "./ReportsSearchOpportunities.css"
import Footer from "../Footer/Footer"
import Pagination from "./Pagination"
import OpportunityCard from "../OpportunityCard/OpportunityCard"
import { useEffect, useState } from "react"
import SubmitButton from "../SubmitButton/SubmitButton"
import {Row, Col} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {DataGrid, GridToolbarContainer, GridToolbarExport, GridColTypeDef} from '@material-ui/data-grid';
import dateFormat from 'dateformat';
import moment from 'moment'
import { keys } from "@material-ui/core/styles/createBreakpoints"
import Moment from "moment";

 function ExportButton() {
   return (
     <GridToolbarContainer>
       <GridToolbarExport />
     </GridToolbarContainer>
   );
 }

function ReportsSearchOpportunities(props) {
    const {user} = props;
    const history = useHistory();
    const navigateTo = () => history.push('/addOpportunity');
    const [opportunities, setOpportunities] = useState("");
    const [volunteers, setVolunteers] = useState("");
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
    async function fetchAllvolunteers() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/volunteers`);
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
                Object.keys(result).map(function(key, index) {
                    Object.assign(result[key], {volunteerHours: (result[key]).volunteers});
                    Object.assign(result[key], {volunteerDonate: (result[key]).volunteers});
                })
                console.log(result);
                setOpportunities(result);
            }
                
        })
        fetchAllvolunteers().then(result => {
            if(result)
                setVolunteers(result);
        })
    }, [])


    // //stores whats being filtered/sorted/searched
    // const [search, setSearch] = useState("");
    // const [sortBy, setSortBy] = useState("");
    // const [filterBy, setFilterBy] = useState("");

    // //for pagination
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(3);

    // //search logic
    // var filteredOpps = Object.values(opportunities).filter(opportunity => {
    //     return opportunity.title.toLowerCase().includes(search.toLowerCase())
    // })

    // //sort logic
    // if(sortBy === "oppType") {
    //     filteredOpps = filteredOpps.sort((a, b) => a.type.localeCompare(b.type));
    // }
    // else if(sortBy === "date") {
    //     filteredOpps = filteredOpps.sort((a, b) => a.date < b.date ? -1 : 1)
    // }
    

    // //filter logic
    // if (filterBy === "classroom") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("classroom")
    //     });
    // }
    // else if (filterBy === "comittee") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("comittee")
    //     });
    // }
    // else if (filterBy === "event") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("event")
    //     });
    // }
    // else if (filterBy === "fundraiser") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("fundraiser")
    //     });
    // }
    // else if (filterBy === "maintenance") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("maintenance")
    //     });
    // }
    // else if (filterBy === "office-admin") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("office-admin")
    //     });
    // }
    // else if (filterBy === "performance") {
    //     filteredOpps = filteredOpps.filter(opportunity => {
    //         return opportunity.type.toLowerCase().includes("performance")
    //     });
    // }

    // //Get current posts
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = filteredOpps.slice(indexOfFirstPost, indexOfLastPost);

    // function paginate(pageNumber) {
    //     setCurrentPage(pageNumber)
    // }

    // const DateFormatter = ({ value }) => { return <span style={{textTransform: 'uppercase'}}>{value}</span> };



    const columnsOpps = [
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'location', headerName: 'Location', width: 250},
        { field: 'start_event', headerName: 'Start Date', width: 220, 
        valueGetter: ({ value }) => {
            if (Array.isArray(value))
            {
                return value.map(item => dateFormat(item, " mmmm dS, yyyy ") + "at " + dateFormat(item, "hh:MM TT")).join(', \n') 
            }
            else
            {
                return value
            }
            
        },
        sortComparator: (param1, param2) => {
            let date1 = param1.split(' at ').join().split('M,')[0];
            date1 = date1.substring(1, date1.length - 8);
            date1 = Moment(date1, 'MMMM Do YYYY');
            let date2 = param2.split(' at ').join().split('M,')[0];
            date2 = date2.substring(1, date2.length - 8);
            date2= Moment(date2, 'MMMM Do YYYY');
            return date1.diff(date2)
        },
        },
        { field: 'end_event', headerName: 'End Date', width: 220, 
        valueGetter: ({ value }) => {
            if (Array.isArray(value))
            {
                return value.map(item => dateFormat(item, " mmmm dS, yyyy ") + "at " + dateFormat(item, "hh:MM TT")).join(', \n') 
            }
            else
            {
                return value
            }
        },
        sortComparator: (param1, param2) => {
            let date1 = param1.split(' at ').join().split(', \n');
            date1 = date1[date1.length - 1]
            date1 = date1.substring(1, date1.length - 8);
            date1 = Moment(date1, 'MMMM Do YYYY');
            let date2 = param2.split(' at ').join().split(', \n');
            date2 = date2[date2.length - 1]
            date2 = date2.substring(1, date2.length - 8);
            date2= Moment(date2, 'MMMM Do YYYY');
            return date1.diff(date2)
        },
        },
        { field: 'skills', headerName: 'Interest', width: 200, 
        valueGetter: ({ value }) => { return value.join(' ') }},
        { field: 'volunteers', headerName: 'Total Volunteers', width: 170, 
        valueGetter: ({ value }) => Object.keys(value).length },
        { field: 'volunteerHours', headerName: 'Total Volunteer Hours', width: 190, 
        valueGetter: ({ value }) => {
            let hours = 0;
            if (Object.keys(value).length) {
                Object.keys(value).map(function(key, index) {
                    let tasks = value[key];
                    let times = tasks.map(task => {
                        for (var i = 0; i < task.start.length; i++)
                        {
                            var begin = task.start[i];
                            var end = task.end[i];
                            let diff = moment.duration(moment(end).diff(moment(begin))).asHours();
                            hours += diff;
                        }
                    })
                })
            }
            return hours.toFixed(2);
        }
    },
    { field: 'volunteerDonate', headerName: 'Donated Items', width: 200, 
        valueGetter: ({ value }) => {
            let donated = [];
            if (Object.keys(value).length) {
                Object.keys(value).map(function(key, index) {
                    let tasks = value[key];
                    let times = tasks.map(task => {  
                        for (var i = 0; i < task.donated.length; i++)
                        {
                            donated = donated.concat(task.donated);
                            console.log(donated);
                            console.log(value);
                        }
                    })
                })
            }
            if (donated.length) {
                return donated.join(", ");
            }
            else {
                return "N/A"
            }
            
        }
    },
];



    return (        
        <div>
            {opportunities ? 
            <div style={{ height: 500, width: '100%', display: 'flex', padding: 50}}>
               <DataGrid className="Volgrid" 
               rows={opportunities} 
               columns={columnsOpps} 
               getRowId ={(row) => row._id}
               pageSize={5} 
               components={{
                  Toolbar: ExportButton
                  }}
                // filterModel={{
                //     items: [
                //     ],
                //   }}
               />
            </div>
            :
            <div></div>}
            <Footer />
        </div>
    )
}

export default ReportsSearchOpportunities;