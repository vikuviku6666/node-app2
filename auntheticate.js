function auth(req, res, next) {
  console.log('Authenticate');
  next();
}

module.exports = auth;