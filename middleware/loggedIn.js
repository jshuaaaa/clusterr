const isLoggedIn = (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  } else {
    next();
  }
};

module.exports = isLoggedIn;