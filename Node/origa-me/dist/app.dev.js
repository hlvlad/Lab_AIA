"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var sassMiddleware = require('node-sass-middleware');

var mongoose = require('mongoose');

var session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);

var cors = require('cors');

require('dotenv').config();

require('./models/OrigamiModel');

var indexRouter = require('./routes/index');

var cartRouter = require('./routes/cart');

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // database setup

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('open', function () {
  console.log('Connected to Database');
}).on('error', function (err) {
  console.log("Connection error: ".concat(err.message));
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/cart', cartRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;