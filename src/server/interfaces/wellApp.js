const crypto = require("crypto");
const axios = require("axios");
/* DO NOT EXPOSE IN CLIENT */
const API_KEY = "85185321-3a60-4af5-aa36-cce7729ca244";

/**
 * @param data {utf-8} - standard string
 * @return {hex}
 */
function encrypt(data) {
  var cipher = crypto.createCipher("aes-256-cbc", API_KEY);
  var crypted = cipher.update(data, "utf-8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

/**
 * @param data {hex}
 * @return {utf-8} - Returns string format utf-8
 */
function decrypt(data) {
  var decipher = crypto.createDecipher("aes-256-cbc", API_KEY);
  var decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

async function getUserSessionData(authorization, exchange_id) {
  // simulate Decryption here
  let encryptedData = encrypt(authorization);
  let decryptedToken = decrypt(encryptedData);
  // mock auth api, will be rails server in production
  const wellAppApi = axios.create({
    baseURL: "http://54.218.181.29:3000/api/v1/exchanges/",
    headers: {
      Authorization: "Bearer " + decryptedToken,
      Accept: "application/json"
    }
  });
  // make call to rails server
  try {
    var res = await wellAppApi.get(exchange_id);
  } catch (e) {
    console.log(e);
  } finally {
    switch (res.status) {
      case 401:
        return "unauthorized";
      // TODO: if rails gives expired status, use that
      // case 500:
      // return "expired"
      case 200:
        // if rails gives timestamp, test against server time to see if expired
        // if (res.data.expiration_time < Date.now())) {
        //   return "expired"
        // }
        // else return resource
        return res.data;
    }
  }
}

async function postTransactionStatus(authorization, exchange_id) {
  // stub
}

module.exports = { getUserSessionData, postTransactionStatus };
