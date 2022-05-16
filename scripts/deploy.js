const main = async () => {

    const waveContractFactory = await hre.ethers.getContractFactory("wavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await waveContract.deployed();
    
    console.log("Wave Portal Address", waveContract.address);
};


const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
};

runMain();