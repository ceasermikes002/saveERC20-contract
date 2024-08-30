import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x488Cdc396B5EdeC1c6da0Da00d1Ab2f5c9a63C03";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0x9Cf7d707d46f5a828FBb80ff2E8cED43023dFcdC";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Get all signers and select the first one
    const [signer] = await ethers.getSigners();
    const signerAddress = await signer.getAddress();

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);
    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    await approveTx.wait();

    // Check contract balance before deposit
    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before deposit:", contractBalanceBeforeDeposit);

    // Deposit tokens into the savings contract
    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);
    console.log("Deposit transaction:", depositTx);

    await depositTx.wait();

    // Check contract balance after deposit
    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance after deposit:", contractBalanceAfterDeposit);

    // Withdrawal Interaction

    // Check contract balance before withdrawal
    const contractBalanceBeforeWithdrawal = await saveERC20.getContractBalance();
    console.log("Contract balance before withdrawal:", contractBalanceBeforeWithdrawal);

    // Specify the withdrawal amount (same unit as the deposit)
    const withdrawalAmount = ethers.parseUnits("150", 18);

    // Call the withdraw function
    const withdrawTx = await saveERC20.withdraw(withdrawalAmount);
    console.log("Withdrawal transaction:", withdrawTx);

    // Wait for the transaction to be mined
    await withdrawTx.wait();

    // Check contract balance after withdrawal
    const contractBalanceAfterWithdrawal = await saveERC20.getContractBalance();
    console.log("Contract balance after withdrawal:", contractBalanceAfterWithdrawal);

    // Check your wallet balance
    const walletBalance = await web3CXI.balanceOf(signerAddress);
    console.log("Wallet balance after withdrawal:", walletBalance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
