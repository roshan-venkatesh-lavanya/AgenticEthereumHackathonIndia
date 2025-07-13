import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MilestoneManager from "../contracts/MilestoneManager.json";
import EscrowContract from "../contracts/EscrowContract.json";

const MILESTONE_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // ✅ Your updated address
const ESCROW_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";   // ✅ Your updated address

export default function FarmerDashboard({ account }) {
  const [milestones, setMilestones] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchMilestones();
  }, [account]);

  async function fetchMilestones() {
    if (!window.ethereum || !account) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const milestoneContract = new ethers.Contract(
      MILESTONE_ADDRESS,
      MilestoneManager.abi,
      provider
    );

    try {
      const result = await milestoneContract.getMilestones(account);
      const cleaned = result.map((m) => ({
        description: m.description,
        deadline: new Date(Number(m.deadline) * 1000).toLocaleDateString(),
        completed: m.completed,
      }));
      setMilestones(cleaned);
    } catch (err) {
      console.error("Error fetching milestones:", err);
      setMilestones([]);
    }
  }

  async function unlockInstallment(index) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const escrow = new ethers.Contract(ESCROW_ADDRESS, EscrowContract.abi, signer);

      const tx = await escrow.releaseInstallment(account, index);
      await tx.wait();

      setStatus(`💸 Installment for milestone ${index + 1} released.`);
      fetchMilestones(); // Refresh the milestone list
    } catch (err) {
      console.error("Unlocking error:", err);
      setStatus("❌ Error unlocking funds.");
    }
  }

  return (
    <div>
      <h2>👨‍🌾 Farmer Dashboard</h2>
      <p>Account: {account}</p>

      {milestones.length === 0 ? (
        <p>⚠️ Milestones not initialized yet. Please initialize below.</p>
      ) : (
        <ul style={{ marginTop: "20px" }}>
          {milestones.map((m, idx) => (
            <li key={idx}>
              <strong>{m.description}</strong> (Due: {m.deadline}) –{" "}
              {m.completed ? "✅ Done" : "🕒 Pending"}{" "}
              {!m.completed && (
                <button onClick={() => unlockInstallment(idx)}>Unlock Funds</button>
              )}
            </li>
          ))}
        </ul>
      )}

      {status && <p style={{ color: "lime", marginTop: "10px" }}>{status}</p>}
    </div>
  );
}
