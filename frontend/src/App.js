import React, { useState } from "react";

function App() {
  const [searchName, setSearchName] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Search Image</h2>

      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Enter name e.g. tom"
      />

      <button>Search</button>

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
