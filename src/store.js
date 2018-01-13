import { browserHistory } from "react-router";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import reducers from "./reducers";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
);

export default store;
