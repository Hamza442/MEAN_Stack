var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var cookieSession = require('cookie-session');

//it is not good to store session in default memory due to memory leak issues
//we store sessions in different session stores and this is one of the session stores
//this will store our sesion
//it exports a function in which we have to pass our sesion

var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect('localhost:27017/ShoppingCart');
require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
    //in first parameter we are telling that dont make new connections work with the existing
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  //configuring how long session should live before it expiers
  //180 mins
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// need cookieParser middleware before we can do anything with cookies

// set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined)
//   {
//     // no: set a new cookie
//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie('cookieName',randomNumber, { maxAge: 180 * 60 * 1000, httpOnly: true });
//     console.log('cookie created successfully');
//   } 
//   else
//   {
//     // yes, cookie was already present 
//     console.log('cookie exists', cookie);
//   } 
//   next(); // <-- important!
// });
app.use(express.static(path.join(__dirname, 'public')));
//through this function i am able to make session avaliable in my views
//with the help of this i can directly access session
app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    //this make sure that we have access to session without passing them explicitliy to routes
    res.locals.session = req.session;
    next();
});

app.use('/user', userRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
