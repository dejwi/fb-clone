const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => cb(null, origin),
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET
}));

// Init mongodb
require('./config/mongodb');

// Init passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

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
  res.json({ msg: 'error' });
});

module.exports = app;
