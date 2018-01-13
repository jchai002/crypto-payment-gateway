import {
  SESSION_DATA_FETCHED,
  TRANSACTION_STATUS_UPDATED
} from "app/constants/ActionTypes";

export default function(
  state = {
    username: null,
    amountInETH: null,
    amountInUSD: null,
    amountInToken: null,
    status: null
  },
  action
) {
  switch (action.type) {
    case SESSION_DATA_FETCHED:
      let {
        username,
        amountInUSD,
        amountInETH,
        amountInToken
      } = action.payload;
      return { ...state, username, amountInUSD, amountInETH, amountInToken };
    case TRANSACTION_STATUS_UPDATED:
      let { status } = action;
      return { ...state, status };
    default:
      return state;
  }
}
