import { TRANSACTION_STATUS_UPDATED } from "../constants/ActionTypes";
import * as TransactionStatus from "app/constants/TransactionStatus";
import * as promisedWeb3 from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

export function payWithEther(amount) {
  return async dispatch => {
    let tx_hash = await promisedWeb3.sendEther(amount);
    postTransactionToServer(dispatch, tx_hash);
  };
}

export function payWithToken(amount) {
  // should be faceOff wallet address
  return async dispatch => {
    let tx_hash = await promisedWeb3.sendToken(amount);
    postTransactionToServer(dispatch, tx_hash);
  };
}

async function postTransactionToServer(dispatch, tx_hash) {
  if (typeof tx_hash === "undefined") {
    dispatch({
      type: TRANSACTION_STATUS_UPDATED,
      status: TransactionStatus.FAIL
    });
    return;
  }

  // update ui to pending
  dispatch({
    type: TRANSACTION_STATUS_UPDATED,
    status: TransactionStatus.PENDING
  });

  var response = await api.post("/transactions", { tx_hash });

  // dispatch button update
  var status =
    response.data === "0x1"
      ? TransactionStatus.SUCCESS
      : TransactionStatus.FAIL;

  dispatch({
    type: TRANSACTION_STATUS_UPDATED,
    status
  });
}
