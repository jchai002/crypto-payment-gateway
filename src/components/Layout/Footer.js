import React, { Component } from "react";
import { connect } from "react-redux";
import { getWalletInfo } from "../../actions/walletActions";

@connect(({ wallet }) => ({ wallet }), { getWalletInfo })
export default class Header extends Component {
  render() {
    return (
      <footer>
        <div className="wallet">
          <p>{this.props.wallet.address}</p>
        </div>
      </footer>
    );
  }
}
