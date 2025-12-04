const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images) from /public
app.use(express.static(path.join(__dirname, "public")));

// basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
