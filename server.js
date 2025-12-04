const express = require("express");
const cors = require("cors");
const app = require("path");

const app = express();
app.use(cors());

// Serve static files (images) from /public
app.use(express.static(path.join(__dirname, "public")));

// basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
