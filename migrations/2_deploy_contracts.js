var WellToken = artifacts.require("./WellToken.sol");
var WellTokenCrowdsale = artifacts.require("./WellTokenCrowdsale.sol");

function latestTime() {
  return web3.eth.getBlock("latest").timestamp;
}

function ether(n) {
  return new web3.BigNumber(web3.toWei(n, "ether"));
}

const duration = {
  seconds: function(val) {
    return val;
  },
  minutes: function(val) {
    return val * this.seconds(60);
  },
  hours: function(val) {
    return val * this.minutes(60);
  },
  days: function(val) {
    return val * this.hours(24);
  },
  weeks: function(val) {
    return val * this.days(7);
  },
  years: function(val) {
    return val * this.days(365);
  }
};

const BigNumber = web3.BigNumber;
// 1 wei --> 1200 TestToken
const rate = 5000;
// start one week from now
const startTime = latestTime() + duration.minutes(1);
// run for one week
const endTime = startTime + duration.weeks(1);

module.exports = function(deployer, network, accounts) {
  return liveDeploy(deployer, accounts);
};

async function liveDeploy(deployer, accounts) {
  // // deploy token contract first
  // await deployer.deploy(WellToken);
  // const token = await WellToken.deployed();
  // // wait for contract deploy
  // console.log("truffle deployed token address", token.address);

  // Deploy the crowdsale
  const address = "0xeb6402ce5dac9d4001298bc11f777eead1db3b64";
  console.log("Contract arguments: ", {
    startTime,
    endTime,
    rate,
    address
  });

  // wait for contract deploy
  await deployer.deploy(WellTokenCrowdsale, startTime, endTime, rate, address);

  const crowdsale = await WellTokenCrowdsale.deployed();
  // Lookup and print the token associated with the crowdsale contract
  // const crowdsaleToken = await crowdsale.token.call();
  // console.log("crowdsale token address: ", crowdsaleToken);
}
