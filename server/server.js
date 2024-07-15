const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const DATABASE_URL =
  "mongodb+srv://dheeraj:5VCvNUiJIkjoVIUa@cluster0.0te3dg9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/bot";
mongoose.connect(DATABASE_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Register Endpoint
app.post("/register", async (req, res) => {
  const { name, email1, phone, pwd1, pwd2 } = req.body;

  // Basic validation
  if (!name || !email1 || !phone || !pwd1 || !pwd2) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (pwd1 !== pwd2) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const userExists = await User.findOne({ email: email1 });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User({ name, email: email1, phone, password: pwd1 });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email1, pwd1 } = req.body;

  // Basic validation
  if (!email1 || !pwd1) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  try {
    const user = await User.findOne({ email: email1 });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = pwd1 === user.password;
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    res
      .status(200)
      .json({ message: "Login successful", status: true, user: user });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
