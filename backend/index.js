var express = require('express');
var proxy = require('http-proxy-middleware');
var options = {
  logLevel: 'debug',
  target: 'https://api.airtable.com/v0/' + process.env.APP_ID,
  changeOrigin: true,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + process.env.API_KEY
  },
  secure: false,
  ssl: {
    rejectUnauthorized: false
  }
};

var filter = function (pathname, req) {
  // check data, request type url etc. here to allow/disallow forwarding of requests
  return (req.method === 'GET');
};

var apiProxy = proxy(filter, options);
var app = express();

app.use('/participants', apiProxy);
// app.use('/supersecuerepayments', apiProxy);

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
module.exports = app;