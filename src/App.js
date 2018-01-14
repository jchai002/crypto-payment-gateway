import React, { Component } from "react";
import { connect } from "react-redux";
import "app/assets/styles/app.scss";
import { initializeWeb3 } from "app/actions/web3Actions";
import { getWalletInfo } from "app/actions/walletActions";

import Header from "app/components/Layout/Header";
import { pollForAccountUpdate } from "app/util/polling";
import caduceus from "app/assets/images/caduceus.svg";

@connect(
  ({ web3, wallet }) => ({
    web3,
    wallet
  }),
  {
    initializeWeb3,
    getWalletInfo
  }
)
export default class App extends Component {
  componentDidMount() {
    // wait for web3 before we do anything
    this.props.initializeWeb3();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.wallet.address) {
      // only get wallet if not logged in
      return this.props.getWalletInfo();
    }
    if (nextProps.wallet.address) {
      return pollForAccountUpdate();
    }
  }

  renderView() {
    if (!this.props.web3) {
      // if web3 not found
      return (
        <div className="unauthenticated">
          <p>
            This Dapp requires the{" "}
            <a target="_blank" className="link" href="https://metamask.io/">
              MetaMask
            </a>{" "}
            Chrome extension. You can{" "}
            <a
              target="_blank"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              className="link"
            >
              download it here
            </a>.
          </p>
        </div>
      );
    } else if (!this.props.wallet.address) {
      // if wallet address not found
      return (
        <div className="unauthenticated">
          <p>
            This Dapp requires you to be signed into an Ether wallet with the{" "}
            <a target="_blank" className="link" href="https://metamask.io/">
              MetaMask
            </a>{" "}
            Chrome extension.
          </p>
        </div>
      );
    } else {
      return <div className="authenticated">{this.props.children}</div>;
    }
  }
  render() {
    return (
      <div className="app">
        <Header />
        <main className="container">{this.renderView()}</main>
        <img className="caduceus" src={caduceus} role="presentation" />
      </div>
    );
  }
}
