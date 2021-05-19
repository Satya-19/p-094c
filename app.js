var createError = require('http-errors');
var express = require('express');
var path = require('path');
var robots = require('express-robots-txt');
var mongoose = require('mongoose');
var dotenv = require('dotenv').config()
var flash = require('connect-flash')
var cookieParser = require('cookie-parser');
var json2xls = require('json2xls')
var logger = require('morgan');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var indexRouter = require('./routes/index');
var authRoutes = require('./routes/auth')

var app = express();

app.use(require("express-session")({
  secret: "Secrets shall not be disclosed",
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(json2xls.middleware)
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(robots(__dirname + '/robots.txt'));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
});

app.use('/', authRoutes);
app.use('/', indexRouter);

app.get('/sitemap.xml', function (req, res) {
  res.sendFile(__dirname + '/sitemap.xml');
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;