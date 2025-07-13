const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with address:", deployer.address);

  // ✅ FIX: Pass deployer address as initialOwner to GrowToken constructor
  const GrowToken = await hre.ethers.getContractFactory("GrowToken");
  const growToken = await GrowToken.deploy(deployer.address);
  await growToken.waitForDeployment();
  console.log("✅ GrowToken deployed to:", await growToken.getAddress());

  const FarmerRegistry = await hre.ethers.getContractFactory("FarmerRegistry");
  const farmerRegistry = await FarmerRegistry.deploy();
  await farmerRegistry.waitForDeployment();
  console.log("✅ FarmerRegistry deployed to:", await farmerRegistry.getAddress());

  const MilestoneManager = await hre.ethers.getContractFactory("MilestoneManager");
  const milestoneManager = await MilestoneManager.deploy();
  await milestoneManager.waitForDeployment();
  console.log("✅ MilestoneManager deployed to:", await milestoneManager.getAddress());

  const EscrowContract = await hre.ethers.getContractFactory("EscrowContract");
  const escrowContract = await EscrowContract.deploy(
    await growToken.getAddress(),            // ✅ Token address
    await milestoneManager.getAddress()      // ✅ MilestoneManager address
  );
  await escrowContract.waitForDeployment();
  console.log("✅ EscrowContract deployed to:", await escrowContract.getAddress());

  // Optional: Print all deployed contract addresses for reference
  console.log("\n🎉 All contracts deployed successfully!");
  console.log("GrowToken:", await growToken.getAddress());
  console.log("FarmerRegistry:", await farmerRegistry.getAddress());
  console.log("MilestoneManager:", await milestoneManager.getAddress());
  console.log("EscrowContract:", await escrowContract.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});