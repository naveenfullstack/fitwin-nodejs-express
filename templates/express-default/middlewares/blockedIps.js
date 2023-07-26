const requestIp = require('request-ip');

const blockedIps = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    const blockedIp = ['125','::ffff:127.0.0.1'];
    if (blockedIp.includes(clientIp)) {
        res.status(401).send('Unautherized Access please try again later with access')
      } else {
        next();
      }
    
      next();
  };

  module.exports = blockedIps;
  