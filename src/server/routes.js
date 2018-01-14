const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");
const wellApp = require("./interfaces/wellApp");

routes.post("/transactions", async (req, res) => {
  var { tx_hash } = req.body;
  if (typeof tx_hash === "undefined") {
    return res.send(400, "Invalid arguments");
  }
  // wait for poll to come back with status
  const { status } = await blockchain.pollForTransactionState(tx_hash);
  res.send(status);
  // TODO: send blockchain res to wellApp api
});

routes.post("/get-appointment", async (req, res) => {
  const provider = await wellApp.getProvider();
  const patient = await wellApp.getPatientById(5);
  res.send({ provider, patient });
});

module.exports = routes;
