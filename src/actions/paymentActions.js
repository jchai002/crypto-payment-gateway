import { TRANSACTION_STATUS_UPDATED } from "../constants/ActionTypes";
import * as TransactionStatus from "app/constants/TransactionStatus";
import * as promisedWeb3 from "app/util/web3";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

export function payWithEther(amount, provider_id, patient_id) {
  return async dispatch => {
    let transaction_hash = await promisedWeb3.sendEther(amount);
    postTransactionToServer(
      dispatch,
      transaction_hash,
      provider_id,
      patient_id
    );
  };
}

export function payWithToken(amount, provider_id, patient_id) {
  // should be faceOff wallet address
  return async dispatch => {
    let transaction_hash = await promisedWeb3.sendToken(amount);
    postTransactionToServer(
      dispatch,
      transaction_hash,
      provider_id,
      patient_id
    );
  };
}

async function postTransactionToServer(
  dispatch,
  transaction_hash,
  provider_id,
  patient_id
) {
  if (typeof transaction_hash === "undefined") {
    dispatch({
      type: TRANSACTION_STATUS_UPDATED,
      payload: { status: TransactionStatus.FAIL, transaction_hash: null }
    });
    return;
  }

  // update ui to pending
  dispatch({
    type: TRANSACTION_STATUS_UPDATED,
    payload: { status: TransactionStatus.PENDING, transaction_hash }
  });

  var response = await api.post("/transactions", {
    transaction_hash,
    provider_id,
    patient_id
  });

  // dispatch button update
  var status =
    response.data === "0x1"
      ? TransactionStatus.SUCCESS
      : TransactionStatus.FAIL;

  dispatch({
    type: TRANSACTION_STATUS_UPDATED,
    payload: { status, transaction_hash }
  });
}
