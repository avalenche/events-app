// routes/events.js
const express = require("express");
const router = express.Router();

// Event Model
const Event = require("../models/Event");
const Participant = require("../models/Participant");

// @route   GET api/events
// @desc    Get all events
router.get("/", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size is 10 if not provided
    const currentPage = parseInt(req.query.page) || 1; // Default current page is 1 if not provided

    const skip = pageSize * (currentPage - 1);

    const events = await Event.find().limit(pageSize).skip(skip).exec();

    const itemCount = await Event.countDocuments();

    const pageCount = Math.ceil(itemCount / pageSize);

    const response = {
      meta: {
        totalEvents: itemCount,
        pageCount,
        currentPage,
        pageSize,
        hasNextPage: currentPage < pageCount,
        hasPreviousPage: currentPage > 1,
      },
      data: events,
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const participants = await Participant.find({ eventId });
    const response = {
      ...event,
      participants,
    };

    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add more routes for CRUD operations as needed

module.exports = router;
