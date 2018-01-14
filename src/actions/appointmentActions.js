import { SESSION_DATA_FETCHED } from "app/constants/ActionTypes";
import { exchangeDollarToETH, exchangeDollarToToken } from "app/util/currency";
import axios from "axios";
const api = axios.create({ baseURL: "/v1" });

export function getAppointmentInfo() {
  return async dispatch => {
    var res = await api.post("/get-appointment");

    // hard code cost, should come from wellApp api
    const costUSD = 80;
    const costETH = await exchangeDollarToETH(costUSD);
    const costToken = await exchangeDollarToToken(costUSD);

    dispatch({
      type: SESSION_DATA_FETCHED,
      payload: { ...res.data, costUSD, costETH, costToken }
    });
  };
}
