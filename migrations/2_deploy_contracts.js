var AdaToken = artifacts.require("../contracts/AdaToken.sol");
var AdaTokenSale = artifacts.require("../contracts/AdaTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(AdaToken, 1000000).then(() => {
    let tokenPrice = 10000000;
    return deployer.deploy(AdaTokenSale, AdaToken.address, tokenPrice)
  });
};
