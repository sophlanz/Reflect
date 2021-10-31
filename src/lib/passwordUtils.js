const crypto = require ('crypto');

function genPassword (password) {
    //creating unique salt for a particular user
  var salt =  crypto.randomBytes(16).toString('hex');
    //hashing users salt and password with iteration of 10000
 var genHash =  crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString('hex');
    return {
        salt: salt,
        hash: genHash
    }
};
   
    

function validatePassword (password,hash,salt) {
    //hashing the password given in the user request with the salt in the database
    var hashVerify = crypto.pbkdf2Sync(password,salt, 10000, 512, "sha512").toString('hex');
    
    //checks to see if generated hash is equal to database hash
    return hash === hashVerify;
};

module.exports.genPassword = genPassword;
module.exports.validatePassword = validatePassword;