const AdaToken = artifacts.require("./AdaToken");

contract('AdaToken', (accounts) => {
    let tokenInstance;
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

    it('allocates the initial supply upon development', () => {
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

    it('transfers token owenership', () => {
        return AdaToken.deployed().then((instance) => {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 777777777777);
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert.')
            return tokenInstance.transfer.call(accounts[1], 250000, { from: accounts[0] });
        }).then((success) => {
            assert.equal(success, true, 'true');
            return tokenInstance.transfer(accounts[1], 250000, { from: accounts[0] });
        }).then((receipt) => {
            assert.equal(receipt.logs.length, 1, 'triggers one events')
            assert.equal(receipt.logs[0].event, 'Transfer', '"Transfer event"')
            assert.equal(receipt.logs[0].args._from, accounts[0], "account 0")
            assert.equal(receipt.logs[0].args._to, accounts[1], "account 1")
            assert.equal(receipt.logs[0].args._value, 250000, "value")

            return tokenInstance.balanceOf(accounts[1]);
        }).then((balance) => {
            assert.equal(balance.toNumber(), 250000, 'add the amount to the receiving account')
            return tokenInstance.balanceOf(accounts[0]);
        }).then((balance) => {
            assert.equal(balance.toNumber(), 750000, 'deducts the amount from the sending account')
        })
    })
})