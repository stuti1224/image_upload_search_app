const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (images) from /public
app.use(express.static(path.join(__dirname, "public")));

// Upload image endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  const name = req.query.name?.toLowerCase();
  if (!name) return res.status(400).json({ error: "Missing name param" });
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const ext = path.extname(req.file.originalname).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".gif"];
  
  if (!allowed.includes(ext)) {
    return res.status(400).json({ error: "Invalid file type" });
  }

  const savePath = path.join(__dirname, "public", name + ext);

  fs.writeFile(savePath, req.file.buffer, (err) => {
    if (err) {
      console.error("Save error:", err);
      return res.status(500).json({ error: "Failed to save file" });
    }
    console.log(`Image saved: ${name + ext}`);
    res.json({ success: true, filename: name + ext });
  });
});

// Get image endpoint
app.get("/api/getImage", (req, res) => {
  const name = req.query.name?.toLowerCase();
  console.log("===== GET IMAGE REQUEST =====");
  console.log("Searching for:", name);
  
  if (!name) {
    console.log("ERROR: Missing name parameter");
    return res.json({ error: "Missing name" });
  }

  const folder = path.join(__dirname, "public");
  console.log("Public folder path:", folder);

  try {
    const files = fs.readdirSync(folder);
    console.log("Files in public folder:", files);
    
    const match = files.find((f) => {
      const matches = f.toLowerCase().startsWith(name);
      console.log(`Checking ${f}: ${matches}`);
      return matches;
    });
    
    console.log("Final match found:", match);
    console.log("=============================");

    if (match) {
      return res.json({ filename: match });
    } else {
      return res.json({ filename: null });
    }
  } catch (err) {
    console.error("Read error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3001`);
  console.log(`Make sure your React app is running on port 3000`);
});