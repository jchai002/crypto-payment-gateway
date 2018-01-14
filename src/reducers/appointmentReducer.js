import { SESSION_DATA_FETCHED } from "app/constants/ActionTypes";

export default function(
  state = {
    provider: null,
    patient: null,
    costUSD: 0,
    costETH: 0,
    costToken: 0,
    loading: true
  },
  action
) {
  if (action.type === SESSION_DATA_FETCHED) {
    return { ...action.payload, loading: false };
  }

  return state;
}
