import { useState } from "react";
import { ethers } from "ethers";
import MilestoneManager from "../contracts/MilestoneManager.json";

const MILESTONE_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // ✅ Replace with your deployed address

export default function MilestoneInitializer({ account }) {
  const [milestones, setMilestones] = useState([
    { description: "", deadline: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { description: "", deadline: "" }]);
  };

  const submitMilestones = async () => {
    if (!window.ethereum || !account) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(MILESTONE_ADDRESS, MilestoneManager.abi, signer);

      for (const m of milestones) {
        const desc = m.description;
        const deadlineDate = new Date(m.deadline);
        const unixDeadline = Math.floor(deadlineDate.getTime() / 1000); // Convert to UNIX timestamp
        const tx = await contract.initializeMilestone(account, desc, unixDeadline);
        await tx.wait();
      }

      alert("Milestones initialized successfully!");
    } catch (err) {
      console.error(err);
      alert("Error initializing milestones.");
    }
  };

  return (
    <div>
      <h2>📌 Initialize Milestones</h2>
      {milestones.map((m, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          <input
            placeholder="Milestone Description"
            value={m.description}
            onChange={(e) => handleChange(idx, "description", e.target.value)}
          />
          <input
            type="date"
            value={m.deadline}
            onChange={(e) => handleChange(idx, "deadline", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addMilestone}>+ Add Milestone</button>
      <button onClick={submitMilestones}>✅ Submit Milestones</button>
    </div>
  );
}
