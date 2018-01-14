const crypto = require("crypto");
const axios = require("axios");
var authToken;

// mock auth
async function getProvider() {
  try {
    var data = {
      email: "provider@demo.com",
      password: "password",
      partnerid: 4
    };
    var res = await axios.post("https://well-api.joinwell.com/api/auth", data);
  } catch (e) {
    console.log("error", e.Error);
  } finally {
    authToken = res.data.token;
    return res.data.user;
  }
}

async function getPatientById(id) {
  const wellAppApi = axios.create({
    baseURL: "https://well-api.joinwell.com/api",
    headers: {
      Authorization: "Bearer " + authToken,
      Accept: "application/json"
    }
  });
  try {
    var res = await wellAppApi.get("/provider/getPatientById/" + id);
  } catch (e) {
    console.log("error", e.Error);
  } finally {
    return res.data.patient;
  }
}

async function addToWaitingRoom(transaction_hash, provider_id, patient_id) {
  const wellAppApi = axios.create({
    baseURL: "https://well-api.joinwell.com/api",
    headers: {
      Authorization: "Bearer " + authToken,
      Accept: "application/json"
    }
  });

  var data = {
    transaction_hash,
    provider_id,
    patient_id
  };
  try {
    var res = await axios.post(
      "https://well-api.joinwell.com/api/patient/addtowaitingroom",
      data
    );
  } catch (e) {
    console.log("error", e.Error);
  } finally {
    console.log("addToWaitingRoom", res);
  }
  return null;
}

module.exports = { getProvider, getPatientById, addToWaitingRoom };
