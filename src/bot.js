'use strict';

const restify = require('restify');

module.exports.listen = () => {
  const server = restify.createServer();
  server.use(restify.bodyParser());
  const port = process.env.PORT || 8989;
  console.log('listening on port', port); //eslint-disable-line no-console
  server.listen(port);
};
