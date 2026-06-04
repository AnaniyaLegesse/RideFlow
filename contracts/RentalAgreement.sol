// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RentalAgreement {

    struct Agreement {
        uint256 id;
        string vehicleId;
        address customerWallet;
        string startDate;
        string endDate;
        uint256 totalPrice;
        string currency;
        uint256 timestamp;
    }

    uint256 public agreementCount;
    mapping(uint256 => Agreement) public agreements;
    mapping(string => uint256[]) public vehicleAgreements;
    mapping(address => uint256[]) public customerAgreements;

    event AgreementRecorded(
        uint256 indexed id,
        string vehicleId,
        address indexed customerWallet,
        string startDate,
        string endDate,
        uint256 totalPrice,
        string currency,
        uint256 timestamp
    );

    function recordAgreement(
        string memory vehicleId,
        address customerWallet,
        string memory startDate,
        string memory endDate,
        uint256 totalPrice,
        string memory currency
    ) public returns (uint256) {
        agreementCount++;

        agreements[agreementCount] = Agreement({
            id: agreementCount,
            vehicleId: vehicleId,
            customerWallet: customerWallet,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice,
            currency: currency,
            timestamp: block.timestamp
        });

        vehicleAgreements[vehicleId].push(agreementCount);
        customerAgreements[customerWallet].push(agreementCount);

        emit AgreementRecorded(
            agreementCount,
            vehicleId,
            customerWallet,
            startDate,
            endDate,
            totalPrice,
            currency,
            block.timestamp
        );

        return agreementCount;
    }

    function getAgreement(uint256 id) public view returns (Agreement memory) {
        require(id > 0 && id <= agreementCount, "Agreement does not exist");
        return agreements[id];
    }

    function getVehicleAgreements(string memory vehicleId) public view returns (uint256[] memory) {
        return vehicleAgreements[vehicleId];
    }

    function getCustomerAgreements(address customerWallet) public view returns (uint256[] memory) {
        return customerAgreements[customerWallet];
    }
}