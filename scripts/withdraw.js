const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const fundMe = await ethers.getContract("FundMe", deployer);

  const balanceBefore = await ethers.provider.getBalance(deployer);
  console.log(`Balance before ${balanceBefore.toString()}`);

  console.log("Withdrawing from contract...");
  const transactionResponse = await fundMe.withdraw();
  await transactionResponse.wait(1);
  console.log("withdrawn!");

  const balanceAfter = await ethers.provider.getBalance(deployer);
  console.log(`Balance after ${balanceAfter.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
