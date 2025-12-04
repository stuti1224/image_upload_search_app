import React, { useState } from "react";

function App() {
  const [searchName, setSearchName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [file, setFile] = useState(null);


  const backend = "http://localhost:3001";

  const searchImage = async () => {
    if (!searchName) {
      alert("Please enter a name");
      return;
    }

    const uploadImage = async () => {
      if (!uploadName || !file) {
        alert("Enter a name and pick a file first");
        return;
      }
    
      const form = new FormData();
      form.append("image", file);

      const res = await fetch(
        `${backend}/api/upload?name=${uploadName}`,
        {
          method: "POST",
          body: form
        }
      );
    
      const data = await res.json();
    
      if (data.success) {
        alert("Image uploaded successfully!");
      } else {
        alert("Upload failed");
      }
    };
    

    const res = await fetch(`${backend}/api/getImage?name=${searchName}`);
    const data = await res.json();

    if (data.filename) {
      setImgSrc(`${backend}/${data.filename}`);
    } else {
      setImgSrc("");
      alert("Image not found");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Image</h2>

      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Enter name e.g. tom"
      />

      <button onClick={searchImage}>Search</button>

      <div style={{ marginTop: 20 }}>
        {imgSrc ? (
          <img src={imgSrc} width="300" alt="searched" />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
}

export default App;
