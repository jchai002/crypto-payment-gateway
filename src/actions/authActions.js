import { SESSION_DATA_FETCHED } from "app/constants/ActionTypes";
import { getDollarToETHRate, getDollarToTokenRate } from "app/util/currency";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

export function getSessionData() {
  return async dispatch => {
    var res = await api.post("/get-session");
    dispatch({
      type: SESSION_DATA_FETCHED,
      payload: res.data
    });
  };
}
