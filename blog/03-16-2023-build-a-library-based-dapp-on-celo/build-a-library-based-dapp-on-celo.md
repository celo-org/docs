---
title: Build a library-based daop on Celo
description: Some ways to use library in solidity
authors:
  - name: Isaac Jesse
    title: Web3, Smart Contract Developer
    url: https://github.com/bobeu
    image_url: https://github.com/bobeu.png
tags: [advanced, solidity, hardhat, celosage]
hide_table_of_contents: true
slug: /tutorials/build-a-library-based-dapp-on-celo
---

![header](../../src/data-tutorials/showcase/advanced/build-a-library-based-dapp-on-celo.png)

## Introduction

Writing a robust smart contract relies on different factors. These factors range from understanding solidity concepts and conventions such as types, global variables, interfaces, libraries e.t.c. Library as one is a bit vast in scope hence developers should familiarize with this concept so as to maximize its usage. 

## Prerequisites​

Library in solidity is categorized under the advanced concept. To grab the full weight of this tutorial, you're expected to know solidity programming  
- For tutorials on how to get started with solidity, please refer to **[here](https://docs.celo.org/blog/tutorials/)**.

## Requirements​

Install the following tools:

- An editor. VSCode recommended.
- NodeJs version >=14.0.0. I recommend that you use v18.12.1
- [How to setup and configure hardhat](https://docs.celo.org/blog/tutorials/advance-hardhat-configuration-on-celo-using-plugins).

**Smart contracts**

It is assumed that you have followed the link above and completed the hardhat setup. In your new setup, navigate to the 'contracts' folder and create a structure as follows:

- contracts - _top-level folder_
  - account - _folder_
  - interfaces - _folder_
  - lib - _folder_
  - reward - _folder_
  - Vault.sol - _file_


Before we proceeed, let's understand what we're building. Our contracts will perform decentralized swapping of both ERC20 tokens to $Celo and ERC20 to ERC20. This is an extension of the previous contracts that were found **[here](https://github.com/bobeu/nft-gated-dapp-dexHosting/README.md)**.

We will use `Vault.sol` as the main deployable contract while the libraries go in `lib` folder. The Vault contract will perform two categories of swap:

1. Exchanging ERC20 assets for $CELO coin.
2. Exchanging ERC20 assets for another.

For safety, we will employ the use of detatched contract that will be launched internally when a user first interact with the main contract. In their subsequent interactions, the main contract will first search the storage if an account has previouly been created and mapped to the caller otherwise a new account is created for the user. After unstaking their $Celo, we will only allow them to withdraw via the internally mapped account. By so doing, we remove the single point of failure since the main contract does not hold Celo.

- `contracts/account/Account.sol`

```js
  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

  import "../lib/libraryAsUtility/Utility.sol";
  import "../interfaces/IAccount.sol";

  contract Account is IAccount {
    error UnAuthorizedCaller(address);
    event CeloReceived(uint);

    // Owner's address
    address private owner;

    // Reward token
    IERC20 private rewardToken;

    constructor(IERC20 _rewardToken) payable {
      owner = msg.sender;
      rewardToken = _rewardToken;
    }
    
    //Fallback
    receive() external payable {
      emit CeloReceived(msg.value);
    }

    // Only owner can call when this is invoked
    modifier onlyOwner() {
      if(msg.sender != owner) revert UnAuthorizedCaller(msg.sender);
      _;
    }

    ///@dev Withdraw Celo of @param amount : amount to withdraw from contract 
    function withdrawCelo(address to) external onlyOwner {
      uint balance = address(this).balance;
      (bool success,) = to.call{value: balance}("");
      require(success, "withdrawal failed");
    }

    ///@dev Withdraw reward token 
    function withdrawERC20(address to) external onlyOwner {
      uint balance = IERC20(rewardToken).balanceOf(address(this));
      if(balance >  0) require(IERC20(rewardToken).transfer(to, balance), "Failed");
    } 
  }
```
The `Account` contract is uniquely mapped to each user while ownership is transfered to the user at construction/deployment. The only way we update the reward token is via the constructor. To withdraw $CELO coin, owner will call the `withdrawCelo` function while `withdrawERC20` withdraws ERC20 tokens.

We will make interfaces for `Account`, `RewardToken` and `Vault` contracts.

- interfaces
  - IAccount.sol
  - IERC20.sol
  - IVault.sol

For the sake of this tutorial, we write a mock token in `reward` folder to be used as reward for staking $CELO.

>Note: We'd want the owner's privilege for the main contract so it will be the sole caller of the `mint` function.

- `contracts/reward/RewardToken.sol`

```js
  // SPDX-License-Identifier: UNLICENSED
  pragma solidity 0.8.17;

  import "../account/Account.sol";
  import "./ERC20.sol";

  contract RewardToken is ERC20 {
    uint public maxSupply;

    address public owner;

    constructor (address _owner, uint _maxSupply) ERC20("RewardToken", "RTK") {
      require(_maxSupply > 0, "Zero supply");
      maxSupply = _maxSupply * (10**18);
      owner = _owner;
    }

    function mint(address to, uint amount) external returns(bool) {
      require(msg.sender == owner, "Not Authorized");
      _mint(to, amount);
      return true;
    }
    
  }
```

**Libraries**

All of the libraries we'll use reside in the `lib` folder. Libraries can be used in different contexts. In this case, we are going to use it two different contexts.


1. library as utility

Using library as utility is a way of moving reusable code that should have reside in the main contract (s) elsewhere . Some of these code could be seperated into modifiers as well but the advantage (s) of doing so could be either to reuse code, avoid redundancy or anything else. Example of such library-based utility contract is the "Openzeppelin's SafeMath library".

`contracts/libraryAsUtility/Utility.sol`

To explain a few of the utitilities,

- `assertChained_2` ensures that the two conditional paramters evaluate to true simultaneously otherwise execution terminates and the related `errormessasge` is returned. 

>Note: The first argument in a library function can be used to invoke it. For example, `assertChained_2` can be invoked by the type of the first argument. 
```js 
uint n = 4; uint m = 2;

function testZero(bool a, bool 2, string memory err1, string memory err2) internal {
  bool(n > 0).assertChained_2(m > 0, 'n is zero', 'm is zero');
}
```
From the example, in the `testZero()`, we use boolean constructor to evaluate the expression `n > 0` to either 'true' or 'false'. The result will a 'bool' type which has same type with the first argument in the `testZero` function hence the function can be invoked using the result of the expression.

- 

```js
  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

  import "@openzeppelin/contracts/utils/Address.sol";
  import "@openzeppelin/contracts/utils/math/SafeMath.sol";
  import "../../interfaces/IERC20Extended.sol";

  library Utility {
    using Address for address;
    using SafeMath for uint256;

    // ///@dev Requires the three conditions to be true 
    function assertChained_2(bool a, bool b, string memory errorMessage1, string memory errorMessage2) internal pure {
      require(a, errorMessage1);
      require(b, errorMessage2);
    }

    ///@dev Requires the three conditions to be true 
    function assertEqual(bool condition, bool value, string memory errorMessage) internal pure {
      require(condition == value, errorMessage);
    }
    
    function assertUintGT(uint a, uint b, string memory errorMessage) internal pure {
      require(a > b, errorMessage);
    }

    ///@dev Requires either of the conditions to be true 
    function assertEither(bool a, bool b, string memory errorMessage) internal pure {
      require(a || b, errorMessage);
    }

    function getAndCompareAllowance(address token, address owner, address beneficiary, uint comparedTo) internal view returns(uint allowance) {
      allowance = IERC20Extended(token).allowance(owner, beneficiary);
      require(allowance >= comparedTo, "Allowance value is too low");
      return allowance;
    }

    function transferToken(address token, address to, uint amount) internal {
      require(IERC20Extended(token).transfer(to, amount), 'Failed');
    }

    function transferAllowance(uint amount, address token, address owner, address recipient) internal returns(uint) {
      require(IERC20Extended(token).transferFrom(owner, recipient, amount), "Operation failed");
      return amount;
    }

    function calculateReward(uint stakedAmt, uint depositTime, uint divisor) internal view returns(uint reward) {
      uint curTime = block.timestamp;
      if(curTime == depositTime) {
        reward = 10 ** 15;
        return reward;
      }

      if(curTime > depositTime) {
          uint timeDiff = curTime.sub(depositTime);
          if(timeDiff > 0){
              reward = timeDiff.mul(stakedAmt).div(divisor); // Weighted reward
          } else {
              reward = 1e15;
          }

      }
      return reward;
    }

    /// Mint rewardToken to staker on staking receipt
    function mintRewardToken(address to, address token, uint amount) internal {
      require(IERC20Extended(token).mint(to, amount), "Error minting");
    }
  }
```

1. library as storage.

Do not be confused with the context name, libraries in solidity cannot have state variables, and so they cannot hold any variable data but for data that are constant i.e variables whose values are known ahead of time and do not change in form or context. We are only going to use it to access and modify storage that exist elsewhere. In a nutshell, the code in this library file will be executed in the context of the contract that invokes it. This opens up more use cases as we can deploy as many libraries we want and connect multiple contracts to them by simply referencing the libraries addresses. 

`contracts/libraryAsStorage/VaultLib.sol`

- `StorageData` is the type of storage data that this library will be compatible with.  

```js
  // SPDX-License-Identifier: MIT
  pragma solidity 0.8.17;

  import '../../interfaces/IVault.sol';
  import '../../account/Account.sol';

  struct StorageData {
    uint minimumStake;
    uint stakersCount;
    IERC20 token;
    IVault.Pair[] pairs;
    mapping (address => bool) supportedTokens;
    mapping (address => mapping(address => mapping(address => IVault.Staker))) stakers;
  }

  library VaultLib {
    using Address for address;
    using Utility for *;
    using SafeMath for uint256;

    event Staked(uint);
    event Unstaked(uint);

    function setRewardToken(StorageData storage self, address _token) internal {
      Address.isContract(_token).assertEqual(true, "Only contract address is allowed");
      self.token = IERC20(_token);
    }

    function setSupportedToken(StorageData storage self, address token) internal {
      if(self.supportedTokens[token]) revert IVault.TokenAlreadySupported(token);
      self.supportedTokens[token] = true;
    }

    function validateId(StorageData storage self, uint pairId) internal view {
      require(pairId < self.pairs.length, "Invalid id");
    }

    function setUpTokenPair(StorageData storage self, address tokenA, address tokenB, uint8 earnRate, uint _minStake) internal {
      bool(earnRate < 101).assertEqual(true, "Rate should be less than 101");
      bool(tokenA != address(0)).assertChained_2(tokenB != address(0), 'TokenA is zero', 'TokenB is zero');
      bool(self.supportedTokens[tokenB]).assertChained_2(self.supportedTokens[tokenA], "TokenB not supported", "TokenA not supported");
      bool(self.supportedTokens[tokenB] && self.supportedTokens[tokenA]).assertEqual(true, "Tokens not supported");
      uint liq = tokenB.getAndCompareAllowance(msg.sender, address(this), _minStake).transferAllowance(tokenB, msg.sender, address(this));
      self.pairs.push(IVault.Pair(tokenA, tokenB, earnRate, _minStake, liq, true));
    }

    function stakeToken(StorageData storage self, uint pairId) internal {
      validateId(self, pairId);
      self.stakersCount ++;
      IVault.Pair memory pr = self.pairs[pairId];
      pr.isOpen.assertEqual(true, "Locked");
      bool(pr.liquidity > 10 * (10 ** 18)).assertEqual(true, "No liquidity for this pair");
      bool(pr.tokenA != address(0)).assertChained_2(pr.tokenB != address(0), "TokenA is zero", "TokenB is zero");
      address to = address(this);
      address alc = self.stakers[msg.sender][pr.tokenA][pr.tokenB].account;
      uint stake = pr.tokenA.getAndCompareAllowance(msg.sender, to, pr.minimumStake).transferAllowance(pr.tokenA, msg.sender, to);
      self.stakers[msg.sender][pr.tokenA][pr.tokenB] = IVault.Staker(_now(), stake, 0, alc);
    }

    function unstakeToken(StorageData storage self, uint pairId) internal {
      validateId(self, pairId);
      IVault.Staker memory stk = getStakeProfile(self, msg.sender);
      IVault.Pair memory pr = self.pairs[pairId];
      stk.stake.assertUintGT(0, "No stake");
      self.stakers[msg.sender][pr.tokenA][pr.tokenB].stake = 0;
      self.stakers[msg.sender][pr.tokenA][pr.tokenB].depositTime = 0;
      pr.tokenA.transferToken(msg.sender, stk.stake);
      uint reward = stk.stake.calculateReward(stk.depositTime, pr.rate);
      if(pr.liquidity < reward) {
        reward = pr.liquidity;
      }
      self.pairs[pairId].liquidity = pr.liquidity.sub(reward);
      if(self.pairs[pairId].liquidity < 10 * (10**18)) {
        self.pairs[pairId].isOpen = false;
      }
      pr.tokenB.transferToken(msg.sender, reward);
    }

    /**@dev Stake Celo for token reward.
     * - The amount of Celo sent along the call must be greater 
     *      than the minimum staking amount.
     * - We check if caller has existing account otherwise we 
     *      create a new account for them.
     * - We can make a dynamic staking i.e stakers can stake any amount
     *      Celo, anytime. Each stake is unique to another in timing and
     *      identity.
     */
    function _stake(StorageData storage self, address who, uint value) private returns(bool){
      address alc;
      IVault.Staker memory stk = getStakeProfile(self, who);
      if(value < self.minimumStake) revert IVault.ZeroValue(value);
      alc = stk.account;
      if(alc == address(0)) {
        alc = address(new Account(self.token));
      }

      if(stk.celoAmount > 0) {
        _unstake(self, alc, stk.celoAmount, stk.depositTime);
      }
      address _k = address(this);
      self.stakers[msg.sender][_k][_k] = IVault.Staker(_now(), 0, value, alc);
      self.stakersCount ++;
      emit Staked(value);

      return true;
    }

    function _unstake(StorageData storage self, address alc, uint value, uint depositTime) private {
      self.stakersCount --;
      address _k = address(this);
      self.stakers[msg.sender][_k][_k].celoAmount = 0;
      self.stakers[msg.sender][_k][_k].depositTime = 0;
      (bool sent,) = alc.call{value: value}("");
      require(sent, "Transfer rejected");
      uint reward = value.calculateReward(depositTime, 60);
      if(reward > 0) alc.mintRewardToken(address(self.token), reward);

      emit Unstaked(value);
    }

    ///@dev deposit $Celo to vault
    function stakeCelo(StorageData storage self, uint msgValue) internal returns(bool) {
      return _stake(self, msg.sender, msgValue);
    }

    ///@dev Stake on behalf of @param who Account to stake for
    function stakeOnBehalf(StorageData storage self, address who, uint value) internal returns(bool) {
      require(msg.sender != who, "please use designated function");
      return _stake(self, who, value);
    }

    /**@dev Unstake Celo from the vault.
     */
    function unstake(StorageData storage self) internal returns(bool) {
      address _k = address(this);
      IVault.Staker memory stk = self.stakers[msg.sender][_k][_k];
      if(stk.celoAmount == 0) revert IVault.NoStakingDetected(stk.celoAmount);
      require(stk.account != address(0), "Account anomally detected");
      _unstake(self, stk.account, stk.celoAmount, stk.depositTime);

      return true;
    }

    ///@dev Returns current unix time stamp
    function _now() internal view returns(uint) {
        return block.timestamp;
    }

    function getStakeProfile(StorageData storage self, address who) internal view returns(IVault.Staker memory) {
      address _k = address(this);
      return self.stakers[who][_k][_k];
    } 

    ///@dev returns account of @param who : any valid address
    function withdraw(StorageData storage self) public {
      address alc = getStakeProfile(self, msg.sender).account;
      IAccount(alc).withdrawCelo(msg.sender);
      IAccount(alc).withdrawERC20(msg.sender);
    }

  }
```























- Clone the project or use it as a template, then clone it to your computer.

```bash
git clone https://github.com/bobeu/persistent-dapp-on-celo-using-wagmi.git
```

- Navigate to the root folder

```bash
cd persistent-dapp-on-celo-using-wagmi/backend
```

- Install dependencies

```bash
yarn install
```

All files in the contract folder remain intact as we extend its functionalities by adding a non-fungible asset using the Openzeppelin library.

## contracts

- `SwapLab.sol` contains the main contract functions for adding and removing liquidity and swapping Celo's ERC20 token for the $Celo coin.

- `TestToken.sol` has the asset code we will use for testing the swap contract.

- Add a new folder named `erc721` under the contract folder.
  - The OZ's ERC721 contract module with path `@openzeppelin/contracts/interfaces/IERC721.sol` is a standard interface for interacting with non-fungible tokens on the blockchain. But we need to extend its reach so we can mint a membership token with the ability to cancel it. On the frontend, we'll require that users own a membership nft before they can interact with the Dapp.

  - `contracts/interfaces/IERC721Extended.sol`

  ```js
  // SPDX-License-Identifier: MIT
  pragma solidity  0.8.17;

  import "@openzeppelin/contracts/interfaces/IERC721.sol";
  import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
  import "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";

  interface IERC721Extended is IERC721, IERC721Receiver, IERC721Metadata {
    function burn(uint256 tokenId) external returns(bool);
    function mint() external payable returns(bool);
  }
  ```

  - You would notice I included separately `ERC721.sol` and `ERC721Pausable.sol`. Sometimes, this is my way of doing things. You don't have to do it my way. We can simply import the circuit-breaker extended `ERC721Pausable.sol` in the final token deployable file.

  - `Membership.sol`
    - Import and inherit `Pausable.sol` and `Ownable.sol` from the openzeppelin modules.

    - Previously, we declared two additional function interfaces. It then becomes imperative that we implement these functions in the current file. Here, we implement the `mint` and `burn` functions.

    - The `notZeroAddress` modifier ensures that the target address is not empty.

    - NFTs are unique properties or elements of a collection. They could share similar parents i.e be part of a collection but are never the same in properties. To introduce uniqueness, we generate a new NFT by increasing `tokenId`.

    - User addresses that have minted the membership nft are kept in `isMember` storage for reference purposes. This method ensures that no address can mint twice.

    - To encourage users to mint our membership nft, we have lowered the swapping fee. But they need to pay a tiny amount in order to have their membership minted. This method has introduced a vulnerability that we need to guard against. A user could mint and transfer or resell to other users. We do not want this to happen. To prevent the occurrence of such an event, we will intercept to place a barrier in the internal function by overriding `_transfer()` so that no one is able to transfer membership. The right to do this is given to the owner.

    - We effected the circuit breaker by implementing the `pause` and `unpause` functions.

  ```js
  // SPDX-License-Identifier: Unlicense

  pragma solidity  0.8.17;

  import "./ERC721Pausable.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";

  contract Membership is Ownable, ERC721Pausable {
    error ZeroAddress(address);

    uint public tokenId;
    mapping (address => bool) public isMember;

    /**
      @dev Enforces that @param target - must not be empty
            address.
    */
    modifier notZeroAddress(address target) {
      if(target == address(0)) revert ZeroAddress(target);
      _;
    }

    //Initialize state vars
    constructor () ERC721("SwapLab User", "SLU") {
    }

    receive() external payable {
      revert();
    }

    /**
      @notice Mint Membership NFT
            Owner's privilege.
              o 'TokenId' must not have been minted before now.
                o No user can have more than one membership NFT.
    */
    function mint() public payable returns(bool) {
      require(msg.value >= 1e16 wei, "Insufficient value");
      require(!isMember[_msgSender()], "Already a user");
      isMember[_msgSender()] = true;
      tokenId ++;
      uint tk = tokenId;
      (bool sent,) = owner().call{value: msg.value}('');
      require(sent, "Failed");
      _safeMint(_msgSender(), tk);
      _approve(_msgSender(), tk);

      return true;
    }

    ///@dev Burns 'tokenId' Note - Owner's privilege
    function burn(uint _tokenId) external onlyOwner returns(bool) {
      _burn(_tokenId);

      return true;
    } 

    /** See ERC721 _transfer. Membership is not transferable*/
    function _transfer(address from, address to, uint256 _tokenId ) internal override
    {
      require(paused() || _msgSender() == owner(), "Tansfer not alloowed");
      super._transfer(from, to, _tokenId);
    }

    /** @dev Halts contract execution */
    function pause() public onlyOwner 
    {
      _pause();
    }

    /** @dev Continues contract execution */
    function unpause() public onlyOwner 
    {
      _unpause();
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 _tokenId,
        bytes calldata data
    ) external override returns (bytes4) {}
  }
  ```

- Compile

```bash
npx hardhat compile
```

![image](images/2.png)

- Testing

I have modified the test file to ensure that no function runs unless the nft balance of the calling account is more significant than zero.

```bash
npx hardhat test
```

![image](images/3.png)

- Deploy

The hardhat config file already has the right configuration to enable us to deploy to the Celo testnet.

```bash
yarn deploy
```

Deployment artifacts are saved in the `deployments` folder.

## Frontend

This project is NFT-gated hence users will be denied access to the Dapp interactive page unless they already owned our nft. We will build intelligence that automatically detects if users own membership nft otherwise we'll ask them to mint first before granting them access.

Exit the current directory into the root folder and install the dependencies:

```bash
cd ..
cd frontend
yarn install
```

The project uses wagmi to manage the Dapp. To know how to set up the wagmi project, please refer to the **[previous tutorial](https://docs.celo.org/blog/tutorials/build-a-feature-rich-persistent-dapp-on-celo-using-wagmi)**.

We are going to modify the `components/App` directory. Only two files are in this folder - `CardComponent.tsx` and `index.tsx`. Both the landing and interactive pages are contained in the index file. We need to separate them so users can be routed to the landing page if their wallet is not activated otherwise they're shown the interactive view but will be disabled if no membership is detected. Let's separate the file as follows:

- `components/App/Home/index.tsx`

We will transfer the content of the landing page into this file.

```ts
import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { ConnectKitButton } from 'connectkit';

export function Home () {
  return (
    <main >
      <Box sx={{ bgcolor: '', pt: 16, pb: 6, }}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="rgb(150, 150, 150)"
            gutterBottom
            mt={2}
          >
            Decentralized Token swap powered by Celo
          </Typography>
          <Typography variant="h6" align="center" color="rgba(150, 150, 150, 0.7)" paragraph>
            Exchange ERC20 compatible token for $CELO
          </Typography>
          <Typography variant="overline" align="center" color="green" paragraph>
            Built by <span style={{color: 'rgba(170, 170, 170, 0.9)'}}><a href="https://github.com/bobeu/">Isaac J.</a></span> for Celo developers - #celosage
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <ConnectKitButton />
          <Button variant="outlined">
            <Link color="rgba(150, 150, 150, 0.8)" sx={{
              '&:hover': {
                border: 'rgba(100, 100, 100, 0.5)'
              }
            }} href="https://github.com/bobeu/feature-rich-persistent-dapp-on-celo-using-wagmi" underline='none'>Source code</Link> 
          </Button>
        </Stack>
        
      </Container>
    </Box>
  </main>
  )
}
```

- `components/App/Mint/index.tsx`

In this file, we mint new membership nft for new users. In the useEffect function, we watch for the user's balance and compare if greater than zero to authenticate them.

The component renders a button that calls `handleMint` when clicked. If the operation is successful, it will be hidden and the Dapp component is rendered.

```ts
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material//Typography';
import Container from '@mui/material//Container';
import React from 'react';
import { useAccount } from 'wagmi';
import runContractFunc from '../../apis';
import { SignUprops } from '../../../interfaces';
import { Spinner } from '../../Spinner';
import green from '@mui/material/colors/green';

const FUNC_NAME = 'mint';

export function Mint (props: SignUprops) {
  const [ loading, setLoading ] = React.useState<boolean>(false);
  const { handleClick, setauth, isUser } = props;
  const { address, isConnected, connector } = useAccount();

  React.useEffect(() => {
    const endtask = new AbortController();
    const refetchData = async() => {
      if(connector) {
        const provider = await connector?.getProvider();
        if(isConnected) {
          if(provider) {
            const bal = await runContractFunc({
              account: address,
              providerOrSigner: provider,
              functionName: 'nftBalance'
            });
            if(bal.balanceOrAllowance.toString() > '0') {
              setauth();
            }
          }
        }
      }
    }
    refetchData();
    return () => endtask.abort();
  }, [isConnected]);

  const handleMint = async() => {
    setLoading(true);
    await handleClick(FUNC_NAME);
    setLoading(false);
  }

  return (
    <Container maxWidth={isUser ? 'xs' : 'md'}>
      <Stack>
        <Typography component='button' variant='h5' color='rgba(150, 150, 150, 0.7)'>Membership Not Found</Typography>
        <Typography component='button' variant='h5' color='rgba(150, 150, 150, 0.7)'>To interact with this Dapp, Please mint membership NFT</Typography>
        <Button
          fullWidth
          variant='contained'
          endIcon={loading? <Spinner color={'white'} /> : 'Proceed to mint'}
          onClick={handleMint}
          sx={{
            background:green[700],
            color: 'whitesmoke',
            '&:hover': {
              background: 'rgba(150, 150, 150, 0.3)',
            }
          }}
        />
      </Stack>
    </Container>
  )
}
```

- `components/App/AppProtected/index.tsx`

  Move the content of the previous `App/index.tsx` into this file and make the following changes.

  - import the `Mint` component. By default, if the user does not own the $SLU nft, the button components are disabled until otherwise proven true.

  ```ts
  import getContractData from '../../apis/contractdata';
  import { Mint } from '../Mint';
  ```

  - We dynamically hide some components based on the outcome of the `Mint` component using `getOpacity` function. Every child components in the `Stack` component are blurred out when `getOpacity` returned 0 vice versa.

  ```ts
    const getOpacity = () => {
      return isUser? 1 : 0
    }
  ```

  - Add an additional case block to the switch statement in the `afterTrx` function that watches for 'mint' to be true. The nft balance from the resulting operation from `handleClik` is extracted and passed to `afterTrx`. Then in the `mint` case, we set the pass by calling `setauth` if the balance is greater than zero. In your Dapp, you'd want to handle it in a manner that allows your Dapp read from a collection of nfts, and you can filter out the current user.

  ```ts
    const afterTrx = (x:string, result: Result) => {
    switch (x) {
      case 'swap':
        setData(result.data);
        setAllowance(result.balanceOrAllowance);
        break;
      case 'approve':
        setAllowance(result.balanceOrAllowance);
        break;
      case 'clearAllowance':
        setAllowance(result.balanceOrAllowance);
        break;
      case 'addLiquidity':
        setData(result.data);
        break;
      case 'removeLiquidity':
        setData(result.data);
        break;
      case 'mint':
        if(result.balanceOrAllowance.toString() > '0') setauth();
        break;
      default:
        setData(result.data);
        break;
    }      
  }
  ```

- Since we reduced the swap fee in the SwapLab contract, we will affect it on the frontend. A place to do that is in the `handleClick` function.

Reset the conditional statement that checks if functionName equals `'swap'`, then set the swap fee in variable `value` to 1e14 wei equivalent to 0.0001 Celo.

Set additional statement to check for `'mint'` function, then set `value` to 1e16 wei. For the first time that the mint function is executed for the current user, if no error is thrown, then a membership nft is minted for the user. We can then set the pass to true.  

```ts
    const handleClick = async(functionName: string, flag?:boolean) => {
    if(flag && functionName !== 'approve' && amount === 0) return alert('Please enter amount');
    if(functionName === 'addLiquidity') {
      if(value === '0') return alert('Please set value');
    }
    setLoading(true);
    const provider = await connector?.getProvider();
    
    try {
      const amt = BigNumber(amount);
      let val = ethers.utils.parseEther(value);
      if(functionName === 'swap') val = ethers.utils.parseEther('0.0001');
      if(functionName === 'mint') val = ethers.utils.parseEther('0.01');
      console.log("Val", val.toString())
      const result = await runContractFunc({
        functionName: functionName,
        providerOrSigner: provider,
        amount: ethers.utils.hexValue(ethers.utils.parseUnits(amt.toString())),
        cancelLoading: () => setLoading(false),
        account: address,
        value: val
      });
      if(functionName === 'mint') setAuth(true);
      afterTrx(functionName, result);
   
    } catch (error: any) {
      if(error) {
        const result = await runContractFunc({
          functionName: 'getData',
          providerOrSigner: provider,
        })
        afterTrx('getData', result);
        setError(error?.reason || error?.data.message || error?.message);
        setLoading(false);
        console.log("Error1", error?.reason|| error?.message || error?.data.message);
      }
    }
  }
```

Now, let's run the program. In the frontend directory, run

```bash yarn
yarn run dev
```

```bash npm
npm run dev
```

If everything works correctly, you should have the view as follows.

- Landing page

![image](images/4.png)

- Page after the provider is activated but membership nft is not yet minted, and the buttons are disabled.

![image](images/7.png)

- Transaction is being broadcasted.

![image](images/6.png)

- After nft is minted.

![image](images/5.png)

## Deploying to decentralized hosting service

At this point, our Dapp's frontend is ready to be deployed to a hosting service. Although there are a couple of decentralized hosting services that we could consider, I have selected to deploy to "Spheron" for its easy, simple, and faster deployment rate.

Firstly, let us understand what decentralized hosting means. Just as the name implies, it is a method of uploading or storing data to a server not owned and controlled by a central authority. Unlike centralized counterpart, decentralized service uses distributed networks most of which resemble blockchain. When files are uploaded, they're hashed into compartments and distributed across nodes of the computer so that no single node is able to claim the monopoly of storage.

Spheron provides an easy method of deploying Dapps to developers. With a few clicks, you're there. [Read more](https://spheron.network/). To deploy on either Filecoin or IPFS using Spheron, you will need to sign up on the [website](https://spheron.network/). Select the convenient method. It is recommended to authenticate using GitHub so as to easily extract repositories.  

- ![image](images/8.png)

Thereafter, follow these steps:

- After you're logged in, click on dashboard, then 'New Project' at the top right-hand corner.

  - ![image](images/13.png)

- Select the repository to link and give permissions to the app.

  - ![image](images/11.png)

- Connect using your favorite provider.

  - ![image](images/9.png)

>Note: Be sure to trust the app you are granting permission to access your GitHub account.

- Review to select the desired permission. For me, I'd prefer to allow access to selected repositories.

  - ![image](images/10.png)

- Next step is to pick a protocol. I have selected IPFS.

  - ![image](images/14.png)

- Review the deployment settings

  - ![image](images/15.png)

  - In the `ROOT DIRECTORY` column, we will type `'frontend/` as the root directory to deploy from.

  - Pick `Nextjs` as the `FRAMEWORK` and leave the build command as it is.
  - Under the `Node Engine`, be sure to select Node version 16 and above otherwise you'd likely get a build error. Then Click `deploy`.
    - ![image](images/16.png)

- While deploying, you can inspect the deploy log for the failed attempt.
![image](images/18.png)

- From the log, you can find the stream information such as the content hash.

![image](images/19.png)

- Deploy success.

![image](images/17.png)

**Demo**

This Dapp is deployed to IPFS using Spheron, and you can interact with it via this **[link](https://nft-gated-dapp-dexhosting-1b22e1.spheron.app/)**

The complete code for this tutorial can be found **[here](https://github.com/bobeu/nft-gated-dapp-dexHosting)**.

## Conclusion​

Congratulation on completing this tutorial. You're a step away from building your dream Dapp on Celo. So far, we have learned to build a full Dapp using solidity, compile, test, and deployed to Celo Alfajores. We also build an interface for users to interact with what we've built. Lastly, we deployed the Dapp to a decentralized hosting service - Spheron. If you're for more tutorials relating to Celo, **[here](https://docs.celo.org/blog/tutorials/)** is a place to get started.

## What next?

​
Are you thinking of launching your own project on the Celo blockchain right now? Kindly visit the **[developers documentation](https://docs.celo.org/tutorials)**.

## About the Author​

**Isaac Jesse** , aka _Bobelr_ is a smart contract/Web3 developer. He has been in the field since 2018, worked as an ambassador with several projects like Algorand and so on as a content producer. He has also contributed to Web3 projects as a developer.

## References​

- [Celo developers resources](https://docs.celo.org/developer/)
- [Source code](https://github.com/bobeu/nft-gated-dapp-dexHosting)
- [Wagmi doc](https://wagmi.sh/)
- [Spheron](https://spheron.network/)
