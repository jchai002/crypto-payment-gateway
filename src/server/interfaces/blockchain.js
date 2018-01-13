const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
);

function getTransanctionStatus(tx_hash) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(tx_hash, (err, res) => {
      if (err) {
        console.log("err: ", err);
        return reject(err);
      }
      var result = null;
      if (res) {
        result = {
          blockNumber: res.blockNumber,
          status: res.status
        };
      }
      return resolve(result);
    });
  });
}

function pollForTransactionState(tx_hash) {
  return new Promise(async function poll(resolve) {
    var result = await getTransanctionStatus(tx_hash);
    // if the transaction is not mined
    if (!result || !result.blockNumber) {
      // recursive call to poll again
      console.log("Re-trying with hash", tx_hash);
      setTimeout(poll.bind(null, resolve), 3000);
    } else {
      // otherwise stop polling and resolve
      resolve(result);
    }
  });
}

module.exports = { pollForTransactionState };
