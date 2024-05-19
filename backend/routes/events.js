const express = require("express");
const router = express.Router();

// Event & Participant Models
const Event = require("../models/Event");
const Participant = require("../models/Participant");

// @route   GET api/events
router.get("/", async (req, res) => {
  const {
    pageSize = 10,
    currentPage = 1,
    sortBy = "title",
    sortOrder = "asc",
  } = req.query;

  const sortOptions = {};
  sortOptions[sortBy] = sortOrder;
  try {
    const pageSizeInt = parseInt(pageSize);
    const currentPageInt = parseInt(currentPage);

    const skip = pageSize * (currentPage - 1);

    const events = await Event.find()
      .sort(sortOptions)
      .limit(pageSizeInt)
      .skip(skip)
      .exec();

    const itemCount = await Event.countDocuments();

    const pageCount = Math.ceil(itemCount / pageSizeInt);

    const response = {
      meta: {
        totalEvents: itemCount,
        pageCount,
        currentPage: currentPageInt,
        pageSize: pageSizeInt,
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

module.exports = router;
