const Web3 = require('web3');
const { abi, evm } = require('./UserAuth.json'); // ABI and Bytecode from Truffle or Hardhat

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/6fc75e9b892341f79f2744c15b3c77d6'));
const contract = new web3.eth.Contract(abi, '6fc75e9b892341f79f2744c15b3c77d6');

const authenticateUser = async (userAddress) => {
    try {
        await contract.methods.authenticateUser(userAddress).send({ from: 'soufienlabiadh19@gmail.com' });
        console.log('User authenticated');
    } catch (error) {
        console.error('Error authenticating user:', error);
    }
};

const isUserAuthenticated = async (userAddress) => {
    try {
        const result = await contract.methods.isAuthenticated(userAddress).call();
        return result;
    } catch (error) {
        console.error('Error checking user authentication:', error);
        return false;
    }
};

module.exports = { authenticateUser, isUserAuthenticated };
