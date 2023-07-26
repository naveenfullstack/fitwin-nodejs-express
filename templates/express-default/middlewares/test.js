const test = (req, res, next) => {
    console.log('Middleware ran!');
    next();
  };
  
  module.exports = test;
  