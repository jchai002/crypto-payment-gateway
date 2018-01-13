import { GET_WALLET_INFO_SUCCESS } from "app/constants/ActionTypes";

export default function(
  state = {
    address: null,
    etherBalance: null,
    tokenBalance: null
  },
  action
) {
  if (action.type === GET_WALLET_INFO_SUCCESS) {
    return action.payload;
  }

  return state;
}
