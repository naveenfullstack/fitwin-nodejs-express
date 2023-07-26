const express = require("express");
const router = express.Router();
const Clients = require("../../models/portfolio/clients");
//const requireLogin = require("../../middlewares/auth")

router.post("/addclient", async (req, res) => {
  try {
    const { name, discription, button_text, button_url, thumnail, image } = req.body;

    // Check if the project is already taken
    const existingClient = await Clients.findOne({ name });
    if (existingClient) {
      return res.status(409).json({ error: "Client already exists" });
    }

    // Create a new user with the encrypted password
    const newClients = new Clients({
        name,
        discription,
        button_text,
        button_url,
        thumnail,
        image,
    });
    await newClients.save();

    res.status(200).json({
      success: "true",
      message: "Client Added successfully",
      //mail: "Account created Mail Has Been Sent Via SendGrid",
      newClients,
    });
  } catch (error) {
    console.error("Error adding a Service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/editclients/:id", async (req, res) => {
  try {
    const clientId = req.params.id;
    const { 
        name,
        discription,
        button_text,
        button_url,
        thumnail,
        image,
    } = req.body;

    // Find the project by ID and update its details
    const updatedClient = await Clients.findByIdAndUpdate(
      clientId,
      {  name,
        discription,
        button_text,
        button_url,
        thumnail,
        image, },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res
      .status(200)
      .json({
        message: "Service updated successfully",
        service: updatedClient,
      });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/deleteclient/:id', async (req, res) => {
    try {
      const clientId = req.params.id;
  
      // Find the project by ID and delete it
      const deletedClient = await Clients.findByIdAndDelete(clientId);
  
      if (!deletedClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
  
      res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/getclients', (req, res) => {
    Clients.find()
      .then((Clients) => {
        res.json(Clients);
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred while retrieving services' });
      });
  });

module.exports = router;
