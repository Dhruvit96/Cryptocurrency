var AdaToken = artifacts.require('./AdaToken.sol');
var AdaTokenSale = artifacts.require("./AdaTokenSale.sol");

contract('AdaTokenSale', (accounts) => {
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000;
    it('initializes the contract with the correct values', () => {
        return AdaTokenSale.deployed().then((instance) => {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then((address) => {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then((address) => {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then((price) => {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
})
