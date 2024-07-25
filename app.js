const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/pipedrive">Login with Pipedrive</a>');
});

app.get('/modal', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('modal', { user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
