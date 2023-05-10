const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
router.use(express.json());

const Opportunity = require("../models/opportunity");
const Volunteer = require("../models/volunteer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
  logger: true,
});

const postDonationTask = async (task, start, end, donated, oppId, volId) => {
  const taskObj = {
    task,
    start,
    end,
    donated,
  };

  const opportunity = await Opportunity.findById(oppId);

  try {
    let volList = opportunity.volunteers.get(volId);
    let temp = volList;
    volList.forEach((item) => {
      if (item.task === "Donated") {
        console.log(item.task);
        temp = volList.filter((el) => el.task !== item.task);
      }
    });
    console.log("TEMP");
    console.log(temp);
    volList = temp;
    volList.push(taskObj);
    opportunity.volunteers.set(volId, volList);
  } catch {
    if (opportunity.volunteers === undefined) {
      opportunity.volunteers = {};
    }
    opportunity.volunteers.set(volId, taskObj);
  }
  await Opportunity.findByIdAndUpdate(oppId, {
    volunteers: opportunity.volunteers,
  });

  const volunteer = await Volunteer.findById(volId);

  try {
    let oppList = volunteer.opportunities.get(oppId);
    let temp = oppList;
    oppList.forEach((item) => {
      if (item.task === "Donated") {
        console.log(item.task);
        temp = oppList.filter((el) => el.task !== item.task);
      }
    });
    console.log("TEMP");
    console.log(temp);
    oppList = temp;
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
  console.log(taskObj.donated);

  // Emails to confirm signup
  const volunteerMessage = {
    from: `${process.env.PASO_EMAIL}`,
    to: volunteer.email,
    subject: `${opportunity.title} donation successful`,
    html:
      `<img width='500' src = cid:YouthArtsLogo /> <br></br> <p>Hello ${volunteer.firstName},<br></br> Thank you so much for your support! We'll be in touch with more information about your donation. If you have any questions, please feel free to contact Paso Robles Youth Arts Foundation at 805-238-5825 or volunteer@pryoutharts.org` +
      `<br></br> The volunteer opportunity you donated to is: ${
        opportunity.title
      } and the items are: ${taskObj.donated.join(
        ", "
      )}.<br></br><br></br>Click <a href='https://youtharts-volunteer.h4i-cp.org/'>here<a> to volunteer or donate again.</p>`,
    attachments: [
      {
        filename: "YouthArtsLogo.png",
        path: "https://pryac.s3-us-west-1.amazonaws.com/YouthArtsLogo.png",
        cid: "YouthArtsLogo",
      },
    ],
  };
  // admin email
  const adminMessage = {
    from: `${process.env.PASO_EMAIL}`,
    to: `${process.env.PASO_EMAIL}`,
    subject: `${opportunity.title} donation successful - ${volunteer.firstName} ${volunteer.lastName}`,
    html:
      `<img width='500' src = cid:YouthArtsLogo /> <br></br> <p>${
        volunteer.firstName
      } ${volunteer.lastName} has signed up to donate ${taskObj.donated.join(
        ", "
      )} to the event ${opportunity.title}. ` +
      `</br>\n Their contact email is: ${volunteer.email} </p><br></br>`,
    attachments: [
      {
        filename: "YouthArtsLogo.png",
        path: "https://pryac.s3-us-west-1.amazonaws.com/YouthArtsLogo.png",
        cid: "YouthArtsLogo",
      },
    ],
  };
  console.log(adminMessage);

  transport.sendMail(volunteerMessage, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  transport.sendMail(adminMessage, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

router.post("/api/donations", async (req, res) => {
  const { task } = req.body;
  const { start } = req.body;
  const { end } = req.body;
  const { donated } = req.body;
  const { oppId } = req.body;
  const { volId } = req.body;

  try {
    await postDonationTask(task, start, end, donated, oppId, volId);
    console.log("testing");
    res.status(200);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
