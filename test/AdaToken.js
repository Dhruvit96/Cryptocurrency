const AdaToken = artifacts.require("./AdaToken");

contract('AdaToken', (accounts) => {
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