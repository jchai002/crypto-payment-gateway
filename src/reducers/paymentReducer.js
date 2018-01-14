import { TRANSACTION_STATUS_UPDATED } from "app/constants/ActionTypes";

export default function(
  state = {
    status: null,
    transaction_hash: null
  },
  action
) {
  switch (action.type) {
    case TRANSACTION_STATUS_UPDATED:
      return action.payload;
    default:
      return state;
  }
}
