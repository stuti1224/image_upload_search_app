const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images) from /public
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/upload", upload.single("image"), (req, res) => {
    const name = req.query.name?.toLowerCase();
    if (!name) return res.status(400).json({ error: "Missing name param" });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
    const fs = require("fs");
    let ext = path.extname(req.file.originalname).toLowerCase();
    if (!ext) ext = ".jpg";
  
    const savePath = path.join(__dirname, "public", name + ext);
  
    fs.writeFile(savePath, req.file.buffer, (err) => {
      if (err) return res.status(500).json({ error: "Failed to save file" });
      res.json({ success: true, filename: name + ext });
    });
  });
  
// basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
