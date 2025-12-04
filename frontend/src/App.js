import React, { useState } from "react";

function App() {
  //all states
  const [searchName, setSearchName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [file, setFile] = useState(null);

  const backend = "http://localhost:3001";

  // search function
  const searchImage = async () => {
    if (!searchName) {
      alert("Please enter a name");
      return;
    }

    const res = await fetch(`${backend}/api/getImage?name=${searchName}`);
    const data = await res.json();

    if (data.filename) {
      setImgSrc(`${backend}/${data.filename}`);
    } else {
      setImgSrc("");
      alert("Image not found");
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

      {/* UI section for image uploading */}

      <hr />
      <h2>Upload / Replace Image</h2>

      <input
        placeholder="Enter name e.g. tom"
        value={uploadName}
        onChange={(e) => setUploadName(e.target.value)}
      />

      <br /><br />

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={uploadImage}>Upload</button>

    </div>
  );
}

export default App;
