import { useState } from "react";
import { ethers } from "ethers";
import FarmerRegistry from "../contracts/FarmerRegistry.json";

// frontend/src/components/FarmerRegistration.js
const CONTRACT_ADDRESS = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
export default function FarmerRegistration({ account }) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [crop, setCrop] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not detected");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, FarmerRegistry.abi, signer);

      const tx = await contract.registerFarmer(name, region, crop);
      await tx.wait();
      setStatus("✅ Farmer registered successfully!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>👨‍🌾 Farmer Registration</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <input placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} /><br />
      <input placeholder="Crop Type" value={crop} onChange={(e) => setCrop(e.target.value)} /><br />
      <button onClick={handleRegister}>Register Farmer</button>
      <p>{status}</p>
    </div>
  );
}
