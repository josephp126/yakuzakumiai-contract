# Personax

### Configuration

- copy `sample.env` file and rename it `.env` file and update the values

```dotenv
ETHERSCAN_API_KEY=6A33T19TI7WQVPP268I1Q9HDU9ZHVHZ2IB
# Update this to your real wallet private ke
PRIVATE_KEY="FILL PRIVATE KEY HERE"     
RINKEBY_RPC=https://rinkeby.infura.io/v3/859f217886ed4c58aada5e127e2ebe7b
MAIN_RPC=https://mainnet.infura.io/v3/859f217886ed4c58aada5e127e2ebe7b
```

- Update the `contracts/YakuzaKumiaiSale.sol` file




### Deploy

After the contract code files are generated under `/src/contracts`, do the deploy.

After deploy, you can continue with the verification

```shell
$npx hardhat --network homestead run scripts/deploy.js
```
