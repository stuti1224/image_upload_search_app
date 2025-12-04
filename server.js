const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
