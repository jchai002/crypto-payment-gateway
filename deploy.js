var WellCrowdsale = artifacts.require('../contracts/WellCrowdsale.sol');

function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}

function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'))
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)}
}


const BigNumber = web3.BigNumber;
// 1 wei --> 1200 TestToken 
const rate = 1200;
// start one week from now
const startTime = latestTime()+duration.minutes(1);
// run for one week
const endTime = startTime + duration.weeks(1);

module.exports = function(deployer, network, accounts) {
  return liveDeploy(deployer, accounts);
};

async function liveDeploy(deployer, accounts) {
  const address = accounts[0];
  console.log("Contract arguments: ", {
    startTime: startTime,
    endTime: endTime,
    rate: rate,
    address: address
  });
  // Deploy the crowdsale
  return deployer.deploy(WellCrowdsale, startTime, endTime, rate, address).then(async() => {
    // Wait until its depoyed
    const contract = await WellCrowdsale.deployed();
    // Lookup and print the token associated with the crowdsale contract
    const token = await contract.token.call();
    console.log('Token address: ', token);
  });
}