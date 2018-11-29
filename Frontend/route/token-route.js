const token = require('../lib/token')
function init(app) {
 const path = '/token'
 

 
 // endpoint to transfer token from Contract
 // there's must be existing token inside the contract to send token
 // otherwise, 0 token to send to give address
 app.get(path+'/getCorruptionLevel', token.getCorruptionLevel)
 

}
module.exports = init;