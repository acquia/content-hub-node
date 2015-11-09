var request = require('request');
var contentHubAuth = require('./content-hub-auth.js');

// Instantiate Content Hub Auth.
var authInstance = new contentHubAuth();

function ContentHubClient(apikey, secretkey, origin, baseurl) {
  this.config = {
    baseurl: baseurl,
    apikey: apikey,
    secretkey: secretkey,
    origin: origin
  };
}

ContentHubClient.prototype = {

  // Timestamp
  date: new Date().toUTCString(),

  // Provider
  provider: 'Acquia',

  // Algorithm
  algorithm: 'sha256',

  contentType: 'application/json',

  // Register Client
  registerClient: function(name, callback) {
    var options;
    options = this._prepareOptions({
      method: 'POST',
      body: {
        name: name
      },
      path: '/register'
    });

    return this._request(options, callback);
  },

  // Create an Entity
  createEntity: function(resource, callback) {
    var options;
    options = this._prepareOptions({
      method: 'POST',
      body: {
        'resource': resource
      },
      path: '/entities'
    });
    return this._request(options, callback);
  },

  // Read an Entity
  readEntity: function(uuid, callback) {
    var options;
    options = this._prepareOptions({
      method: 'GET',
      path: '/entities/' + uuid
    });
    return this._request(options, callback);
  },

  // Update an Entity
  updateEntity: function(resource, uuid, callback) {
    var options;
    options = this._prepareOptions({
      method: 'PUT',
      body: {
        'resource': resource
      },
      path: '/entities/' + uuid
    });
    return this._request(options, callback);
  },

  // Read an Entity
  deleteEntity: function(uuid, callback) {
    var options;
    options = this._prepareOptions({
      method: 'DELETE',
      path: '/entities/' + uuid
    });
    return this._request(options, callback);
  },

  // Protected Methods
  _request: function(options, callback) {
    request(options, function(err, response, body){
      if (err) {
        return callback(err, {
          status: "fail",
          response: response
        });
      }
      else {
        callback(body);
      }
    });
    return this;
  },

  _signRequest: function(signature) {
    return this.provider + ' ' + this.config.apikey + ':' + signature;
  },

  _prepareOptions: function(op) {
    if(!('headers' in op)){
      op.headers = {};
    }
    if (op.body == null) {
      op.body = '';
    }
    op.url = this.config.baseurl + op.path;
    op.headers['content-type'] = this.contentType;
    op.headers['X-Acquia-Plexus-Client-Id'] = this.config.origin;
    op.headers['Date'] = this.date;
    var message = authInstance.getMessage(op.method, JSON.stringify(op.body), op.headers['content-type'], op.headers['Date'], '', op.path);
    var signature = authInstance.getSignature(this.algorithm, message, this.config.secretkey);
    op.headers['Authorization'] = this._signRequest(signature);
    op.json = true;
    return op;
  }
};

module.exports = ContentHubClient;
