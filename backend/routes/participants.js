const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Participant = require("../models/Participant");

// Register for an event
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

// Search participants
router.get("/search", async (req, res) => {
  const { query, eventId } = req.query;

  try {
    const participants = await Participant.find({
      eventId,
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.json(participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
