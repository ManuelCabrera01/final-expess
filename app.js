var express      = require('express');
var mongoose     = require ('mongoose');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require ('express-session');
var passport       = require('passport');
var cors          = require('cors');

require('dotenv').config();

require ('./config/passport');

mongoose.connect(process.env.MONGODB_URI);

var app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'angular and express and auth and shhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  credentials: true,                   // allow other domains to send cookies
  origin: [ 'http://localhost:4200' ]  // these are the domains that are allowed
}));


//routes---------------------
const myAuthRoutes = require('./routes/auth-routes');
app.use('/', myAuthRoutes);

const myRidesRoutes = require('./routes/rides-routes');
app.use('/', myRidesRoutes);
//------------------------

app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});



module.exports = app;
