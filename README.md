# Content Hub Node Js Client

This is a simple Node Js client library for Content Hub. It's purpose is to communicate with the Content Hub API.

## Usage
```
var ContentHubClient = require('../lib/content-hub.js');

// Enter API Credentials.
baseUrl = '';
apiKey = 'your api key';
secretKey = 'your api secret key';
origin = '';
```

### Register a client
```
var client = new ContentHubClient(apiKey, secretKey, origin, baseUrl);
var clientName = 'any name'
client.registerClient(clientName, function(data) {
  if (data.uuid) {
    var origin = data.uuid;
    console.log(origin);
  }
  console.log(data);
});
```

### Create an entity to Content Hub
```
origin = 'your origin after client registration';
var client = new ContentHubClient(apiKey, secretKey, origin, baseUrl);
var resource = "http://site-url/yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyy"
client.createEntity(resource, function(data) {
  console.log(data);
});
```

### Read an entity from Content Hub
```
origin = 'your origin after client registration';
var client = new ContentHubClient(apiKey, secretKey, origin, baseUrl);
var uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
client.readEntity(uuid, function(data) {
  console.log(data);
});
```

### Delete an entity from Content Hub
```
origin = 'your origin after client registration';
var client = new ContentHubClient(apiKey, secretKey, origin, baseUrl);
var uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
client.deleteEntity(uuid, function(data) {
  console.log(data);
});
```
