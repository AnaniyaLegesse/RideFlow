import { ethers } from "ethers";
import { env } from "../../config/env.js";
import fs from "fs";
import path from "path";

const provider = new ethers.JsonRpcProvider(env.infuraRpcUrl);
const wallet = new ethers.Wallet(env.walletPrivateKey, provider);

// Load the ABI from the compiled contract
const artifactPath = path.resolve(
  "artifacts/contracts/RentalAgreement.sol/RentalAgreement.json"
);
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

const contract = new ethers.Contract(env.contractAddress, artifact.abi, wallet);

export const recordAgreementOnChain = async ({
  vehicleId,
  customerWallet,
  startDate,
  endDate,
  totalPrice,
  currency,
}) => {
  const tx = await contract.recordAgreement(
    vehicleId,
    customerWallet,
    startDate,
    endDate,
    totalPrice,
    currency
  );
  const receipt = await tx.wait();
  return receipt;
};

export const getAgreementFromChain = async (id) => {
  const agreement = await contract.getAgreement(id);
  return {
    id: agreement.id.toString(),
    vehicleId: agreement.vehicleId,
    customerWallet: agreement.customerWallet,
    startDate: agreement.startDate,
    endDate: agreement.endDate,
    totalPrice: agreement.totalPrice.toString(),
    currency: agreement.currency,
    timestamp: agreement.timestamp.toString(),
  };
};

export const getVehicleAgreements = async (vehicleId) => {
  const ids = await contract.getVehicleAgreements(vehicleId);
  const agreements = await Promise.all(
    ids.map((id) => getAgreementFromChain(id))
  );
  return agreements;
};

export const getCustomerAgreements = async (customerWallet) => {
  const ids = await contract.getCustomerAgreements(customerWallet);
  const agreements = await Promise.all(
    ids.map((id) => getAgreementFromChain(id))
  );
  return agreements;
};