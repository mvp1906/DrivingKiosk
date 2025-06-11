
  const ensureAuthenticatedDriver = (req, res, next) => {
    if (req.session.userId && req.session.userType === 'Driver') {
      return next();
    }
    res.redirect('/login');
  };
  
  const ensureAuthenticatedAdmin = (req, res, next) => {
    if (req.session.userId && req.session.userType === 'Admin') {
      return next();
    }
    res.redirect('/login');
  };
  
  module.exports = { ensureAuthenticatedDriver, ensureAuthenticatedAdmin };
  