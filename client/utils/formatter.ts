import { BigNumber, ethers } from "ethers";

export const weiToAvax = (wei: BigNumber) => {
    return ethers.utils.formatEther(wei);
};

export const avaxToWei = (avax: string) => {
    return ethers.utils.parseEther(avax);
};

export const blockTimeStampToDate = (timestamp: BigNumber) => {
    return new Date(timestamp.toNumber() * 1000);
};
