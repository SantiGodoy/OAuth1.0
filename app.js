'use strict';

const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const port = (process.env.PORT || 8080);
require('dotenv').config();
const bodyParser = require('body-parser');
const baseApi = '/api/v1';
const flash = require('connect-flash');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const usersList = require('./users-list');

/** SECURITY **/

passport.use(new TwitterStrategy({
    consumerKey: "",
    consumerSecret: "",
    callbackURL: "http://127.0.0.1:8080/login/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    usersList.findByToken(token, function (err, user) {
      return cb(err, user);
    });
  }
));

/***** *****/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(flash());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/*Si se usa localhost en vez de 127.0.0.1 puede dar error de sesión, por un problema
con el passport-twitter, también hay que añadir la opción de secure: false para
solucionarlo*/
app.use(require('express-session')({
    secret:'keyboard cat',
    resave: true,
    saveUninitialized:true,
    cookie : { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj,cb) {
    cb(null, obj);
});
/** ROUTERS **/

app.get('/', function (req, res) {
    res.render('home', {user: req.user});
});

app.get('/login',
    function(req, res) {
        res.render('login');
    });

app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/profile',
require('connect-ensure-login').ensureLoggedIn(),
function(req, res) {
    res.render('profile', { user: req.user });
});

const server = http.createServer(app);

server.listen(port, function () {
    console.log("Server with GUI up and running!");
});

module.exports = app;
