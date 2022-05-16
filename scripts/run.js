const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("wavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    // console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave("A message 1");
    await waveTxn.wait();

    let waveTxn2 = await waveContract.wave("A message 2");
    await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};
  
const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};
  
runMain();

// 2: 0x5FbDB2315678afecb367f032d93F642f64180aa3

// const main = async () => {
//   const [ deployer ] = await hre.ethers.getSigners();
//   const accountBalance = await deployer.getBalance();

//   console.log('Deploying contracts with account', deployer.address);
//   console.log("Account balance: ", accountBalance.toString());

//   const waveContractFactory = await hre.ethers.getContractFactory("wavePortal");
//   const waveContract = await waveContractFactory.deploy({
//       value: hre.ethers.utils.parseEther("0.001"),
//   });
//   await waveContract.deployed();

//   let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
//   console.log(
//       "Contract balance:",
//       hre.ethers.utils.formatEther(contractBalance)
//     );

//     let waveTxn = await waveContract.wave("A message!");
// await waveTxn.wait();

// /*
//  * Get Contract balance to see what happened!
//  */
// contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
// console.log(
//   "Contract balance:",
//   hre.ethers.utils.formatEther(contractBalance)
// );

// let allWaves = await waveContract.getAllWaves();
// console.log(allWaves);
  
//   console.log("Wave Portal Address", waveContract.address);
// };


// const runMain = async () => {
//   try {
//       await main();
//       process.exit(0);
//   } catch(err) {
//       console.error(err);
//       process.exit(1);
//   }
// };

// runMain();