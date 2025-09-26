# Blockchain Credential Verification DApp

This repository contains a prototype decentralised application (DApp) developed as part of a Master’s dissertation at Regent College London.  
The project explores how blockchain can enhance the transparency, trust, and security of academic credential verification.

## 🚀 Features
- Issue credentials with student name, course, institution, and credential type.
- Store credential hashes immutably on the Ethereum testnet.
- Verify credentials using a simple, browser-based interface.
- MetaMask integration for secure wallet-based authentication.

## 📂 Repository Structure
- `contract/` — Solidity smart contract (`CredentialContract.sol`)
- `website/` — Frontend (`index.html`, `app.js`, `abi.js`, `jquery.min.js`)
- `docs/` — Supporting documentation and screenshots
- `LICENSE` — All Rights Reserved copyright notice
- `CITATION.cff` — Citation metadata for academic referencing

## 🛠️ Technology Stack
- Ethereum (Sepolia testnet)
- Solidity ^0.8.0
- Remix IDE
- MetaMask
- HTML / JavaScript / jQuery

## ⚙️ How to Run
1. Open [Remix IDE](https://remix.ethereum.org/).
2. Compile and deploy `contract/CredentialContract.sol` to the Sepolia testnet.
3. Copy the contract address.
4. Update the `contractAddress` in `abi.js` or `app.js` with your deployed address.
5. Open `index.html` in a browser with MetaMask installed.
6. Connect your wallet and interact with the DApp.

## 📖 Notes
- This project is a **prototype** created for research purposes.
- It is **not licensed for reuse** — see `LICENSE`.

## 📌 Citation
If you reference this work in research, please cite it via the Zenodo DOI (to be minted).
