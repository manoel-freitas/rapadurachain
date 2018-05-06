const SHA256 = require('crypto-js/sha256')

class Block {
    constructor( timestamp, transactions, previousHash = '') {
        this._previousHash = previousHash;
        this._timestamp = timestamp;
        this._transactions = transactions;
        this._hash = this.calculateHash();
        this._nonce = 0;
    }

    calculateHash() {
        return SHA256(this._previousHash + this._timestamp + JSON.stringify(this._transactions) + this._nonce).toString();
    }
    
    mineBlock(difficulty) {
        while (this._hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this._nonce++;
            this._hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this._hash);
    }

}

module.exports = Block
