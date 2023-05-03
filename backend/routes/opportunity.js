const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const moment = require("moment");

const app = express();
const Opportunity = require("../models/opportunity");
const Volunteer = require("../models/volunteer");
const { transport } = require("../server");

const postNewOpportunity = async (
  title,
  description,
  pictures,
  startEvent,
  endEvent,
  skills,
  wishlist,
  location,
  requirements,
  tasks,
  additionalInfo,
  volunteers
) =>
  new Opportunity({
    title,
    description,
    pictures,
    startEvent,
    endEvent,
    skills,
    wishlist,
    location,
    requirements,
    tasks,
    additionalInfo,
    volunteers,
  }).save();

app.get("/api/getOpportunity/:id", async (req, res) => {
  const oppid = mongoose.Types.ObjectId(req.params.id);
  try {
    const opp = await Opportunity.findById(oppid);
    console.log(opp);
    res.status(200).json(opp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.get("/api/opportunityDetail/:name", async (req, res) => {
  const name = mongoose.Types.ObjectId(req.params.name);
  try {
    const opp = await Opportunity.findById(name);
    res.status(200).json(opp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.get("/api/opportunities", async (req, res) => {
  try {
    const opp = await Opportunity.find({});
    res.status(200).json(opp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// const getAllOpportunities = async () => Opportunity.find({});

app.post("/api/updateOpportunity", async (req, res) => {
  try {
    if (req.body._id === undefined || req.body._id === "") {
      const newOpportunity = await postNewOpportunity(
        req.body.title,
        req.body.description,
        req.body.pictures,
        req.body.start_event,
        req.body.end_event,
        req.body.skills,
        req.body.wishlist,
        req.body.location,
        req.body.requirements,
        req.body.tasks,
        req.body.additionalInfo,
        req.body.volunteers
      );
      console.log(newOpportunity);
      console.log("new");
    } else {
      const newOpportunity = await Opportunity.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body._id),
        req.body
      );
      console.log(newOpportunity);
      console.log(newOpportunity.volunteers);
      console.log("update");
      res.json(newOpportunity);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.post("/api/opportunity", async (req, res) => {
  const { title } = req.body;
  const desc = req.body.desccription;
  const pic = req.body.pictures;
  const { date } = req.body;
  const { skills } = req.body;
  const { wishlist } = req.body;
  const newOpportunity = await postNewOpportunity(
    title,
    desc,
    pic,
    date,
    skills,
    wishlist
  );
  res.json(newOpportunity);
});

app.post("/api/cancelOpportunity", async (req, res) => {
  const opportunity = await Opportunity.findById(req.body.cancelOpp.id);
  const newVolunteer = await Volunteer.findByIdAndUpdate(
    req.body._id,
    req.body
  );

  // Emails to cancel signup
  const volunteerMessage = {
    from: `${process.env.PASO_EMAIL}`,
    to: newVolunteer.email,
    subject: `Cancellation: ${req.body.cancelOpp.task} for ${opportunity.title}`,
    html:
      `<img width='500' src = cid:YouthArtsLogo /> <br></br> <p>Hello ${newVolunteer.firstName},<br></br>` +
      `<br></br> You have successfully cancelled a volunteer session for ${
        opportunity.title
      } for the task ${req.body.cancelOpp.task} on ${moment(
        req.body.cancelOpp.start
      )
        .subtract({ h: 7 })
        .format("MMMM Do, YYYY")} from ${moment(req.body.cancelOpp.start)
        .subtract({ h: 7 })
        .format("hh:mm A")} to ${moment(req.body.cancelOpp.end)
        .subtract({ h: 7 })
        .format(
          "hh:mm A"
        )}<br></br><br></br>Go to https://youtharts-volunteer.h4i-cp.org/ to register for a new opportunity.</p>`,
    attachments: [
      {
        filename: "YouthArtsLogo.png",
        path: "https://pryac.s3-us-west-1.amazonaws.com/YouthArtsLogo.png",
        cid: "YouthArtsLogo",
      },
    ],
  };
  const adminMessage = {
    from: `${process.env.PASO_EMAIL}`,
    to: `${process.env.PASO_EMAIL}`,
    subject: `Cancellation: ${req.body.cancelOpp.task} for ${opportunity.title}`,
    html: `<img width='500' src = cid:YouthArtsLogo /> <br></br> <p> ${
      newVolunteer.firstName
    } ${newVolunteer.lastName} has cancelled a volunteer session for ${
      opportunity.title
    } for the task ${req.body.cancelOpp.task} on ${moment(
      req.body.cancelOpp.start
    )
      .subtract({ h: 7 })
      .format("MMMM Do, YYYY")} from ${moment(req.body.cancelOpp.start)
      .subtract({ h: 7 })
      .format("hh:mm A")} to ${moment(req.body.cancelOpp.end)
      .subtract({ h: 7 })
      .format("hh:mm A")}<br></br><br></br> Their contact email is: ${
      newVolunteer.email
    }</p>`,
    attachments: [
      {
        filename: "YouthArtsLogo.png",
        path: "https://pryac.s3-us-west-1.amazonaws.com/YouthArtsLogo.png",
        cid: "YouthArtsLogo",
      },
    ],
  };
  transport.sendMail(volunteerMessage, (err, info) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(info);
    }
  });
  transport.sendMail(adminMessage, (err, info) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(info);
      res.send(info);
    }
  });
});

const postStartTime = async (id, date, volId, taskIndex, timeIndex) => {
  const opportunity = await Opportunity.findById(id);
  opportunity.volunteers.get(volId)[taskIndex].start.splice(timeIndex, 1, date);
  await Opportunity.findByIdAndUpdate(id, {
    volunteers: opportunity.volunteers,
  });

  const volunteer = await Volunteer.findById(volId);
  volunteer.opportunities.get(id)[taskIndex].start.splice(timeIndex, 1, date);
  await Volunteer.findByIdAndUpdate(volId, {
    opportunities: volunteer.opportunities,
  });
  console.log(volunteer.opportunities.get(id)[taskIndex].start);
};

const postEndTime = async (id, date, volId, taskIndex, timeIndex) => {
  const opportunity = await Opportunity.findById(id);
  opportunity.volunteers.get(volId)[taskIndex].end.splice(timeIndex, 1, date);
  await Opportunity.findByIdAndUpdate(id, {
    volunteers: opportunity.volunteers,
  });

  const volunteer = await Volunteer.findById(volId);
  volunteer.opportunities.get(id)[taskIndex].end.splice(timeIndex, 1, date);
  await Volunteer.findByIdAndUpdate(volId, {
    opportunities: volunteer.opportunities,
  });
};

app.post("/api/updateBoardOpportunity", async (req, res) => {
  try {
    await Opportunity.findByIdAndUpdate(req.body._id, req.body);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/api/opportunityStartTime/", async (req, res) => {
  const { id } = req.body;
  const { volId } = req.body;
  const { date } = req.body;
  const { taskIndex } = req.body;
  const { timeIndex } = req.body;

  try {
    await postStartTime(id, date, volId, taskIndex, timeIndex);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

app.post("/api/opportunityEndTime/", async (req, res) => {
  const { id } = req.body;
  const { volId } = req.body;
  const { date } = req.body;
  const { taskIndex } = req.body;
  const { timeIndex } = req.body;

  try {
    await postEndTime(id, date, volId, taskIndex, timeIndex);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

module.exports = app;
