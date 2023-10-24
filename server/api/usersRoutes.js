const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/auth");
const { User, Message, Day, Availability } = require("../models");

router.get("/me", authMiddleware, async (req, res) => {
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

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-__v -password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/:username", async (req, res) => {
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

router.post("/editUser", authMiddleware, async (req, res) => {
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

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.isCorrectPassword(password))) {
//       throw new AuthenticationError("Incorrect credentials");
//     }
//     const token = signToken(user);
//     res.json({ token, user });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });


module.exports = router;
