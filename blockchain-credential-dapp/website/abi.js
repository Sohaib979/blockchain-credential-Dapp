// abi.js
const contractABI = [
	
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "CredentialIssued",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "credentials",
		"outputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "course",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "institution",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "credentialType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateIssued",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_course",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_institution",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_credentialType",
				"type": "string"
			}
		],
		"name": "issueCredential",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "verifyCredential",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "studentName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "course",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "institution",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "credentialType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "dateIssued",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "hash",
						"type": "bytes32"
					}
				],
				"internalType": "struct CredentialContract.Credential",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractAddress = "0x3dd4a5acB9152546f85F67483FDf82b881d8F7B7"; // Replace with your deployed contract address
