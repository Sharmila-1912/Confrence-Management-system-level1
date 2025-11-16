import React, { useState } from "react";
import Certificate from "./certificate";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    topic: "",
  });

  const [showCertificate, setShowCertificate] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCertificate(true);
  };

  return (
    <div className="app-container">
      <h1>Paper Presentation Certificate Generator</h1>

      {!showCertificate ? (
        <form onSubmit={handleSubmit} className="certificate-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Paper Title:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />

          <button type="submit">Generate Certificate</button>
        </form>
      ) : (
        <Certificate name={formData.name} topic={formData.topic} />
      )}
    </div>
  );
}

export default App;
