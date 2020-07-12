'use strict';

const restify = require('restify');
const listPrivate = require('./paths/listPrivate');
const interactive = require('./paths/interactive');

module.exports.listen = () => {
  const server = restify.createServer();
  server.use(restify.plugins.bodyParser());


  listPrivate('/list-private')(server);
  interactive('/interactive')(server);

  const port = process.env.PORT || 8989;
  console.log('listening on port', port); //eslint-disable-line no-console
  server.listen(port);
};
