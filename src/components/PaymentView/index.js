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
    const {
      costUSD,
      costETH,
      costToken,
      provider,
      patient
    } = this.props.appointment;
    console.log(this.props.appointment);

    const cost = 30;
    return (
      <div className="message">
        <p>
          Hi {patient.fname} {patient.lname}, looks like you are seeking a
          consultation with Dr. {provider.fname} {provider.lname}.
        </p>
        <p>
          The appointment costs <span className="amount">${costUSD}</span>, at
          the current exchange rate, this is equivalent to{" "}
          <span className="amount">{Number(costETH).toFixed(3)}</span> ETH or{" "}
          <span className="amount">{Number(costToken).toFixed(3)}</span> Well
          Tokens.
        </p>
      </div>
    );
  }

  renderButtons() {
    const { status } = this.props.exchange;
    const { costETH, costToken } = this.props.appointment;

    if (status !== TransactionStatus.SUCCESS) {
      return (
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={() => this.props.payWithEther(costETH)}
            disabled={status === TransactionStatus.PENDING}
          >
            Pay with Ether
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.props.payWithToken(costToken)}
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
          <div className="col-12 mx-auto">
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
