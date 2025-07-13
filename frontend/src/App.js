import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import FarmerRegistration from "./components/FarmerRegistration";
import MilestoneTracker from "./components/MilestoneTracker";
import FarmerDashboard from "./components/FarmerDashboard";
import MilestoneInitializer from "./components/MilestoneInitializer";

// 🌾 Smart Farm Advisor Component
function FarmAdvisorUI() {
  const [crop, setCrop] = useState("rice");
  const [phase, setPhase] = useState("soilprep");
  const [advice, setAdvice] = useState("");
  const [showAdvice, setShowAdvice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/farm-advice", {
        crop,
        phase,
      });
      setAdvice(res.data.advice);
      setShowAdvice(true);
    } catch (err) {
      console.error("Error fetching advice:", err);
      setAdvice("❌ Failed to fetch advice.");
      setShowAdvice(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f0fff0",
        padding: "2rem",
        borderRadius: "20px",
        marginTop: "2rem",
        width: "90%",
        maxWidth: "640px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          color: "#1a3e2e",
          fontSize: "1.8rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        🌾 Smart Farm Advisor
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label style={{ fontWeight: "600", color: "#333" }}>
          Crop:
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            style={{ marginLeft: "1rem", padding: "0.4rem" }}
          >
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
            <option value="maize">Maize</option>
            <option value="millets">Millets</option>
            <option value="pulses">Pulses</option>
            <option value="chickpea">Chickpea</option>
            <option value="lentil">Lentil</option>
            <option value="blackgram">Blackgram</option>
            <option value="cotton">Cotton</option>
            <option value="sugarcane">Sugarcane</option>
          </select>
        </label>

        <label style={{ fontWeight: "600", color: "#333" }}>
          Phase:
          <select
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            style={{ marginLeft: "1rem", padding: "0.4rem" }}
          >
            <option value="soilprep">Soil Preparation</option>
            <option value="sowing">Sowing</option>
            <option value="irrigation">Irrigation</option>
            <option value="fertilizing">Fertilizing</option>
            <option value="harvest">Harvest</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#1a3e2e",
            color: "white",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Get Advice
        </button>
      </form>

      {showAdvice && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem 1.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            color: "#222",
            lineHeight: "1.6",
          }}
        >
          <strong>Advice:</strong>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
}

// 🌱 Main dApp Component
function App() {
  const [account, setAccount] = useState(null);
  const [networkError, setNetworkError] = useState("");

  // Function to add/switch to Hardhat network
  async function addHardhatNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x7A69', // 31337 in hex
          chainName: 'Hardhat Local',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: ['http://127.0.0.1:8545'],
          blockExplorerUrls: null
        }]
      });
    } catch (error) {
      console.error('Failed to add Hardhat network:', error);
    }
  }

  // Function to check if we're on the correct network
  async function checkNetwork() {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const chainIdDecimal = parseInt(chainId, 16);
        
        console.log('Current Chain ID:', chainId, 'Decimal:', chainIdDecimal); // Debug log
        
        // Check for Hardhat chain ID (31337) - be more flexible with formats
        if (chainIdDecimal === 31337) {
          setNetworkError("");
          return true;
        } else {
          setNetworkError("⚠️ Please switch to Hardhat Local network (Chain ID: 31337)");
          return false;
        }
      } catch (error) {
        console.error('Error checking network:', error);
        setNetworkError("");
        return false;
      }
    }
    return false;
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        // Check if we're on the correct network first
        const isCorrectNetwork = await checkNetwork();
        
        if (!isCorrectNetwork) {
          // If not on correct network, try to add/switch to Hardhat network
          await addHardhatNetwork();
          // Check again after trying to add
          await checkNetwork();
        }

        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        
        // Final network check after connection
        await checkNetwork();
      } catch (err) {
        console.error("Wallet connection error", err);
        if (err.code === 4001) {
          alert("Connection rejected by user");
        } else if (err.code === -32002) {
          alert("MetaMask is already processing a request. Please wait.");
        } else {
          alert("Failed to connect wallet. Make sure MetaMask is installed and unlocked.");
        }
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  // Listen for network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
        } else {
          setAccount(accounts[0]);
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('chainChanged');
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  useEffect(() => {
    async function checkWalletConnection() {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await checkNetwork();
        }
      }
    }
    checkWalletConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌿 Pay-as-you-Grow dApp</h1>
        
        {networkError && account && (
          <div style={{ 
            color: '#ff6b6b', 
            backgroundColor: '#ffe0e0', 
            padding: '10px', 
            borderRadius: '8px', 
            margin: '10px 0',
            border: '1px solid #ff9999'
          }}>
            {networkError}
            <br />
            <button 
              onClick={async () => {
                await addHardhatNetwork();
                await checkNetwork();
              }}
              style={{
                marginTop: '8px',
                padding: '5px 10px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Switch to Hardhat Network
            </button>
          </div>
        )}

        {account ? (
          <>
            <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
              ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <FarmerRegistration account={account} />
            <MilestoneTracker account={account} />
            <FarmerDashboard account={account} />
            <MilestoneInitializer account={account} />
            <FarmAdvisorUI />
          </>
        ) : (
          <button 
            onClick={connectWallet}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Connect Wallet
          </button>
        )}
      </header>
    </div>
  );
}

export default App;