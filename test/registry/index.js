'use strict';

var http = require('http');

// Don't inherit any user configuration
Object.keys(process.env).forEach(function (k) {
  if (/^NPM_/i.test(k)) delete process.env[k];
})

// Use mock registry with fake token
process.env.NPM_CONFIG_USERCONFIG = __dirname + '/.npmrc';

module.exports = function listen (cb) {
  var server = http.createServer(function(req, res) {
    if (req.url === '/-/whoami' || req.url === '/whoami') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ username: 'test-user' }));
    } else {
      res.end();
    }
  });

  server.listen(3000, cb).unref();
}
