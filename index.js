const Blockchain = require('./BlockChain')
const Block = require('./Block')
const chain = new Blockchain()
const luxon = require('luxon').DateTime
const randomString = require('randomstring')

for (let index = 0; index < 15; index++) {
    try {
        chain.addBlock(new Block(
                index+1,
                luxon.local().toISODate(),
                randomString.generate({
                    length: 8,
                    charset: 'alphabetic'
                })
            )
        )
        
        chain._chain[0].data = '';
    } catch (error) {
        console.log(error);
        console.log('Sua corrente ta quebrada ohhh otario')
        return 
    }
}


console.log('====================================');
console.log(chain.isChainValid());
console.log('===================================='); 

console.log('====================================');
console.log(chain._chain.length, ...chain._chain   );
console.log('====================================');