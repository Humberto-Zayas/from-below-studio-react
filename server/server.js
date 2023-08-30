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
    const { name, email, phoneNumber, message, howDidYouHear, date, hours } = req.body;

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
      howDidYouHear,
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

    // Define the list of available hour blocks for confirmed bookings
    const availableHours = [
      "2 Hours/$70",
      "4 Hours/$130",
      "8 Hours/$270",
      "10 Hours/$340",
      "Full Day 14+ Hours/$550",
    ];

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

        // Check if the day's hours array is empty
        const hoursArrayIsEmpty = bookingDay.hours.length === 0;

        if (hoursArrayIsEmpty) {
          // If the hours array is empty, add all available hour blocks except the booked hour
          availableHours.forEach((hour) => {
            if (hour !== updatedBooking.hours) {
              bookingDay.hours.push({ hour, enabled: true });
            }
          });

          // Sort the hours array based on the specified order
          bookingDay.hours.sort((a, b) => {
            const hourA = availableHours.indexOf(a.hour);
            const hourB = availableHours.indexOf(b.hour);
            return hourA - hourB;
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

          // Sort the hours array based on the specified order
          bookingDay.hours.sort((a, b) => {
            const hourA = availableHours.indexOf(a.hour);
            const hourB = availableHours.indexOf(b.hour);
            return hourA - hourB;
          });

          await bookingDay.save();
        }
      }
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/bookings/datehour/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { date, hours } = req.body;

    // Check if the booking with the provided ID exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Get the old date and hours for the booking
    const oldDate = booking.date;
    const oldHours = booking.hours;

    // Update the booking's date and hours
    booking.date = date;
    booking.hours = hours;
    await booking.save();

    // Check if the old date exists in the Day collection
    const oldDateExists = await Day.exists({ date: oldDate });

    // If the old date exists, update its hours array
    if (oldDateExists) {
      const oldDay = await Day.findOne({ date: oldDate });

      // Enable the old hour block and add back the old hour block
      const matchingOldHour = oldDay.hours.find(
        (hourBlock) => hourBlock.hour.includes(oldHours)
      );
      if (matchingOldHour) {
        matchingOldHour.enabled = true;
      }
      oldDay.hours.push({ hour: oldHours, enabled: true });
      await oldDay.save();
    }

    // Check if the new date exists in the Day collection
    const newDateExists = await Day.exists({ date });

    if (newDateExists) {
      const newDay = await Day.findOne({ date });

      // Disable the corresponding hour block and add the new hour block
      const correspondingHour = newDay.hours.find(
        (hourBlock) => hourBlock.hour.includes(hours)
      );
      if (correspondingHour) {
        correspondingHour.enabled = false;
      }

      // Remove the old hour block from newDay.hours
      newDay.hours = newDay.hours.filter((hourBlock) => hourBlock.hour !== hours);

      // Enable the old hour block
      const matchingOldHour = newDay.hours.find(
        (hourBlock) => hourBlock.hour.includes(oldHours)
      );
      if (matchingOldHour) {
        matchingOldHour.enabled = true;
      }

      await newDay.save();
    } else {
      // If the new date doesn't exist, create a new Day entry
      const newHourBlock = {
        hour: hours,
        enabled: true,
      };
      await Day.create({ date, hours: [newHourBlock], disabled: false });
    }

    res.json({ message: "Booking updated successfully" });
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

    // Check if the booking has a date and the day's hours array is not empty
    if (booking.date && booking.hours) {
      // Find the existing day in the database
      const existingDay = await Day.findOne({ date: booking.date });

      if (existingDay) {
        // Extract the hour title from booking.hours
        const bookedHourParts = booking.hours.split('/');
        const bookedHourTitle = bookedHourParts[0].trim(); // Extract the hour title (e.g., "2 Hours")
        
        // Find the matching hour by comparing titles
        const matchingHour = existingDay.hours.find(
          (existingHour) => existingHour.hour.includes(bookedHourTitle)
        );

        if (matchingHour) {
          matchingHour.enabled = true; // Enable the booked hour
        } else {
          // If the matching hour doesn't exist, add it to the existingDay.hours array
          const newHour = {
            hour: booking.hours, // Use the entire booking.hours string
            enabled: true
          };
          existingDay.hours.push(newHour);
        }

        // Hour options array in the desired order
        const hourOptions = [
          "2 Hours/$70",
          "4 Hours/$130",
          "8 Hours/$270",
          "10 Hours/$340",
          "Full Day 14+ Hours/$550",
        ];

        // Sort the hours array based on the custom order defined in hourOptions
        existingDay.hours.sort((a, b) => {
          const aIndex = hourOptions.indexOf(a.hour);
          const bIndex = hourOptions.indexOf(b.hour);
          return aIndex - bIndex;
        });

        await existingDay.save();
      }
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
