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

    // Check if the corresponding Day record exists
    const checkDate = await Day.findOne({ date });
    if (!checkDate) {
      // If the Day record doesn't exist, create it with the required fields
      await Day.create({ date, disabled: false }); // Provide the required fields
    }

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

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    // Update the booking status in the database
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (status === "confirmed") {
      // Find the day associated with the booking's date
      const bookingDay = await Day.findOne({ date: updatedBooking.date });

      if (bookingDay) {
        // Remove the hour block from the day's hours array
        bookingDay.hours = bookingDay.hours.filter(
          (hourBlock) => hourBlock.hour !== updatedBooking.hours
        );

        // Get the list of available hour blocks for confirmed bookings
        const availableHours = [
          "2 Hours/$70",
          "4 Hours/$130",
          "8 Hours/$270",
          "10 Hours/$340",
          "Full Day 14+ Hours/$550",
        ];

        // Check if the day's hours array is empty
        const hoursArrayIsEmpty = bookingDay.hours.length === 0;

        if (hoursArrayIsEmpty) {
          // If the hours array is empty, add all available hour blocks except the booked hour
          availableHours.forEach((hour) => {
            if (hour !== updatedBooking.hours) {
              bookingDay.hours.push({ hour, enabled: true });
            }
          });
        }

        await bookingDay.save();
      }
    } else if (status === "denied") {
      // Find the day associated with the booking's date
      const bookingDay = await Day.findOne({ date: updatedBooking.date });

      if (bookingDay) {
        // Check if the denied hour block already exists in the day's hours array
        const deniedHourExists = bookingDay.hours.some(
          (hourBlock) => hourBlock.hour === updatedBooking.hours
        );

        // If the denied hour doesn't exist, add it back to the day's hours array
        if (!deniedHourExists) {
          bookingDay.hours.push({ hour: updatedBooking.hours, enabled: true });
          await bookingDay.save();
        }
      }
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New route for deleting a booking by ID
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Find the booking by its ID in the database
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: "Booking deleted successfully" });
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
