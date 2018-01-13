import {
  SESSION_EXCHANGE_EXPIRED,
  SESSION_EXCHANGE_UNAUTHORIZED,
  SESSION_EXCHANGE_AUTHORIZED
} from "app/constants/ActionTypes";
import { UNAUTHORIZED, AUTHORIZED, EXPIRED } from "app/constants/AuthStatus";

export default function(
  state = {
    status: null
  },
  action
) {
  if (action.type === SESSION_EXCHANGE_EXPIRED) {
    return {
      status: EXPIRED
    };
  }

  if (action.type === SESSION_EXCHANGE_UNAUTHORIZED) {
    return {
      status: UNAUTHORIZED
    };
  }

  if (action.type === SESSION_EXCHANGE_AUTHORIZED) {
    return {
      status: AUTHORIZED
    };
  }

  return state;
}
