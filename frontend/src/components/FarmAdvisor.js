import React, { useState } from "react";

function FarmAdvisor() {
  const [crop, setCrop] = useState("");
  const [phase, setPhase] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, phase }),
      });

      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdvice("Error fetching advice.");
    }
  };

  return (
    <div style={{ textAlign: "left", marginTop: "2rem" }}>
      <h2>🤖 Farm Advisor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Crop (e.g., rice)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phase (e.g., sowing)"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          required
        />
        <button type="submit">Get Advice</button>
      </form>

      {advice && (
        <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
          📢 Advice: {advice}
        </div>
      )}
    </div>
  );
}

export default FarmAdvisor;
