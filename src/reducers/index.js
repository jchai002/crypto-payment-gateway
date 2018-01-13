import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3 from "./web3Reducer";
import wallet from "./walletReducer";
import exchange from "./exchangeReducer";
import auth from "./authReducer";

const reducer = combineReducers({
  routing: routerReducer,
  auth,
  web3,
  wallet,
  exchange
});

export default reducer;
