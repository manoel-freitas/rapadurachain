const Block = require('./Block')
const Transaction = require('./Transaction')
const dateTime = require('luxon').DateTime

class Blockchain{
    constructor() {
        this._chain = [this.createGenesisBlock()];
        this._difficulty = 20
        this._pendingTransactions = [];
        this._miningReward = 100;

    }

    createGenesisBlock() {
        return new Block(0, dateTime.local().toISOTime(), "Genesis block", "0");
    }

    getLatestBlock() {
        return this._chain[this._chain.length - 1];
    }

    createTransaction(transaction) {
        this._pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this._pendingTransactions);
        block.mineBlock(this._difficulty);
        
        this._chain.push(block);
    
        this._pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    getBalanceOfAddress(address){
        let balance = 0; 
    
        for(const block of this.chain){
            for(const trans of block.transactions){
    
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
    
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
    
        return balance;
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
