pragma solidity ^0.4.15;

import './deps/Crowdsale.sol';
import './deps/MintableToken.sol';
import './WellToken.sol';

contract WellTokenCrowdsale is Crowdsale, Destructible {
    function WellTokenCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet)
        Crowdsale(_startTime, _endTime, _rate, _wallet)
    {

    }

    function createTokenContract() internal returns (MintableToken) {
        return new WellToken();
    }
}
