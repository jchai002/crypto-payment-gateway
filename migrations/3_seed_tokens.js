var WellToken = artifacts.require("./WellToken.sol");

module.exports = function(deployer, network, accounts) {
  return seed(accounts);
};

async function seed(accounts) {
  const token = await WellToken.deployed();
  // wait for contract deploy
  const owner = accounts[0];
  const beneficiary = accounts[1];

  const decimals = await token.decimals();
  console.log("token decimals", decimals);
  const amountToMint = 998 * Math.pow(10, decimals);
  // have the owner give the second account some tokens so we use the second account for testing
  const mintedEvent = await token.mint(beneficiary, amountToMint);
  console.log("minting", amountToMint, "tokens");
  console.log("token mint finished", mintedEvent);
}
