const Web3 = require('web3')
const path = require('path')
const cjson = require('cjson')
const TX = require('ethereumjs-tx')
// contract details
const provider = 'https://rinkeby.infura.io/v3/4cad0f8fff194767a30cc70a441b3bf9'
const contractAddress = '0xAD064C83DAF3c7362B895c59977cB962C0d1F772'
const privateKey = new Buffer('bd6560b1784b0cd1710f3a91132ed7cfaafe5be6a5f25dde6c208ea5a506edb4', 'hex')
const defaultAccount = '0xA0Cad3fc0C052d8b5fF8fc323A18BD40c18E9223'
const etherscanLink = 'https://rinkeby.etherscan.io/tx/'
// initiate the web3
const web3 = new Web3(provider)
// initiate the contract with null value
var contract = null;
// convert Wei to Eth
function convertWeiToEth( stringValue ) {
 if ( typeof stringValue != 'string' ) {
 stringValue = String( stringValue );
 }
 return web3.utils.fromWei( stringValue, 'ether' );
}
// Initiate the Contract
function getContract() { 
 if (contract === null) {
 var abi = cjson.load(path.resolve(__dirname, '../ABI/abi.json'));
 var c = new web3.eth.Contract(abi,contractAddress)
 contract = c.clone();
 }
 console.log('Contract Initiated successfully!')
 return contract;
}
// Send Signed Transaction
async function sendSignTransaction(rawTrans) {
 // Initiate values required by the dataTrans
 if (rawTrans) {
 var txCount = await web3.eth.getTransactionCount(defaultAccount) // needed for nonce
 var abiTrans = rawTrans.encodeABI() // encoded contract method 
 
 var gas = await rawTrans.estimateGas()
 var gasPrice = await web3.eth.getGasPrice()
 gasPrice = Number(gasPrice)
 gasPrice = gasPrice * 2
 var gasLimit = gas * 4
// Initiate the transaction data
 var dataTrans = {
 nonce: web3.utils.toHex(txCount),
 gasLimit: web3.utils.toHex(gasLimit),
 gasPrice: web3.utils.toHex(gasPrice), 
 to: contractAddress,
 data: abiTrans 
 }
 
 // sign transaction
 var tx = new TX(dataTrans)
 tx.sign(privateKey)
// after signing send the transaction
 return await sendSigned(tx)
 } else {
 throw new console.error('Encoded raw transaction was not given.');
 }
 
}
function sendSigned(tx) {
 return new Promise(function(resolve,reject){
 // send the signed transaction
 web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
 .once("transactionHash", function(hash){
 var result = {
 'status':'sent',
 'url': etherscanLink + hash,
 'message':'click the given url to verify status of transaction'
 }
// respond with the result

resolve(result)
 })
 .then(out => {console.log(out)})
 .catch(err => {
 // respond with error
 reject(err)
 })
 })
}

async function getCorruptionLevel(res) {
   // get the token balance of the given address
    var corrLevel = await getContract().methods.getCorruptionLevel();
   // response data back to requestor
    return res.send({
    'Token Balance': corrLevel
    })
   }

module.exports = {
    getCorruptionLevel: getCorruptionLevel
}