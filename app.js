var express = require('express');
var mongoose = require ('mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require ('express-session');
var passport = require('passport');
var cors = require('cors');






require ('./config/dataBase');

require ('./config/passport');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
  secret:'sring is to avoid warning',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//routes---------------------
var index = require('./routes/index');
app.use('/', index);

var users = require('./routes/users');
app.use('/', users);

var authRoutes = require('./routes/auth-routes');
app.use('/',authRoutes );

var rides = require('./routes/rides-routes');
app.use('/', rides);

var comment = require('./routes/comment-routes');
app.use('/', comment);
//------------------------


app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
