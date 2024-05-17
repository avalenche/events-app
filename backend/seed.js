// seed.js
const mongoose = require("mongoose");
const Event = require("./models/Event");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/eventsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Insert sample events
    await Event.insertMany([
      {
        title: "Event 1",
        description: "Description of event 1",
        date: new Date("2024-05-20"),
        organizer: "Organizer 1",
      },
      {
        title: "Event 2",
        description: "Description of event 2",
        date: new Date("2024-05-25"),
        organizer: "Organizer 2",
      },
      {
        title: "Event 3",
        description: "Description of event 1",
        date: new Date("2024-05-20"),
        organizer: "Organizer 1",
      },
      {
        title: "Event 4",
        description: "Description of event 2",
        date: new Date("2024-05-25"),
        organizer: "Organizer 2",
      },
      {
        title: "Event 5",
        description: "Description of event 1",
        date: new Date("2024-05-20"),
        organizer: "Organizer 1",
      },
      {
        title: "Event 6",
        description: "Description of event 2",
        date: new Date("2024-05-25"),
        organizer: "Organizer 2",
      },
      {
        title: "Event 7",
        description: "Description of event 1",
        date: new Date("2024-05-20"),
        organizer: "Organizer 1",
      },
      {
        title: "Event 8",
        description: "Description of event 2",
        date: new Date("2024-05-25"),
        organizer: "Organizer 2",
      },
      // Add more events as needed
    ]);

    console.log("Data inserted successfully");

    // Disconnect from MongoDB
    mongoose.disconnect();
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
