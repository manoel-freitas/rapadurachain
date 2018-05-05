const Block = require('./Block')
const dateTime = require('luxon').DateTime
class Blockchain{
    constructor() {
        this._chain = [this.createGenesisBlock()];
        this._difficulty = 20;
    }

    createGenesisBlock() {
        return new Block(0, dateTime.local().toISOTime(), "Genesis block", "0");
    }

    getLatestBlock() {
        return this._chain[this._chain.length - 1];
    }

    addBlock(newBlock) {
      
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this._difficulty);
        this._chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 0; i < this._chain.length; i++){
            const currentBlock = this._chain[i];
            const previousBlock = this._chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (!previousBlock) {
                continue;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
