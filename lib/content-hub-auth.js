var crypto = require('crypto');

var contentHubAuth = function() {
  var self = this;

  // Method to generate Hashed Body.
  self.getHashedBody = function (body) {
    return crypto.createHash('md5').update(body).digest('hex');
  };

  // Method to create Message used in HMAC signature generation.
  self.getMessage = function (method, body, contentType, date, customHeaders, path) {
    return (method + '\n'
      + self.getHashedBody(body) + '\n'
      + contentType + '\n'
      + date + '\n'
      + customHeaders + '\n'
      + path);
  };

  // Method to HMAC Signature.
  self.getSignature = function (algorithm, message, secretKey) {
    return crypto.createHmac(algorithm, secretKey).update(message).digest('base64');
  }

};

module.exports = contentHubAuth;
