const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');

require('dotenv').config();

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
    tokenURL: 'https://oauth.pipedrive.com/oauth/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const response = await axios.get('https://api.pipedrive.com/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userInfo = response.data;
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      profile.userInfo = userInfo.data;
      return done(null, profile);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
