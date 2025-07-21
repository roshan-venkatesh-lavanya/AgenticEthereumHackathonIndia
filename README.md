# **Agentic Ethereum Hackathon India**
## **🛠 Project Title - Pay-as-you-Grow dApp**

Welcome to our submission for the *Agentic Ethereum Hackathon* by Reskilll & Geodework! This repository includes our project code, documentation, and related assets.

## **📌 Problem Statement**

We addressed the challenge: *"Building Agentic AI Solutions for Real-World Impact"*

**The Problem:** Traditional agricultural financing and farming guidance systems fail smallholder farmers due to:
- Lack of milestone-based funding mechanisms
- Limited access to expert agricultural advice
- Poor transparency in agricultural loan disbursement
- Farmers losing crops due to inadequate guidance during critical growth phases

## **💡 Our Solution**

**Project Name:** *Pay-as-you-Grow dApp*

A blockchain-powered agricultural platform that combines:
- **Smart Contract-based Milestone Funding** - Farmers receive payments as they complete verified farming milestones
- **AI-Powered Farm Advisor** - Contextual, expert agricultural guidance for different crops and growth phases
- **Transparent Escrow System** - Automated fund release based on milestone completion
- **Farmer Registry** - Decentralized farmer identity and crop tracking

**Who it's for:** Smallholder farmers, agricultural lenders, and farming cooperatives
**Impact:** Reduces agricultural loan defaults, improves crop yields through AI guidance, and creates transparent funding mechanisms

## **🧱 Tech Stack**

* 🖥 **Frontend:** React.js with Vite
* ⚙ **Backend:** Node.js with Express.js
* 🧠 **AI:** Enhanced Rule-Based Agricultural Intelligence System (100% Free)
* 🔗 **Blockchain:** Ethereum, Solidity, Hardhat
* 💰 **Smart Contracts:** ERC20 Token (GrowToken), Escrow Contract, Milestone Manager
* 🔍 **Development:** MetaMask integration, Local Hardhat network
* 🚀 **Architecture:** Decentralized dApp with AI-powered backend services

## **📽 Demo**

* 🖥 **Live App:** http://localhost:3000 (Local development)


## **🚀 Key Features**

### **Smart Contract System:**
- **GrowToken (GROW):** ERC20 token for agricultural payments
- **FarmerRegistry:** Decentralized farmer registration and verification
- **MilestoneManager:** Tracks and verifies farming milestones
- **EscrowContract:** Automated milestone-based fund release

### **AI Farm Advisor:**
- Crop-specific guidance for 10+ crops (Rice, Wheat, Maize, etc.)
- Phase-wise recommendations (Soil Prep, Sowing, Irrigation, etc.)
- Contextual tips and seasonal advice
- Professional agricultural expertise in an AI-like interface

### **User Features:**
- Wallet-based authentication via MetaMask
- Farmer registration and profile management
- Milestone creation and tracking
- Real-time agricultural advice
- Transparent payment tracking

## **📂 Repository Structure**

```
pay-as-you-grow/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── App.js           # Main dApp interface
│   │   ├── components/      # React components
│   │   │   ├── FarmerRegistration.js
│   │   │   ├── MilestoneTracker.js
│   │   │   ├── FarmerDashboard.js
│   │   │   └── MilestoneInitializer.js
│   │   └── App.css
│   └── package.json
├── contracts/               # Solidity smart contracts
│   ├── GrowToken.sol       # ERC20 token contract
│   ├── FarmerRegistry.sol  # Farmer registration
│   ├── MilestoneManager.sol # Milestone tracking
│   └── EscrowContract.sol  # Payment escrow
├── agents/                 # AI agent services
│   └── farmAdvisor.js     # Enhanced farm advisor API
├── scripts/
│   └── deploy.js          # Contract deployment script
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Project dependencies
├── .env                   # Environment variables
└── README.md             # This file
```

## **🏃‍♂️ Quick Start**

### **Prerequisites:**
- Node.js (v16+)
- MetaMask browser extension
- Git

### **Setup:**

1. **Clone the repository:**
```bash
git clone [your-repo-url]
cd pay-as-you-grow
```

2. **Install dependencies:**
```bash
npm install
cd frontend && npm install
```

3. **Start local blockchain (Terminal 1):**
```bash
npx hardhat node
```

4. **Deploy contracts (Terminal 2):**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

5. **Start AI Farm Advisor (Terminal 3):**
```bash
node agents/farmAdvisor.js
```

6. **Start frontend (Terminal 4):**
```bash
cd frontend
npm start
```

7. **Configure MetaMask:**
   - Add Hardhat Local network (RPC: http://127.0.0.1:8545, Chain ID: 31337)
   - Import test account using private key from hardhat node output

8. **Access dApp:** http://localhost:3000

## **🎯 Hackathon Criteria Alignment**

### **Agentic AI Integration:**
- ✅ **Intelligent Farm Advisor** provides contextual, expert-level agricultural guidance
- ✅ **Dynamic responses** adapt to different crops, phases, and seasonal conditions
- ✅ **Autonomous decision support** for critical farming decisions

### **Ethereum Integration:**
- ✅ **Smart contract-based** milestone tracking and payment system
- ✅ **ERC20 token economy** with GrowToken for agricultural payments
- ✅ **Transparent, trustless** escrow and fund management

### **Real-World Impact:**
- ✅ **Addresses actual problem** of agricultural financing and farmer guidance
- ✅ **Scalable solution** for smallholder farmers globally
- ✅ **Measurable outcomes** through milestone tracking and improved yields

## **🔮 Future Roadmap**

- **Enhanced AI:** Integration with weather APIs and satellite imagery
- **Mobile App:** React Native version for field use
- **Oracle Integration:** Real-world milestone verification through IoT sensors
- **Multi-chain Support:** Deploy on Polygon and other L2s for lower gas costs
- **Cooperative Features:** Group farming and collective milestone tracking

## **👥 Team- BAROS BUILD**

- **ROSHAN VENKATESH LAVANYA**

## **🏆 Achievements**

- ✅ **Fully functional dApp** with smart contracts deployed
- ✅ **AI-powered agricultural guidance** system
- ✅ **Complete user journey** from registration to milestone completion
- ✅ **Professional UI/UX** with wallet integration
- ✅ **Scalable architecture** ready for production deployment

---

**Built with ❤️ for farmers worldwide** 🌾

*Submission for Agentic Ethereum Hackathon India - 13 JULY 2025*
