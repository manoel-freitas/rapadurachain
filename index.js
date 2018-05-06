const Blockchain = require('./BlockChain')
const Transaction = require('./Transaction')
const chain = new Blockchain()
const luxon = require('luxon').DateTime
const randomNumber = require('random-number')

for (let index = 0; index < 15; index++) {
        chain.createTransaction(
            new Transaction(
                "0001",
                "002",
                randomNumber.generator({
                    min: 0,
                    max: 10,
                    integer: true
                })
            )
        )
}
console.log(luxon.local().toJSON());

chain.minePendingTransactions(200)

console.log(luxon.local().toJSON());