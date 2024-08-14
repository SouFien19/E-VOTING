// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAuth {
    mapping(address => bool) public authenticatedUsers;

    event UserAuthenticated(address user);

    function authenticateUser(address user) public {
        authenticatedUsers[user] = true;
        emit UserAuthenticated(user);
    }

    function isAuthenticated(address user) public view returns (bool) {
        return authenticatedUsers[user];
    }
}
