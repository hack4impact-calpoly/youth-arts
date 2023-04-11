import "./ReportsSearchOpportunities.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import dateFormat from "dateformat";
import moment from "moment";
import Moment from "moment";
import { CsvBuilder } from "filefy";
import Footer from "../Footer/Footer";

function ExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function ReportsSearchOpportunities(props) {
  const history = useHistory();
  function navigateToOp(p, e) {
    history.push(`/opportunityDetail/${p.id}`);
  }
  const [opportunities, setOpportunities] = useState("");
  const [volunteers, setVolunteers] = useState("");
  async function fetchAll() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/opportunities`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function fetchAllvolunteers() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/volunteers`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        Object.keys(result).map((key, index) => {
          Object.assign(result[key], {
            volunteerHours: result[key].volunteers,
          });
          Object.assign(result[key], {
            volunteerDonate: result[key].volunteers,
          });
        });
        setOpportunities(result);
      }
    });
    fetchAllvolunteers().then((result) => {
      if (result) setVolunteers(result);
    });
  }, []);

  const columnsOpps = [
    {
      field: "Volunteer Data",
      headerName: "Volunteer Data",
      sortable: false,
      export: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <button
          className="exportButton"
          onClick={(e) => {
            const { api } = params;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow = {};

            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });
            const fileName = `${thisRow.title}Data`;
            const builder = new CsvBuilder(`${fileName}.csv`);
            const rowOpportunity = opportunities.filter(
              (o) =>
                o.title === thisRow.title && o.location === thisRow.location
            );
            let rowVols = [];
            if (
              rowOpportunity.length &&
              rowOpportunity[0].volunteers !== undefined
            ) {
              rowVols = Object.keys(rowOpportunity[0].volunteers);
              rowVols.forEach((part, index, theArray) => {
                const curVol = volunteers.filter((v) => v._id === part);
                if (curVol.length && curVol[0] !== undefined) {
                  let hours = 0;
                  let donated = [];
                  let taskList = [];
                  Object.keys(curVol[0].opportunities).map((key, index) => {
                    const tasks = curVol[0].opportunities[key];
                    const times = tasks.map((task) => {
                      taskList.push(task.task);
                      for (var i = 0; i < task.start.length; i++) {
                        const begin = task.start[i];
                        const end = task.end[i];
                        const diff = moment
                          .duration(moment(end).diff(moment(begin)))
                          .asHours();
                        hours += diff;
                      }
                      for (var i = 0; i < task.donated.length; i++) {
                        donated = donated.concat(task.donated);
                      }
                    });
                  });
                  if (donated.length) {
                    donated.sort();
                    donated = donated.join(", ");
                  } else {
                    donated = "N/A";
                  }
                  if (taskList.length) {
                    taskList.sort();
                    taskList = taskList.join(", ");
                  } else {
                    taskList = "N/A";
                  }
                  theArray[index] = [
                    curVol[0].firstName,
                    curVol[0].lastName,
                    curVol[0].email,
                    curVol[0].phoneNum,
                    curVol[0].address,
                    taskList,
                    hours.toFixed(2),
                    donated,
                  ];
                } else {
                  rowVols.splice(index, 1);
                }
              });
            }
            builder
              .setColumns([
                "First Name",
                "Last Name",
                "Email",
                "Phone Number",
                "Address",
                "Tasks",
                "Hours Volunteered",
                "Items Donated",
              ])
              .addRows(rowVols)
              .exportFile();
          }}
        >
          Export Volunteers
        </button>
      ),
    },
    {
      field: "Contact Volunteers",
      sortable: false,
      export: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <button
          className="exportButton"
          onClick={(e) => {
            const { api } = params;
            const fields = api
              .getAllColumns()
              .map((c) => c.field)
              .filter((c) => c !== "__check__" && !!c);
            const thisRow = {};

            fields.forEach((f) => {
              thisRow[f] = params.getValue(f);
            });

            const fileName = `${thisRow.title}VolunteerData`;
            const builder = new CsvBuilder(`${fileName}.csv`);
            const rowOpportunity = opportunities.filter(
              (o) =>
                o.title === thisRow.title && o.location === thisRow.location
            );
            let rowVols = [];
            if (
              rowOpportunity.length &&
              rowOpportunity[0].volunteers !== undefined
            ) {
              rowVols = Object.keys(rowOpportunity[0].volunteers);
              rowVols.forEach((part, index, theArray) => {
                const curVol = volunteers.filter((v) => v._id === part);
                if (curVol.length && curVol[0] !== undefined) {
                  theArray[index] = [
                    curVol[0].firstName,
                    curVol[0].lastName,
                    curVol[0].phoneNum,
                  ];
                } else {
                  rowVols.splice(index, 1);
                }
              });
            }
            builder
              .setColumns(["First Name", "Last Name", "Phone Number"])
              .addRows(rowVols)
              .exportFile();
          }}
        >
          Export Phone Numbers
        </button>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      disableSelectionOnClick: true,
    },
    { field: "location", headerName: "Location", width: 250 },
    {
      field: "start_event",
      headerName: "Start Date",
      width: 220,
      valueGetter: ({ value }) => {
        if (Array.isArray(value)) {
          return value
            .map(
              (item) =>
                `${dateFormat(item, " mmmm dS, yyyy ")}at ${dateFormat(
                  item,
                  "hh:MM TT"
                )}`
            )
            .join(", \n");
        }
        return value;
      },
      sortComparator: (param1, param2) => {
        let date1 = param1.split(" at ").join().split("M,")[0];
        date1 = date1.substring(1, date1.length - 8);
        date1 = Moment(date1, "MMMM Do YYYY");
        let date2 = param2.split(" at ").join().split("M,")[0];
        date2 = date2.substring(1, date2.length - 8);
        date2 = Moment(date2, "MMMM Do YYYY");
        return date1.diff(date2);
      },
    },
    {
      field: "end_event",
      headerName: "End Date",
      width: 220,
      valueGetter: ({ value }) => {
        if (Array.isArray(value)) {
          return value
            .map(
              (item) =>
                `${dateFormat(item, " mmmm dS, yyyy ")}at ${dateFormat(
                  item,
                  "hh:MM TT"
                )}`
            )
            .join(", \n");
        }
        return value;
      },
      sortComparator: (param1, param2) => {
        let date1 = param1.split(" at ").join().split(", \n");
        date1 = date1[date1.length - 1];
        date1 = date1.substring(1, date1.length - 8);
        date1 = Moment(date1, "MMMM Do YYYY");
        let date2 = param2.split(" at ").join().split(", \n");
        date2 = date2[date2.length - 1];
        date2 = date2.substring(1, date2.length - 8);
        date2 = Moment(date2, "MMMM Do YYYY");
        return date1.diff(date2);
      },
    },
    {
      field: "skills",
      headerName: "Interest",
      width: 200,
      valueGetter: ({ value }) => value.join(" "),
    },
    {
      field: "volunteers",
      headerName: "Total Volunteers",
      width: 170,
      valueGetter: ({ value }) => Object.keys(value).length,
    },
    {
      field: "volunteerHours",
      headerName: "Total Volunteer Hours",
      width: 190,
      valueGetter: ({ value }) => {
        let hours = 0;
        if (Object.keys(value).length) {
          Object.keys(value).map((key, index) => {
            const tasks = value[key];
            const times = tasks.map((task) => {
              for (let i = 0; i < task.start.length; i++) {
                const begin = task.start[i];
                const end = task.end[i];
                const diff = moment
                  .duration(moment(end).diff(moment(begin)))
                  .asHours();
                if (diff !== null) {
                  hours += diff;
                }
                if (value.task === "General Committee Member") {
                  hours = 0;
                }
              }
            });
          });
        }
        return hours.toFixed(2);
      },
    },
    {
      field: "volunteerDonate",
      headerName: "Donated Items",
      width: 200,
      valueGetter: ({ value }) => {
        let donated = [];
        if (Object.keys(value).length) {
          Object.keys(value).map((key, index) => {
            const tasks = value[key];
            const times = tasks.map((task) => {
              for (let i = 0; i < task.donated.length; i++) {
                donated = donated.concat(task.donated);
              }
            });
          });
        }
        if (donated.length) {
          return donated.join(", ");
        }
        return "N/A";
      },
    },
  ];
  return (
    <div>
      {opportunities ? (
        <div
          style={{
            height: 500,
            width: "100%",
            display: "flex",
            padding: 50,
          }}
        >
          <DataGrid
            className="Volgrid"
            rows={opportunities}
            columns={columnsOpps}
            getRowId={(row) => row._id}
            pageSize={5}
            onRowClick={(p, e) => {
              navigateToOp(p, e);
            }}
            checkboxSelection
            components={{
              Toolbar: ExportButton,
            }}
          />
        </div>
      ) : (
        <div />
      )}
      <Footer />
    </div>
  );
}

export default ReportsSearchOpportunities;
