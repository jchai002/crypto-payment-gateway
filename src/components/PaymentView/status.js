if (status === TransactionStatus.PENDING) {
  return (
    <div className="message flex flex-align-center">
      <img
        className="eth-logo animated infinite pulse"
        src={ethereumLogo}
        role="presentation"
      />
      <p className="ml-2">Please wait, your transaction is being verified.</p>
    </div>
  );
}
if (status === TransactionStatus.FAILED) {
  return (
    <div className="message">
      <p>
        Sorry, your transaction failed to process. You can try again or notify
        our staff.
      </p>
    </div>
  );
}
if (status === TransactionStatus.SUCCESS) {
  return (
    <div className="message">
      <p>
        Congratulations, your transaction has been verified! Here is a link to
        your waiting room{" "}
        <a className="link" href="#">
          Waiting Room
        </a>
      </p>
    </div>
  );
}
