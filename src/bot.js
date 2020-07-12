'use strict';

const restify = require('restify');
const listPrivate = require('./paths/listPrivate');

module.exports.listen = () => {
  const server = restify.createServer();
  server.use(restify.plugins.bodyParser());


  listPrivate('/list-private')(server);

  const port = process.env.PORT || 8989;
  console.log('listening on port', port); //eslint-disable-line no-console
  server.listen(port);
};
