import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import AssetTokenizationArtifact from "../artifacts/AssetTokenization.json";
import { AssetTokenization as AssetTokenizationType } from "../types";
import { getEthereum } from "../utils/ethereum";

export const AssetTokenizationAddress = "0x7d982Fbad27951136203B0edF6DFB7FFd0F7E783";

type PropsUseContract = {
    currentAccount: string | undefined;
};

type ReturnUseContract = {
    assetTokenization: AssetTokenizationType | undefined;
};

export const useContract = ({ currentAccount }: PropsUseContract): ReturnUseContract => {
    const [assetTokenization, setAssetTokenization] = useState<AssetTokenizationType>();
    const ethereum = getEthereum();

    const getContract = useCallback(
        (
            contractAddress: string,
            abi: ethers.ContractInterface,
            storeContract: (_: ethers.Contract) => void
        ) => {
            if (!ethereum) {
                console.log("Ethereum object doesn't exist!");
                return;
            }
            if (!currentAccount) {
                // currentAccountがundefinedの場合はcontractオブジェクトもundefinedにする
                console.log("currentAccount doesn't exist!");
                return;
            }
            try {
                // @ts-ignore: ethereum as ethers.providers.ExternalProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const Contract = new ethers.Contract(contractAddress, abi, signer);
                storeContract(Contract);
            } catch (error) {
                console.log(error);
            }
        },
        [ethereum, currentAccount]
    );

    useEffect(() => {
        getContract(
            AssetTokenizationAddress,
            AssetTokenizationArtifact.abi,
            (Contract: ethers.Contract) => {
                setAssetTokenization(Contract as AssetTokenizationType);
            }
        );
    }, [ethereum, currentAccount, getContract]);

    return {
        assetTokenization,
    };
};
