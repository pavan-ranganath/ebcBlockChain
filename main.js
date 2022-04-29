/*
 * This is the triala version of Block chain for educational purposes.
 * Block chain tutorial for ES-Blockchaintutorial
 */

/*
 * crypto functions are defined in crypto-js
 */
const SHA256 = require('crypto-js/sha256');

/*
* This defines whata a block looks like.
*   Block is a combination of following 4 items
*
*   1. index = position of the block; Our block chain Genesis block starts with
'0' index

*   2. timestamp = we difine timestamp in UTC string format. generally new
Date().toUTCString() output

*   3. data = This is the json data what we define as content of the block.
*       This one is the main assett which is being tracked and modified and
acted upon on our block.
*       Currently it is a any JSON string for this educational purposes.
*       In our real life example we use ebcToken transactions from a ebcMember
to an ebcMember.
*       If we track identitiy this one carries assett or ebcMembership data.
*       fromEbcMemberAdx or toEbcMemberAdx or public address ( publick key
hashed twice toget this address)
*
*   4. previousHash = hash of the last block of the chain which is a SHA256 hash
of all contents of the block
*       Genesis block previous hash is "000";
*
*   Methods defined in this Block class are
    1. calculateHash() =>
*/
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.hash = this.calculateHash();
    }

    /*
     * This method takes all four components of the block and creates a SHA256
     * hash of 64 characters Components are index, previoushash, timestamp, Json
     * data converted to string in that order.
     *
     */
    calculateHash() {
        return (SHA256(
                this.index + this.previousHash + this.timestamp +
                JSON.stringify(this.data)))
            .toString();
    }
}


/*
*
*   This is the ebcBlockChain. Here we define the an array of ebcBlocks as part
of this chain.
*   First Genesis block is created with
        '0' index,
        '000' previousHash
        "04/28/2022 19:27:00 UTC" its creation timestamp
        { "dummyData" : "First Genesis Block" } as its data

*/


/*
 * cbcBlockchain is initialized with genesis block which is a array of blocks
 */
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }


    createGenesisBlock() {
        const currentDate = new Date().toUTCString();


        return new Block(
            0, currentDate, {
                'dummyData': 'First Genesis Block'
            }, '000');
    }

    /*
    *
        This returns the latest block in the chain
    */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

/* here we create a new blockchain named as ebcBlockChain;
 */

let ebcBlockChain = new BlockChain();


// we create few initial blocks for this chain.
// First function block.

ebcBlockChain.addBlock(new Block(
    1, new Date('04/28/2022 10:00:00').toUTCString(), {
        'Name': 'memberA',
        'ebcToken': 5
    }));

// second function block.

ebcBlockChain.addBlock(new Block(
    2, new Date('04/28/2022 11:00:00').toUTCString(), {
        'Name': 'memberB',
        'ebcToken': 10
    }));

// Third functional block
ebcBlockChain.addBlock(new Block(
    1, new Date('04/28/2022 11:10:00').toUTCString(), {
        'Name': 'memberC',
        'ebcToken': 15
    }));

// second function block.

ebcBlockChain.addBlock(new Block(
    2, new Date('04/28/2022 11:50:00').toUTCString(), {
        'Name': 'memberD',
        'ebcToken': 100
    }));

console.log(JSON.stringify(ebcBlockChain, null, 5));