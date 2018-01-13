import * as ActionTypes from "../constants/ActionTypes";

export default function(
  state = {
    web3: null
  },
  action
) {
  if (action.type === ActionTypes.WEB3_INITIALIZED) {
    return action.payload || null;
  }

  return state;
}
