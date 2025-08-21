# How to Use Wit/Oracle on Celo

The Witnet multichain decentralized oracle enables smart contracts to realize their true potential by giving them access to all sorts of valuable data sets, and by attesting and delivering that information securely thanks to its strong cryptoeconomic guarantees.

Witnet can power most DeFi primitives like price feeds, stablecoins, synthetics, etc., as well as acting as a reliable source of randomness for creating uniqueness in NFTs.


## How To Use Witnet Price Feeds

Witnet price feeds can be integrated into your own Celo Mainnet contracts in two different ways:

1. [Integrate through proxy](https://docs.witnet.io/smart-contracts/witnet-data-feeds/using-witnet-data-feeds#reading-multiple-currency-pairs-from-the-router) Recommended for testing and upgradability.
   This is the preferred way to consume the Witnet-powered price feeds. Through using the ***Price Feeds Router***.

2. [Integrate directly](https://docs.witnet.io/smart-contracts/witnet-data-feeds/using-witnet-data-feeds#reading-last-price-and-timestamp-from-a-price-feed-contract-serving-a-specific-pair) Optimized for gas cost and decentralization

The ***WitnetPriceRouter*** smart contract is deployed in all the [supported chains](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses) and allows your own smart contracts and Web3 applications to get the latest price of any of the [supported currency pairs](https://docs.witnet.io/smart-contracts/witnet-data-feeds/price-feeds-registry#currency-pairs) by providing the identifier of the pair to a single Solidity method. This removes the need to know the actual contract addresses handling the price updates from the Witnet oracle.

### Reading multiple price pairs from the router

**WitnetProxy**

- *Alfajores*: [0x1111AbA2164AcdC6D291b08DfB374280035E1111](https://alfajores.celoscan.io/address/0x1111AbA2164AcdC6D291b08DfB374280035E1111)
- *Mainnet*: [0x1111AbA2164AcdC6D291b08DfB374280035E1111](https://celo.blockscout.com/address/0x1111AbA2164AcdC6D291b08DfB374280035E1111)


The Witnet Proxy contract is the easiest and most convenient way to consume Witnet price feeds on any of the [supported chains](https://docs.witnet.io/smart-contracts/supported-chains).

#### Solidity example

The example below shows how to read the price of two different assets from the Witnet Price Router:

```javascript
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";

contract MyCeloContract {
    IWitnetPriceRouter immutable public router;

    /**
     * IMPORTANT: pass the WitnetPriceRouter address depending on 
     * the network you are using! Please find available addresses here:
     * https://docs.witnet.io/smart-contracts/price-feeds/contract-addresses
     */
    constructor(IWitnetPriceRouter _router))
        router = _router;
    }

    /// Returns the BTC / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getBtcUsdPrice() public view returns (int256 _price) {
        (_price,,) = router.valueFor(bytes4(0x24beead4));
    }

    /// Returns the ETH / USD price (6 decimals), ultimately provided by the Witnet oracle.
    function getEthUsdPrice() public view returns (int256 _price) {
        (_price,,) = router.valueFor(bytes4(0x3d15f701));
    }

    /// Returns the BTC / ETH price (6 decimals), derived from the ETH/USD and 
    /// the BTC/USD pairs that were ultimately provided by the Witnet oracle.
    function getBtcEthPrice() public view returns (int256 _price) {
        return (1000000 * getBtcUsdPrice()) / getEthUsdPrice();
    }
}
```

#### Javascript example

You may also read the latest price of supported currency pairs from your **Web3** application by interacting directly with the Price Router contract:

```javascript
web3 = Web3(Web3.HTTPProvider('https://forno.celo.org'))
abi = '[{ "inputs": [{ "internalType": "bytes32", "name": "_id", "type": "bytes32" }], "name": "valueFor", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]'
addr = '0x1111AbA2164AcdC6D291b08DfB374280035E1111'
contract = web3.eth.contract(address=addr, abi=abi)
// get last value for "Price-CELO/USD-6"
valueFor = contract.functions.valueFor().call("0x9ed884be")
print("Price-CELO/USD-6:", valueFor[0])
print("> lastTimestamp:", valueFor[1])
print("> latestUpdateStatus:", valueFor[2])
```

### Feeds supported
A complete list of publicly available Witnet data feeds on Celo can be found in the Witnet Data Feeds website: [https://feeds.witnet.io/celo](https://feeds.witnet.io/celo)

[Request a new price feed on Celo](https://tally.so/r/w46p6O) or [Create your own data feed](https://docs.witnet.io/smart-contracts/witnet-web-oracle/make-a-get-request).


## How to use WitnetRandomness
Witnet provides secure, unbiased, on-chain randomness on EVM-compatible chains (including Celo) via its WitnetRandomness contract.

### ⚙️ How It Works
Crowd‑witnessed random seed generation
A randomized subset of Witnet nodes each generate secret random bytes, commit and later reveal them. These are deterministically aggregated into a tamper‑proof seed—unbiased and unpredictable as long as at least one witness is honest.

The WitnetRandomness contract is already deployed on Celo and other supported chains. It exposes a simple interface via IWitnetRandomness, available in the witnet‑solidity‑bridge npm package
- Alfajores: [0xC0FFEE98AD1434aCbDB894BbB752e138c1006fAB](https://alfajores.celoscan.io/address//0xC0FFEE98AD1434aCbDB894BbB752e138c1006fAB)

- Mainnet: [0xC0FFEE98AD1434aCbDB894BbB752e138c1006fAB](https://celo.blockscout.com/address/0xC0FFEE98AD1434aCbDB894BbB752e138c1006fAB)

This very basic example shows how easy is to source random uint32 values into your own contracts:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol";

contract MyContract {

    uint32 public randomness;
    uint256 public latestRandomizingBlock;
    IWitnetRandomness immutable public witnet;
    
    /// @param _witnetRandomness Address of the WitnetRandomness contract.
    constructor (IWitnetRandomness _witnetRandomness) {
        assert(address(_witnetRandomness) != address(0));
        witnet = _witnetRandomness;
    }
    
    receive () external payable {}

    function requestRandomNumber() external payable {
        latestRandomizingBlock = block.number;
        uint _usedFunds = witnet.randomize{ value: msg.value }();
        if (_usedFunds < msg.value) {
            payable(msg.sender).transfer(msg.value - _usedFunds);
        }
    }
    
    function fetchRandomNumber() external {
        assert(latestRandomizingBlock > 0);
        randomness = witnet.random(type(uint32).max, 0, latestRandomizingBlock);
    }
}

```

For more information about Wit/Oracle please refer to:

[website](https://witnet.io/) | [docs](https://docs.witnet.io/) | [github](https://github.com/witnet) | [twitter](https://twitter.com/witnet_io) | [telegram](https://t.me/witnetio) | [discord](https://discord.gg/witnet) 

