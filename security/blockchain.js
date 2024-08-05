const { Web3 } = require('web3');

    // Initialize Web3 with the Infura URL
    const web3 = new Web3(process.env.INFURA_URL);

    const verifyTransaction = async (address, transactionHash) => {
        try {
            // Fetch the transaction details
            const transaction = await web3.eth.getTransaction(transactionHash);
            
            // Check if the transaction exists and its 'from' address matches the provided address
            return transaction && transaction.from.toLowerCase() === address.toLowerCase();
        } catch (error) {
            console.error('Error verifying transaction:', error);
            return false;
        }
    };

    module.exports = { verifyTransaction };
