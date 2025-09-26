// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialContract {
    address public admin;
    
    struct Credential {
        string studentName;
        string course;
        string institution;
        string credentialType;  // <-- Added credentialType
        uint256 dateIssued;
        bytes32 hash;
    }

    mapping(bytes32 => Credential) public credentials;

    event CredentialIssued(bytes32 indexed hash);

    constructor() {
        admin = msg.sender;
    }

    // Updated to include credentialType
    function issueCredential(
        string memory _studentName,
        string memory _course,
        string memory _institution,
        string memory _credentialType
    ) external {
        require(msg.sender == admin, "Only admin can issue credentials");
        
        bytes32 hash = keccak256(
            abi.encodePacked(
                _studentName,
                _course,
                _institution,
                _credentialType,
                block.timestamp
            )
        );

        credentials[hash] = Credential({
            studentName: _studentName,
            course: _course,
            institution: _institution,
            credentialType: _credentialType,  // <-- Stored in contract
            dateIssued: block.timestamp,
            hash: hash
        });

        emit CredentialIssued(hash);
    }

    // Updated to return credentialType
    function verifyCredential(bytes32 _hash) external view returns (Credential memory) {
        return credentials[_hash];
    }
}
