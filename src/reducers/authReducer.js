import { SESSION_DATA_FETCHED } from "app/constants/ActionTypes";

export default function(
  state = {
    provider: null,
    patient: null
  },
  action
) {
  if (action.type === SESSION_DATA_FETCHED) {
    return action.payload;
  }

  return state;
}
