var AdaToken = artifacts.require("../contracts/AdaToken.sol");

module.exports = function (deployer) {
  deployer.deploy(AdaToken);
};
