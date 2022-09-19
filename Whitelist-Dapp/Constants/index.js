export const contract_address = "0xa76C690b3d38c51C603c930FF38066A993E4F497";
export const abi = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_maxwhitelistedaddresses",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "WhitelistAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxwhitelistedaddresses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numAddressesWhitelisted",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]