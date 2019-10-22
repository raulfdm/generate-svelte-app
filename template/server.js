const liveServer = require('live-server');

const params = {
  port: 5000,
  host: '0.0.0.0',
  root: 'public/',
  open: false,
  file: 'index.html',
  wait: 1000,
  logLevel: 2,
  middleware: [
    function(req, res, next) {
      next();
    },
  ],
};

liveServer.start(params);
