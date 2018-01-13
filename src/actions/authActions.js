import {
  SESSION_EXCHANGE_EXPIRED,
  SESSION_EXCHANGE_UNAUTHORIZED,
  SESSION_EXCHANGE_AUTHORIZED
} from "app/constants/ActionTypes";
import { SESSION_DATA_FETCHED } from "app/constants/ActionTypes";
import { getDollarToETHRate, getETHToICashRate } from "app/util/currency";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

export function getUserSessionData(authorization, exchange_id) {
  return async dispatch => {
    var res = await api.post("/get-user-session-data", {
      authorization,
      exchange_id
    });
    if (res === "unauthorized") {
      return dispatch({
        type: SESSION_EXCHANGE_UNAUTHORIZED
      });
    }
    if (res === "expired") {
      return dispatch({
        type: SESSION_EXCHANGE_EXPIRED
      });
    }
    let { username, amount_usd } = res.data;
    if (username) {
      dispatch({
        type: SESSION_EXCHANGE_AUTHORIZED
      });
      let amountInETH = await getDollarToETHRate(amount_usd);
      let amountInToken = await getETHToICashRate(amountInETH);
      return dispatch({
        type: SESSION_DATA_FETCHED,
        payload: {
          username,
          amountInUSD: amount_usd,
          amountInETH,
          amountInToken
        }
      });
    }
  };
}
