require("dotenv").config();
const { User, Message, Day, Availability, Booking } = require("./models");
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { json } = require("body-parser");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;
const daysRoutes = require('./api/daysRoutes');
const usersRoutes = require('./api/usersRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.use('/api', usersRoutes);
app.use('/api', daysRoutes);

// New route for booking
app.post("/api/bookings", async (req, res) => {
  try {
    // Extract booking details from the request body
    const { name, email, phoneNumber, message, howHeard, date, hours } = req.body;    
    // Create a new booking record in the database
    const booking = await Booking.create({
      name,
      email,
      phoneNumber,
      message,
      howHeard,
      date,
      hours,
      status: 'unconfirmed', // Initial status
    });

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New route for retrieving bookings
app.get("/api/bookings", async (req, res) => {
  try {
    // Retrieve all bookings from the database
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// New route for retrieving a specific booking by ID
app.get("/api/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Retrieve the booking by its ID from the database
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`App is accessible at http://localhost:${PORT}`);
  });
});
