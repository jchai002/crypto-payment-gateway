import React, { Component } from "react";
import { connect } from "react-redux";
import { getWalletInfo } from "../../actions/walletActions";
import wellLogo from "app/assets/images/well_logo.png";

@connect(({ wallet }) => ({ wallet }), { getWalletInfo })
export default class Header extends Component {
  render() {
    var etherBalance = this.props.wallet.etherBalance
      ? this.props.wallet.etherBalance.toFixed(3)
      : 0;
    var tokenBalance = this.props.wallet.tokenBalance
      ? this.props.wallet.tokenBalance.toFixed(3)
      : 0;
    return (
      <header>
        <div className="nav-desktop">
          <div className="logo">
            <img src={wellLogo} role="presentation" />
          </div>
          <div className="balances">
            <p>
              ETH: <span className="amount">{etherBalance}</span>
            </p>
            <p>
              Well Token: <span className="amount">{tokenBalance}</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}
