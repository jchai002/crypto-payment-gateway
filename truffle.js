require("babel-register");
require("babel-polyfill");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: `https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`, // Connect to geth on the specified
      from: "0x2cdb7e99ec3db8254650e72e4d87087b4dfae176", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};
