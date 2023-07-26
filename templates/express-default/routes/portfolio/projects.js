const express = require("express");
const router = express.Router();
const Projects = require("../../models/portfolio/projects");
//const requireLogin = require("../../middlewares/auth")
const header = require("../../middlewares/header")
//const signupMail = require('@sendgrid/mail');
//signupMail.setApiKey(process.env.SENDGRID_KEY);


router.post("/addprojects", async (req, res) => {
// router.post("/addprojects", requireLogin, async (req, res) => {
  try {
    const { project_name, project_description, hours_spent, started_date, end_date } = req.body;

    // Check if the project is already taken
    const existingProject = await Projects.findOne({ project_name });
    if (existingProject) {
      return res.status(409).json({ error: "project already exists" });
    }

    // Create a new user with the encrypted password
    const newProject = new Projects({ project_name, project_description, hours_spent, started_date, end_date });
    await newProject.save();

    // const msg = {
    //   to: email,
    //   from: {
    //     email: process.env.SENDING_EMAIL,
    //     name: process.env.COMPANY_NAME
    //   },
    //   subject: 'Welcome to Your App',
    //   text: 'Thank you for signing up!',
    //   html: '<h1>Welcome to Your App</h1><p>Thank you for signing up!</p>',
    // };

    // await signupMail.send(msg);

    res
      .status(200)
      .json({
        success: "true",
        message: "Project Added successfully",
        //mail: "Account created Mail Has Been Sent Via SendGrid",
        newProject
      });
  } catch (error) {
    console.error("Error adding a project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put('/editprojects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { project_name, project_description, hours_spent, started_date, end_date } = req.body;

    // Find the project by ID and update its details
    const updatedProject = await Projects.findByIdAndUpdate(projectId, { project_name, project_description, hours_spent, started_date, end_date }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/deleteprojects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project by ID and delete it
    const deletedProject = await Projects.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get("/getprojects", header, (req, res) => {
  Projects.find()
    .then((Projects) => {
      res.json({
        success: "true",
        Data: Projects,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving services" });
    });
});

module.exports = router;
