const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api/events", require("./routes/events"));
app.use("/api/participants", require("./routes/participants"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/eventsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
