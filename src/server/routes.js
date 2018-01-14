const express = require("express");
const routes = express.Router();
const blockchain = require("./interfaces/blockchain");
const wellApp = require("./interfaces/wellApp");

routes.get("/transactions", (req, res) => {
  res.send(transactions);
});

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
  console.log(provider, patient);
  res.send({ provider, patient });
});

routes.post("/get-user-session-data", async (req, res) => {
  // let { authorization, exchange_id } = req.body;
  // if (typeof authorization === "undefined") {
  //   return res.send(401, "Invalid arguments");
  // }
  // let authRes = await wellApp.getUserSessionData(authorization, exchange_id);
  res.send(null);
});

module.exports = routes;
