require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.INFURA_RPC_URL,
      accounts: [process.env.WALLET_PRIVATE_KEY],
    },
  },
};