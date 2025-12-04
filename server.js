const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images) from /public
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/getImage", (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (!name) {
      return res.status(400).json({ error: "name query missing" });
    }
    const fs = require("fs");
  const publicPath = path.join(__dirname, "public");

  // Try common image extensions
  const extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  for (const ext of extensions) {
    const filepath = path.join(publicPath, name + ext);
    if (fs.existsSync(filepath)) {
      return res.json({ filename: name + ext });
    }
  }

  return res.status(404).json({ error: "Image not found" });
});
// basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
