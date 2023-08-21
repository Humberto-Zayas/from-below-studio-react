require("dotenv").config();
const { User, Message, Day } = require("./models");
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    if (req.user) {
      const userData = await User.findOne({ _id: req.user._id }).select("-__v -password");
      res.json(userData);
    } else {
      throw new AuthenticationError("Not logged in");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-__v -password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-__v -password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/days", async (req, res) => {
  try {
    const days = await Day.find();
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/blackoutDays", async (req, res) => {
  try {
    const blackoutDays = await Day.find({ disabled: true });
    res.json(blackoutDays);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/days/:date", async (req, res) => {
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

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

app.post("/api/editUser", authMiddleware, async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true }
      );
      const token = signToken(user);
      res.json({ token, user });
    } else {
      throw new AuthenticationError("You need to be logged in!");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
      throw new AuthenticationError("Incorrect credentials");
    }
    const token = signToken(user);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post("/api/days", async (req, res) => {
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

app.post("/api/editDay", async (req, res) => {
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


app.post("/api/updateOrCreateDay", async (req, res) => {
  try {
    const { date, selectedHours } = req.body; // Assuming selectedHours is an array of selected hour options

    // Check if the day exists
    const existingDay = await Day.findOne({ date });

    if (existingDay) {
      // If the day exists, update the hours
      const updatedDay = await Day.findOneAndUpdate(
        { date },
        { $set: { hours: selectedHours } },
        { new: true }
      );
      res.json(updatedDay);
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

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`App is accessible at http://localhost:${PORT}`);
  });
});
