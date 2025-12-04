import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [file, setFile] = useState(null);

  const backend = "http://localhost:3001";

  // search function - use searchName, not uploadName
  const searchImage = async () => {
    if (!searchName) {
      alert("Please enter a name");
      return;
    }

    setLoading(true);

    try {
      // Use searchName here, NOT uploadName
      const res = await fetch(`${backend}/api/getImage?name=${searchName}`);
      const data = await res.json();
      setLoading(false);

      if (data.filename) {
        setImgSrc(`${backend}/${data.filename}?t=${Date.now()}`);
      } else {
        setImgSrc("");
        alert("Image not found");
      }
    } catch (err) {
      setLoading(false);
      console.error("Search error:", err);
      alert("Error connecting to backend");
    }
  };

  // upload function
  const uploadImage = async () => {
    if (!uploadName || !file) {
      alert("Enter a name and pick a file first");
      return;
    }

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch(
        `${backend}/api/upload?name=${uploadName}`,
        {
          method: "POST",
          body: form
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(`Image uploaded successfully as ${data.filename}!`);
        // Optionally auto-refresh the search
        setSearchName(uploadName);
        setImgSrc(`${backend}/${data.filename}?t=${Date.now()}`);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload error occurred: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Image Management System</h1>
      
      {/* Search Section */}
      <div style={{ marginBottom: 40, padding: 20, border: "1px solid #ccc" }}>
        <h2>Search Image</h2>
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter name (e.g., tom, jerry, dog)"
          style={{ padding: 8, width: 250, marginRight: 10 }}
        />
        <button onClick={searchImage} style={{ padding: 8 }}>
          Search
        </button>

        {loading && <p>Loading...</p>}

        <div style={{ marginTop: 20 }}>
          {imgSrc ? (
            <img src={imgSrc} width="300" alt="searched" style={{ border: "2px solid #333" }} />
          ) : (
            <p>No image to display</p>
          )}
        </div>
      </div>

      {/* Upload Section */}
      <div style={{ padding: 20, border: "1px solid #ccc" }}>
        <h2>Upload / Replace Image</h2>
        <div style={{ marginBottom: 10 }}>
          <input
            placeholder="Enter name (e.g., tom, jerry, dog)"
            value={uploadName}
            onChange={(e) => setUploadName(e.target.value)}
            style={{ padding: 8, width: 250 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </div>

        <button onClick={uploadImage} style={{ padding: 8 }}>
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default App;