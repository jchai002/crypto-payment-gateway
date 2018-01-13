import store from "app/store";
import { getWalletInfo } from "app/actions/walletActions";
import { getEtherBalance, getTokenBalance } from "app/util/web3";

export function pollForAccountUpdate() {
  setTimeout(async () => {
    var web3 = store.getState().web3;
    var metamaskAddress = web3.eth.accounts[0];
    var storedAddress = store.getState().wallet.address;
    var storedETHBalance = store.getState().wallet.etherBalance;
    var storedTokenBalance = store.getState().wallet.tokenBalance;

    // update account display if address or balance changes
    if (
      metamaskAddress !== storedAddress ||
      storedETHBalance !== (await getEtherBalance()) ||
      storedTokenBalance !== (await getTokenBalance())
    ) {
      store.dispatch(getWalletInfo());
    }
    pollForAccountUpdate();
  }, 800);
}
