const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const questionsRouter = require('./routes/questions');
const optionsRouter = require('./routes/options');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const searchRouter = require('./routes/search');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ["cookie session to encrypt the cookies"],
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/categories', categoriesRouter(dbHelpers));
app.use('/api/questions', questionsRouter(dbHelpers));
app.use('/api/options', optionsRouter(dbHelpers));
app.use('/api/search', searchRouter(dbHelpers));

app.use('/api/login', loginRouter(dbHelpers));
app.use('/api/signup', signupRouter(dbHelpers));

app.post("/api/logout", (req,res) => {
  req.session = null;
});


module.exports = app;