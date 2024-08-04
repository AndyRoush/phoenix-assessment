const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const ownerRoutes = require("./routes/owner");
const landHoldingRoutes = require("./routes/landholding");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect to my MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error(
    "MongoDB URI is not defined. Set the MONGO_URI environment variable."
  );
  process.exit(1);
}
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// app.use(express.static(path.join(__dirname, "../build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.use("/api/auth", authRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/landholdings", landHoldingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
