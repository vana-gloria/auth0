var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtAuthz = require('express-jwt-authz');

module.exports = app;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-157e40e8.auth0.com/.well-known/jwks.json'
  }),
  audience: 'rnd',
  issuer: 'https://dev-157e40e8.auth0.com/',
  algorithms: ['RS256']
});


app.get('/public', function (req, res) {
  res.send('Public Resource');
});

app.get('/authGeneral', jwtCheck, jwtAuthz(['general']), function (req, res) {
  res.send('Secured General Resource');
});

app.get('/authSecret', jwtCheck, jwtAuthz(['secret']), function (req, res) {
  res.send('Secured Secret Resource');
});

module.exports = app;
