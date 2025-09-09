import { Contract } from "ethers";
import { getProvider } from "./ethers";
import StorageABI from "../../abis/Storage.json";
import PBA7ABI from "../../abis/PBA7.json";

export const CONTRACT_ADDRESS = "0x58053f0e8ede1a47a1af53e43368cd04ddcaf66f";
export const POPULARITY_CONTRACT_ADDRESS =
  "0xb7c36e02a4c702a723b7ef0c7011f4db60caa7ae";

export const CONTRACT_ABI = StorageABI;
export const POPULARITY_CONTRACT_ABI = PBA7ABI;

export const getContract = () => {
  const provider = getProvider();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getSignedContract = async (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const getPopularityContract = () => {
  const provider = getProvider();
  return new Contract(
    POPULARITY_CONTRACT_ADDRESS,
    POPULARITY_CONTRACT_ABI,
    provider
  );
};

export const getSignedPopularityContract = async (signer) => {
  return new Contract(
    POPULARITY_CONTRACT_ADDRESS,
    POPULARITY_CONTRACT_ABI,
    signer
  );
};
