import { GET_WALLET_INFO_SUCCESS } from "app/constants/ActionTypes";
import {
  getWalletAddress,
  getEtherBalance,
  getTokenBalance
} from "app/util/web3";

export function getWalletInfo(web3) {
  return async dispatch => {
    let address = await getWalletAddress();
    let etherBalance = await getEtherBalance(address);
    let tokenBalance = await getTokenBalance();
    dispatch({
      type: GET_WALLET_INFO_SUCCESS,
      payload: { address, etherBalance, tokenBalance }
    });
  };
}
