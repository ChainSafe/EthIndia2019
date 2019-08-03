const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'credit wine outdoor damp lava autumn maid harsh actual topple expand quote';


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 8545,
      network_id: 5777,
      gas: 6721975,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 50,
      skipDryRun: true,
    },
    kovan: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 8545,
      network_id: 42,
      gas: 7000000,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 8545,
      network_id: 4,
      gas: 6900000,
      gasPrice: 25000000000,
      confirmations: 1,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 80,
      network_id: 3,
      gas: 7000000,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: false,
    },
    mainnet: {
      provider: new HDWalletProvider(mnemonic, 'http://localhost:8545', 0, 10),
      host: '127.0.0.1',
      port: 8545,
      network_id: 1,
      gas: 7000000,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 500,
      skipDryRun: false,
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
      version: '0.5.8',
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
