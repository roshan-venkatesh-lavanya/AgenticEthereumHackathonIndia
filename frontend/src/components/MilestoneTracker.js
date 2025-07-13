import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MilestoneManager from "../contracts/MilestoneManager.json";

const CONTRACT_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // ← Replace with YOUR deployed address

const phaseNames = ["Soil Prep", "Sowing", "Irrigation", "Fertilizing", "Harvest"];

export default function MilestoneTracker({ account }) {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    async function fetchMilestones() {
      if (!window.ethereum || !account) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MilestoneManager.abi, provider);
      try {
        const data = await contract.getMilestones(account);
        const cleaned = data.map((m) => ({
          phase: Number(m.phase),
          completed: m.completed,
        }));
        setMilestones(cleaned);
      } catch (err) {
        console.error("❌ Error fetching milestones:", err);
      }
    }

    fetchMilestones();
  }, [account]);

  return (
    <div>
      <h2>🌱 Crop Progress</h2>
      <ul>
        {milestones.map((m, idx) => (
          <li key={idx}>
            {phaseNames[m.phase]}: {m.completed ? "✅ Completed" : "⏳ Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}
