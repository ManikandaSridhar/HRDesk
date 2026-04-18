const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();


app.use(cors());
app.use(express.json());


console.log("STARTED SERVER 🚀");
console.log("ENV 👉", process.env.MONGO_URI);


if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}


connectDB();


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employees");


app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend working ✅" });
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});


app.use((err, req, res, next) => {
  console.error("ERROR 💥", err);
  res.status(500).json({ message: "Server error ❌" });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});