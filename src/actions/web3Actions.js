import { getWeb3 } from "util/web3";
import * as ActionTypes from "../constants/ActionTypes";

export function initializeWeb3() {
  return dispatch => {
    getWeb3().then(payload => {
      dispatch({
        type: ActionTypes.WEB3_INITIALIZED,
        payload
      });
    });
  };
}
