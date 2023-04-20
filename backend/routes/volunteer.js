import express from "express";
import Volunteer from "../models/volunteer";

const router = express.Router();
router.use(express.json());

const moment = require("moment");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Opportunity = require("../models/opportunity");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
  logger: true,
});

router.get("/api/volunteer/:id", async (req, res) => {
  const userid = mongoose.Types.ObjectId(req.params.id);
  try {
    if (typeof userid === undefined || userid.length === 0) {
      res.redirect(`${process.env.CLIENT_URL}`);
    }
    const user = await Volunteer.findById(userid);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/api/volunteers", async (req, res) => {
  try {
    const users = await Volunteer.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/api/volunteers", async (req, res) => {
  try {
    const opp = await Volunteer.find({});
    res.status(200).json(opp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/api/updateVolunteer", async (req) => {
  await Volunteer.findByIdAndUpdate(req.body._id, req.body);
});

router.post("/api/postVolunteer", async (req, res) => {
  console.log(req.body.email);
  console.log(req.body);
  console.log(process.env.EMAIL_USER);
  await Volunteer.findByIdAndUpdate(req.body._id, req.body);

  // Email to new volunteer + admin
  const volunteerMessage = {
    from: `${process.env.PASO_EMAIL}`,
    to: req.body.email,
    subject: "Account signup successful",
    text: `Congratulations ${req.body.firstName},\n\nYou have successfully made an account with Paso Robles Youth Arts Volunteering! Thank you for your support. If you have any questions, please feel free to contact Paso Robles Youth Arts Foundation at 805-238-5825 or volunteer@pryoutharts.org`,
    html: `<img width='500' src = cid:YouthArtsLogo /><br></br> <p>Congratulations ${req.body.firstName},<br></br>You have successfully made an account with Paso Robles Youth Arts Volunteering! <br></br> Thank you for your support.<br></br>If you have any questions, please feel free to contact Paso Robles Youth Arts Foundation at 805-238-5825 or volunteer@pryoutharts.org. <br></br>Click <a href='https://youtharts-volunteer.h4i-cp.org/'>here<a> to login and register to volunteer and donate.</p>`,
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
    subject: "New Volunteer Registration",
    text: `${req.body.firstName} ${req.body.lastName} has successfully made an account with Paso Robles Youth Arts Volunteering! Their contact email is: ${req.body.email}`,
    html: `<img width='500' src = cid:YouthArtsLogo /><br></br><p>${req.body.firstName} ${req.body.lastName} created an account with <a href='https://youtharts-volunteer.h4i-cp.org/'>Paso Robles Youth Arts Volunteering<a>. <br></br>Their contact email is: ${req.body.email}.</p>`,
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
      res.send(info);
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
  // res.send(newVolunteer);
});

const postNewVolunteerTask = async (
  task,
  description,
  start,
  end,
  donated,
  oppId,
  volId,
  business
) => {
  const taskObj = {
    task,
    start,
    end,
    description,
    donated,
  };
  console.log(start);

  const opportunity = await Opportunity.findById(oppId);

  try {
    const volList = opportunity.volunteers.get(volId);
    volList.push(taskObj);
    opportunity.volunteers.set(volId, volList);
  } catch {
    if (opportunity.volunteers === undefined) {
      opportunity.volunteers = {};
    }
    opportunity.volunteers.set(volId, taskObj);
  }
  console.log(opportunity.volunteers);

  const newOpportunity = await Opportunity.findByIdAndUpdate(oppId, {
    volunteers: opportunity.volunteers,
  });
  console.log("OPPORTUNITIY UPDATED");
  console.log(newOpportunity);
  console.log(newOpportunity.volunteers);

  const volunteer = await Volunteer.findById(volId);

  try {
    const oppList = volunteer.opportunities.get(oppId);
    oppList.push(taskObj);
    volunteer.opportunities.set(oppId, oppList);
  } catch {
    if (volunteer.opportunities === undefined) {
      volunteer.opportunities = {};
    }
    volunteer.opportunities.set(oppId, taskObj);
  }

  await Volunteer.findByIdAndUpdate(volId, {
    opportunities: volunteer.opportunities,
  });
  console.log("taskobj", taskObj);

  // Emails to confirm signup
  const volunteerMessage = {
    from: `${process.env.PASO_EMAIL}`,
    to: volunteer.email,
    subject: `${opportunity.title} sign up successful`,
    html:
      `<img width='500' src = cid:YouthArtsLogo /> <br></br> <p>Hello ${volunteer.firstName},<br></br> Thank you so much for your support! We'll be in touch with more information about the volunteer opportunity you selected. If you have any questions, please feel free to contact Paso Robles Youth Arts Foundation at 805-238-5825 or volunteer@pryoutharts.org` +
      `<br></br> You have successfully signed up for a volunteer session for ${
        opportunity.title
      } for the task ${taskObj.task} on ${moment(start[0])
        .subtract({ h: 7 })
        .format("MMMM Do, YYYY")} from ${moment(start[0])
        .subtract({ h: 7 })
        .format("hh:mm A")} to ${moment(end[0])
        .subtract({ h: 7 })
        .format("hh:mm A")}.</p><p>The event will be held at ${
        opportunity.location
      }.</p><p>Your business is: ${business}.<br></br><br></br>Click <a href='https://youtharts-volunteer.h4i-cp.org/'>here<a> or call this number (805-238-5825) to cancel your registration.`,
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
    subject: `${opportunity.title} sign up successful - ${volunteer.firstName} ${volunteer.lastName}`,
    html: `<img width='500' src = cid:YouthArtsLogo /> <br></br> <p>${
      volunteer.firstName
    } ${
      volunteer.lastName
    } has successfully signed up for a volunteer session for ${
      opportunity.title
    } for the task ${taskObj.task} on ${moment(start[0])
      .subtract({ h: 7 })
      .format("MMMM Do, YYYY")} from ${moment(start[0])
      .subtract({ h: 7 })
      .format("hh:mm A")} to ${moment(end[0])
      .subtract({ h: 7 })
      .format("hh:mm A")}.</p><p>Their business is: ${business}.</p><br></br>`,
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
      res.send(info);
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
};

router.post("/api/VolunteerTask", async (req, res) => {
  console.log(req.body);

  const { task } = req.body;
  const { description } = req.body;
  const { start } = req.body;
  const { end } = req.body;
  const { donated } = req.body;
  const { oppId } = req.body;
  const { volId } = req.body;
  const { business } = req.body;

  try {
    await postNewVolunteerTask(
      task,
      description,
      start,
      end,
      donated,
      oppId,
      volId,
      business
    );
    res.status(200).send(task);
  } catch (error) {
    res.status(401).send(error);
  }
});

export default router;
