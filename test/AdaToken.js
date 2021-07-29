const AdaToken = artifacts.require("./AdaToken");

contract('AdaToken', (accounts) => {

    it('initializes the contract with correct value', function () {
        return AdaToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function (name) {
            assert.equal(name, 'ADA Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function (symbol) {
            assert.equal(symbol, 'ADA', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function (standard) {
            assert.equal(standard, 'ADA Token v1.0', 'has the correct standard');
        })
    })

    it('set Total supply', () => {
        return AdaToken.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then((totalSupply) => {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets total supplies')
            return tokenInstance.balanceOf(accounts[0]);
        }).then((adminBalance) => {
            assert.equal(adminBalance.toNumber(), 1000000, 'allocates the initial supply to admin account.')
        })
    })
})