import React, { Component } from "react";
import { connect } from "react-redux";
import { getAppointmentInfo } from "../../actions/appointmentActions";
import { payWithEther, payWithToken } from "../../actions/exchangeActions";
import * as TransactionStatus from "../../constants/TransactionStatus";
import ethereumLogo from "app/assets/images/eth.png";

@connect(
  ({ appointment, web3, exchange }) => ({
    appointment,
    web3: web3.web3Instance,
    exchange
  }),
  { getAppointmentInfo, payWithEther, payWithToken }
)
export default class Payment extends Component {
  componentWillMount() {
    this.props.getAppointmentInfo();
  }

  renderMessage() {
    const { costETH, costToken, provider, patient } = this.props.appointment;
    const { status } = this.props.exchange;

    if (status === TransactionStatus.PENDING) {
      return (
        <div className="message flex flex-align-center">
          <img
            className="eth-logo animated infinite pulse"
            src={ethereumLogo}
            role="presentation"
          />
          <p className="ml-2">
            Please wait while your transaction is being verified with the
            ethereum network.
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
          <p>Your transaction has been verified!</p>
          <p>
            Please proceed to the{" "}
            <a className="link" href="https://tele.joinwell.com">
              waiting room
            </a>{" "}
            and Dr. {provider.lname} will attend to you shortly.
          </p>
        </div>
      );
    }

    return (
      <div className="message">
        <p>
          Hi {patient.fname} {patient.lname}, looks like you have chosen the
          direct pay option for a consultation with Dr. {provider.fname}{" "}
          {provider.lname}.
        </p>
        <p>
          You have the choice of paying with{" "}
          <span className="amount">{Number(costETH).toFixed(3)}</span> ETH or{" "}
          <span className="amount">{Number(costToken).toFixed(3)}</span>{" "}
          WellTokens.
        </p>
      </div>
    );
  }

  renderButtons() {
    const { status } = this.props.exchange;
    const { costETH, costToken, provider, patient } = this.props.appointment;

    console.log(provider, patient);
    if (status !== TransactionStatus.SUCCESS) {
      return (
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={() =>
              this.props.payWithEther(costETH, provider.id, patient.id)
            }
            disabled={status === TransactionStatus.PENDING}
          >
            Pay with Ether
          </button>
          <button
            className="btn btn-primary"
            onClick={() =>
              this.props.payWithToken(costToken, provider.id, patient.id)
            }
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
    if (this.props.appointment.loading) {
      return <div>loading...</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="payment">
              {this.renderMessage()}
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
