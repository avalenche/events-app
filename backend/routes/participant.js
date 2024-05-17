const express = require("express");
const router = express.Router();

// Event Model
const Event = require("../models/Event");
// Participant Model
const Participant = require("../models/Participant");

// @route   POST api/events/register/:id
// @desc    Register for an event
router.post("/register/:id", async (req, res) => {
  const { fullName, email, dateOfBirth, referral } = req.body;
  const eventId = req.params.id;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Create a new participant
    const newParticipant = new Participant({
      fullName,
      email,
      dateOfBirth,
      referral,
      eventId, // Include the eventId in the participant data
    });

    // Save the participant to the database
    const participant = await newParticipant.save();

    res.json(participant); // Return the participant data as the response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
