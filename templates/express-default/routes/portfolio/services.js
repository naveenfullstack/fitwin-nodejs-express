const express = require("express");
const router = express.Router();
const Services = require("../../models/portfolio/services");
//const requireLogin = require("../../middlewares/auth")

router.post("/addservice", async (req, res) => {
  try {
    const { titile, discription, icon, image, button_text } = req.body;

    // Check if the project is already taken
    const existingProject = await Services.findOne({ titile });
    if (existingProject) {
      return res.status(409).json({ error: "Service already exists" });
    }

    // Create a new user with the encrypted password
    const newServices = new Services({
      titile,
      discription,
      icon,
      image,
      button_text,
    });
    await newServices.save();

    res.status(200).json({
      success: "true",
      message: "Service Added successfully",
      //mail: "Account created Mail Has Been Sent Via SendGrid",
      newServices,
    });
  } catch (error) {
    console.error("Error adding a Service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/editservice/:id", async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { titile, discription, icon, image, button_text } = req.body;

    // Find the project by ID and update its details
    const updatedService = await Services.findByIdAndUpdate(
      serviceId,
      { titile, discription, icon, image, button_text },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteservices/:id", async (req, res) => {
  try {
    const servicesId = req.params.id;

    // Find the project by ID and delete it
    const deletedService = await Services.findByIdAndDelete(servicesId);

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getservices", (req, res) => {
  Services.find()
    .then((Services) => {
      res.json({
        success: "true",
        Data: Services,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving services" });
    });
});

module.exports = router;
