var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 只能处理 application/x-www-form-urlencoded
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 自定义路由
var register = require('./routes/register');
var login = require('./routes/login');
var article = require('./routes/article');
var detail = require('./routes/detail');

// 连接数据库
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blog");

// express-session
const session = require("express-session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 在路由之前匹配中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: "userSessionId", // 这个名字随便起
  secret: "test123123test", // 混淆value的作用
  cookie: {maxAge: 1000*3600}, // 有效时间1效时（毫秒）
  resave: true, // 每次访问都重新计时
  saveUninitialized: true // 未登录、刷新就会有cookie
}))

// 匹配路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', register);
app.use('/login', login);
app.use('/article', article);
app.use('/detail', detail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
