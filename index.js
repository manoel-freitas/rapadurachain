const Blockchain = require('./BlockChain')
const Block = require('./Block')
const chain = new Blockchain()
const luxon = require('luxon').DateTime
const randomString = require('randomstring')

for (let index = 0; index < 15; index++) {
    try {
        console.log('Mining blog: ', index);
        
        chain.addBlock(new Block(
                index+1,
                luxon.local().toISODate(),
                randomString.generate({
                    length: 8,
                    charset: 'alphabetic'
                })
            )
        )
        
    } catch (error) {
        console.log(error);
        console.log('Sua corrente ta quebrada')
        return 
    }
}