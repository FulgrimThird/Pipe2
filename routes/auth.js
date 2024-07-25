const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get('/auth/pipedrive', passport.authenticate('oauth2'));

router.get('/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/modal');
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
