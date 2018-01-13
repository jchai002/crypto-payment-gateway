pragma solidity ^0.4.15;

import "./deps/MintableToken.sol";

contract WellToken is MintableToken {
    string public constant name = "WellToken";
    string public constant symbol = "Well";
    uint8 public constant decimals = 18;

    // overriders the transfer function from BasicToken with a few more requires
    function transfer(address _to, uint256 _value) public returns (bool) {
      // prevents narcissism
      require(_to != address(0));
      // sender must have enough tokens
      require(_value <= balances[msg.sender]);
      // value can't be 0 or negative
      require(_value > 0);
      // prevent overflow
      require(balances[_to] + _value > balances[_to]);

      // SafeMath.sub will throw if there is not enough balance.
      balances[msg.sender] = balances[msg.sender].sub(_value);
      balances[_to] = balances[_to].add(_value);
      Transfer(msg.sender, _to, _value);
      return true;
    }
}
