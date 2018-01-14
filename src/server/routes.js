const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");
const wellApp = require("./interfaces/wellApp");

routes.post("/transactions", async (req, res) => {
  var { transaction_hash, provider_id, patient_id } = req.body;
  if (typeof transaction_hash === "undefined") {
    return res.send(400, "Invalid arguments");
  }
  // wait for poll to come back with status
  const blockchainRes = await blockchain.pollForTransactionState(
    transaction_hash
  );
  console.log("val", transaction_hash, provider_id, patient_id);
  if (blockchainRes == 1 || blockchainRes == "0x1") {
    res.send("0x1");
  } else {
    res.send("0x0");
  }
  // TODO: send blockchain res to wellApp api
});

routes.post("/get-appointment", async (req, res) => {
  const provider = await wellApp.getProvider();
  const patient = await wellApp.getPatientById(5);
  res.send({ provider, patient });
});

module.exports = routes;
