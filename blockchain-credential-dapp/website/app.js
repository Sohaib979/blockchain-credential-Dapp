let web3;
let contract;
let issuedCredentialHash = null; // Stores the last issued hash



function validateText(input) {
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
}

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      document.getElementById("walletAddress").innerText = `Connected: ${accounts[0]}`;
      contract = new web3.eth.Contract(contractABI, contractAddress);
    } catch (err) {
      console.error("User rejected connection", err);
      Swal.fire("Access Denied", "Wallet connection rejected by user.", "error");
    }
  } else {
    Swal.fire("MetaMask Not Found", "Please install MetaMask extension to connect your wallet.", "warning");
  }
}


async function issueCredential() {
  // Store original button text
  const issueBtn = document.querySelector('#issue button.btn-success');
  const originalBtnText = issueBtn.innerHTML;
  
  try {
    // 1. Initial checks (unchanged from your original)
    if (!web3 || !contract) {
      await connectWallet();
      if (!web3 || !contract) {
        Swal.fire("Error", "Wallet not connected or contract not initialized", "error");
        return;
      }
    }

    // 2. Input validation (unchanged from your original)
    const firstName = document.getElementById("firstName").value.trim();
    const familyName = document.getElementById("familyName").value.trim();
    const studentName = `${firstName} ${familyName}`;
    const course = document.getElementById("course").value.trim();
    const institution = document.getElementById("institution").value.trim();
    const credentialType = document.getElementById("credentialType").value;

    if (!firstName || !familyName || !course || !institution || !credentialType) {
      Swal.fire("Missing Info", "Please fill out all fields", "warning");
      return;
    }

    // 3. Show loading state (unchanged)
    Swal.fire({ 
      title: "Issuing...", 
      didOpen: () => Swal.showLoading(),
      allowOutsideClick: false
    });

    // 4. Get accounts (unchanged)
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    // 5. Add transaction feedback
    let gotTransactionHash = false;
    
    const tx = await contract.methods
      .issueCredential(studentName, course, institution, credentialType)
      .send({
        from: sender,
        gas: 500000 // Fixed gas limit to prevent estimation issues
      })
      .on('transactionHash', (hash) => {
        gotTransactionHash = true;
        console.log("Transaction sent:", hash);
        Swal.update({
          title: "Transaction Sent",
          html: `Waiting for confirmation...<br><small>${hash}</small>`,
          icon: "info"
        });
      });

    // 6. Process result (unchanged from your original)
    if (!tx.events?.CredentialIssued) {
      throw new Error("Transaction completed but no CredentialIssued event");
    }

    const hash = tx.events.CredentialIssued.returnValues.hash;
    issuedCredentialHash = hash;
    document.getElementById("issuedHash").innerText = `✅ Issued Hash: ${hash}`;
    setupCopyButton(hash);
    generateQR(hash);
    
    Swal.fire("Success!", "Credential issued successfully", "success");

  } catch (err) {
    console.error("Transaction error:", err);
    
    let errorMsg = "Transaction failed";
    if (err.message.includes("revert")) {
      errorMsg = "Contract reverted - are you the admin?";
    } else if (err.message.includes("denied")) {
      errorMsg = "User denied transaction";
    } else if (err.message.includes("gas")) {
      errorMsg = "Transaction ran out of gas";
    }

    Swal.fire("Error", errorMsg, "error");
  } finally {
    // Restore original button state
    if (issueBtn) {
      issueBtn.innerHTML = originalBtnText;
      issueBtn.disabled = false;
    }
  }
}



async function verifyCredential() {
  const hash = document.getElementById("hashToVerify").value.trim();

  try {
    // Get the full credential struct
    const credential = await contract.methods.verifyCredential(hash).call();

    // Display result (using the struct properties)
    document.getElementById("verificationResult").innerHTML = 
      `🎓 Student: ${credential.studentName}<br>
       📚 Course: ${credential.course}<br>
       🏛️ Institution: ${credential.institution}<br>
       🏷️ Type: ${credential.credentialType}<br>
       📅 Issued: ${new Date(Number(credential.dateIssued) * 1000).toLocaleString()}`;

    Swal.fire("Verified!", "Credential is valid.", "success");

  } catch (err) {
    console.error("Verification error:", err);
    document.getElementById("verificationResult").innerText = "❌ Credential not found or invalid.";
    Swal.fire("Error", "Verification failed. See console for details.", "error");
  }
}



// Generate QR Code
function generateQR(hash) {
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // clear previous
  new QRCode(qrContainer, {
    text: hash,
    width: 128,
    height: 128,
  });
  document.getElementById("downloadQR").classList.remove("d-none");

  document.getElementById("downloadQR").onclick = () => {
    const img = qrContainer.querySelector("img");
    if (img) {
      const a = document.createElement("a");
      a.href = img.src;
      a.download = "credential-qr.png";
      a.click();
    }
  };
}

// QR Scanner for Autofill
const qrScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
}, false);

qrScanner.render((decodedText) => {
  document.getElementById("hashToVerify").value = decodedText;
  Swal.fire("QR Scanned!", "Hash autofilled for verification.", "info");
}, (err) => {
  // ignore scan errors
});


// Add this helper function in app.js
function isValidHash(hash) {
  return /^0x([A-Fa-f0-9]{64})$/.test(hash);
}
// Copy hash to clipboard
function setupCopyButton(hash) {
  const copyBtn = document.getElementById("copyHashBtn");
  copyBtn.classList.remove("d-none");
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Copied!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      Swal.fire("Error", "Could not copy hash", "error");
    }
  };
}


