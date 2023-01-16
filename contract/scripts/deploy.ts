import { ethers } from "hardhat";

async function deploy() {
    const [deployer] = await ethers.getSigners();

    const AssetTokenization = await ethers.getContractFactory("AssetTokenization");
    const assetTokenization = await AssetTokenization.deploy();
    await assetTokenization.deployed();

    console.log("assetTokenization address:", assetTokenization.address);
    console.log("account address that deploy contract:", deployer.address);
}

deploy()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
