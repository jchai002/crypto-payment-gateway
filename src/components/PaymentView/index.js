import React, { Component } from "react";
import { connect } from "react-redux";
import { getSessionData } from "../../actions/authActions";
import { payWithEther, payWithToken } from "../../actions/exchangeActions";
import * as TransactionStatus from "../../constants/TransactionStatus";
import ethereumLogo from "app/assets/images/eth.png";

@connect(
  ({ web3, exchange }) => ({
    web3: web3.web3Instance,
    exchange
  }),
  { getSessionData, payWithEther, payWithToken }
)
export default class Payment extends Component {
  componentWillMount() {
    this.props.getSessionData();
  }

  renderMessage() {
    const {
      status,
      username,
      amountInUSD,
      amountInETH,
      amountInToken
    } = this.props.exchange;

    if (status === TransactionStatus.PENDING) {
      return (
        <div className="message flex flex-align-center">
          <img
            className="eth-logo animated infinite pulse"
            src={ethereumLogo}
            role="presentation"
          />
          <p className="ml-2">
            Please wait, your transaction is being verified.
          </p>
        </div>
      );
    }
    if (status === TransactionStatus.FAILED) {
      return (
        <div className="message">
          <p>
            Sorry, your transaction failed to process. You can try again or
            notify our staff.
          </p>
        </div>
      );
    }
    if (status === TransactionStatus.SUCCESS) {
      return (
        <div className="message">
          <p>
            Congratulations, your transaction has been verified! Here is a link
            to your waiting room{" "}
            <a className="link" href="#">
              Waiting Room
            </a>
          </p>
        </div>
      );
    }

    return (
      <div className="message">
        <p>
          Hi {username}, please confirm that you want to pay{" "}
          <span className="amount">${amountInUSD}</span> for a physician
          consultation.
        </p>
        <p>
          At the current exchange rate, this is equivalent to{" "}
          <span className="amount">{Number(amountInETH).toFixed(3)}</span> ETH
          or <span className="amount">{Number(amountInToken).toFixed(3)}</span>{" "}
          Well Tokens.
        </p>
      </div>
    );
  }

  renderButtons() {
    const { status, amountInETH, amountInToken } = this.props.exchange;
    if (status !== TransactionStatus.SUCCESS) {
      return (
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={() => this.props.payWithEther(amountInETH)}
            disabled={status === TransactionStatus.PENDING}
          >
            Pay with Ether
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.props.payWithToken(amountInToken)}
            disabled={status === TransactionStatus.PENDING}
          >
            Pay with Well Tokens
          </button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="container payment">
        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            <div className="payment__box">
              <h2>Pay with Ether or Well Tokens</h2>
              {this.renderMessage()}
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
