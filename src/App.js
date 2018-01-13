import React, { Component } from "react";
import { connect } from "react-redux";
import "app/assets/styles/app.scss";
import { initializeWeb3 } from "app/actions/web3Actions";
import { getWalletInfo } from "app/actions/walletActions";
import { getUserSessionData } from "app/actions/authActions";
import { UNAUTHORIZED, EXPIRED } from "app/constants/AuthStatus";

import Header from "app/components/Layout/Header";
import { pollForAccountUpdate } from "app/util/polling";

@connect(
  ({ web3, wallet, auth }) => ({
    web3,
    wallet,
    auth
  }),
  {
    initializeWeb3,
    getWalletInfo,
    getUserSessionData
  }
)
export default class App extends Component {
  componentDidMount() {
    // wait for web3 before we do anything
    this.props.initializeWeb3();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.web3 && nextProps.auth.status === null) {
      // try to authorize
      const { authorization, exchange_id } = this.props.location.query
        ? this.props.location.query
        : null;
      if (authorization) {
        return this.props.getUserSessionData(authorization, exchange_id);
      }
    }
    if (!nextProps.wallet.address) {
      // only get wallet if not logged in
      return this.props.getWalletInfo();
    }
    if (nextProps.wallet.address) {
      return pollForAccountUpdate();
    }
  }

  renderView() {
    var { status } = this.props.auth;
    if (!this.props.web3) {
      // if web3 not found
      return (
        <div className="unauthenticated">
          <p>
            This Dapp requires the{" "}
            <a className="link" href="https://metamask.io/">
              MetaMask
            </a>{" "}
            Chrome extension. You can{" "}
            <a
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
            Please login with{" "}
            <a className="link" href="https://metamask.io/">
              MetaMask
            </a>
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
      </div>
    );
  }
}
