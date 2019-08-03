const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'route poet seed bronze hazard pledge purpose round omit story coral clump';


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:7545', 0, 10),
      host: '127.0.0.1',
      port: 7545,
      network_id: 5777,
      gas: 6721975,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 50,
      skipDryRun: true,
    },
    matic: {
      provider: new HDWalletProvider(mnemonic, 'https://testnet2.matic.network', 0, 10),
      host: 'https://testnet2.matic.network',
      port: 8545,
      network_id: 8995,
      gas: 0,
      gasPrice: 0,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: false,
    },
  },
  compilers: {
    solc: {
      version: '0.5.7',
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
    evmVersion: 'byzantium',
  },
};
