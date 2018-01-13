# React, Redux and Authentication Well Wallet

In addition to Webpack and React, this box adds: react-router, redux and redux-auth-wrapper for authentication powered by a smart contract.

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Ensure truffle.js exported JSON has this object
    ```javascript
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        }
    }
    ```

3. Run the Ethereum development console.
    ```javascript
    testrpc
    ```

4. Compile and migrate the smart contracts.
    ```javascript
    truffle compile
    truffle migrate
    ```

5. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    truffle test
    ```

7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // Run Jest outside of the development console for front-end component tests.
    npm run test
    ```

8. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    npm run build
    ```

## Login Flow

The overall flow goes something like this:

* The log in form dispatches an action creator which triggers a POST to the server  
* The server validates login credentials and returns a valid JWT or 401 Unauthorized response as needed  
* The original action creator parses the server response and dispatches success or failure actions accordingly  
* Success actions trigger an update of the auth state, passing along the token and any decoded data from the JWT payload  
* A higher-order authentication component receives the new auth state as props  
* If authentication was successful, the higher-order component renders its child component and passes the auth props down to it  
* Before mounting, the child fetches data from the server using the token it received from its parent wrapper  

## FAQ

* __How do I use this with the EthereumJS TestRPC?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 34 of `src/util/web3/getWeb3.js`.

* __Why is there both a truffle.js file and a truffle-config.js file?__

    `truffle-config.js` is a copy of `truffle.js` for compatibility with Windows development environments. Feel free to it if it's irrelevant to your platform.