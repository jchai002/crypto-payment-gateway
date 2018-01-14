import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import wallet from "./walletReducer";
import payment from "./paymentReducer";
import appointment from "./appointmentReducer";

const reducer = combineReducers({
  routing: routerReducer,
  appointment,
  web3,
  wallet,
  payment
});

export default reducer;
