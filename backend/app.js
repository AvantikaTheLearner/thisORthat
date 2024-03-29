const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);
const bodyParser = require("body-parser");

const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const questionsRouter = require('./routes/questions');
const optionsRouter = require('./routes/options');
const answersRouter = require('./routes/answers');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const searchRouter = require('./routes/search');

const app = express();
app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'JustAsk_session',
  keys: ["cookie session to encrypt the cookies"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/categories', categoriesRouter(dbHelpers));
app.use('/api/questions', questionsRouter(dbHelpers));
app.use('/api/options', optionsRouter(dbHelpers));
app.use('/api/answers', answersRouter(dbHelpers));
app.use('/api/search', searchRouter(dbHelpers));
// console.log({loginRouter});
app.use('/api/login', loginRouter(dbHelpers));
app.use('/api/signup', signupRouter(dbHelpers));

app.post("/api/logout", (req,res) => {
  req.session = null;
  res.status(200).json("User is logged out");
});


module.exports = app;