const express = require("express");
const router = express.Router();
const { Day, Availability } = require("../models"); // Import the necessary models

router.get("/days", async (req, res) => {
  try {
    const days = await Day.find();
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blackoutDays", async (req, res) => {
  try {
    const blackoutDays = await Day.find({ disabled: true });
    res.json(blackoutDays);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/days/:date", async (req, res) => {
  try {
    const day = await Day.findOne({ date: req.params.date });
    if (day) {
      res.json(day);
    } else {
      res.status(404).json({ error: "Day not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

router.post("/days", async (req, res) => {
  try {
    const checkDate = await Day.findOne({ date: req.body.date });
    if (!checkDate) {
      const date = await Day.create(req.body);
      res.json(date);
    } else {
      throw new Error("Date already exists");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/editDay", async (req, res) => {
  try {
    const { date, disabled } = req.body;

    let existingDay = await Day.findOne({ date });

    if (!existingDay) {
      existingDay = await Day.create({ date, disabled, hours: [] }); // Initialize hours array for new day
    } else {
      existingDay.disabled = disabled;
      
      // Remove hours if the day is disabled
      if (disabled) {
        existingDay.hours = [];
      }

      await existingDay.save();
    }

    res.json(existingDay);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/updateOrCreateDay", async (req, res) => {
  try {
    const { date, selectedHours } = req.body; // Assuming selectedHours is an array of selected hour options

    // Check if the day exists
    const existingDay = await Day.findOne({ date });

    if (existingDay) {
      // If the day exists, update the hours
      existingDay.hours = selectedHours;

      // Enable the day if it's disabled
      if (existingDay.disabled) {
        existingDay.disabled = false;
      }

      await existingDay.save();
      res.json(existingDay);
    } else {
      // If the day doesn't exist, create a new day with hours and disabled set to false
      const newDay = await Day.create({
        date,
        hours: selectedHours,
        disabled: false,
      });
      res.json(newDay);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/getMaxDate", async (req, res) => {
  try {
    const availability = await Availability.findOne();
    if (availability) {
      res.json({ maxDate: availability.maxDate });
    } else {
      res.status(404).json({ error: "Max date not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/updateMaxDate", async (req, res) => {
  try {
    const { maxDate } = req.body;

    let availability = await Availability.findOne();

    if (!availability) {
      availability = await Availability.create({ maxDate });
    } else {
      availability.maxDate = maxDate;
      await availability.save();
    }

    res.json(availability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;