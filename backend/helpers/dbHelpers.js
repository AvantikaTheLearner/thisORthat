module.exports = (db) => {
  
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = email => {

    const query = {
      text: `SELECT * FROM users WHERE email = $1` ,
      values: [email]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (firstName, lastName, email, password) => {
    const query = {
      text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
      values: [firstName, lastName, email, password]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const addQuestion = (userId, question, category) => {
    const query = {
      text: `INSERT INTO questions (user_id, category_id, question_text) VALUES ($1, $2, $3) RETURNING *` ,
      values: [userId, category, question]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const searchQuestionByText = (title) => {
    const query = {
      text: `SELECT * FROM questions
      INNER JOIN options
      ON questions.id = options.question_id
      WHERE questions.question_text LIKE '%$1%'` ,
      values: [title]
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const getUsersQuestions = (id) => {
    const query = {
      text: `SELECT users.id as user_id, questions.question_text
    FROM users
    INNER JOIN questions
    ON users.id = questions.user_id
    WHERE users.id = ${id}`
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

  };

  const getCategories = () => {
    const query = {
      text: 'SELECT * FROM categories',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getOptions = () => {
    const query = {
      text: 'SELECT * FROM options',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getQuestions = () => {
    const query = {
      text: `SELECT questions.id as question_id, questions.question_text, options.option_text
      FROM questions
      INNER JOIN options
      ON questions.id = options.question_id`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };
  return {
    getUsers,
    getUserByEmail,
    addUser,
    addQuestion,
    getUsersQuestions,
    getCategories,
    getOptions,
    getQuestions,
    searchQuestionByText
  };
};