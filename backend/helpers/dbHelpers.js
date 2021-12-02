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
      text: `INSERT INTO users (first_name, last_name, email, password, handle) VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
      values: [firstName, lastName, email, password, firstName]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  //inserted multiple values in multiple tables using single query in postgresql
  const addQuestion = (userId, question, category, firstoption, secondoption) => {
    const query = {
      text: `WITH ins1 AS (
        INSERT INTO questions (user_id, category_id, question_text) VALUES ($1, $2, $3) RETURNING id AS question_id),
        ins2 AS (INSERT INTO options (question_id, option_text)
        SELECT question_id, $4 FROM ins1)
        INSERT INTO options (question_id, option_text)
        SELECT question_id, $5 FROM ins1
        RETURNING *` ,
      values: [userId, category, question, firstoption, secondoption]
    };

    return db.query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const addNewCategory = (category) => {
    const query = {
      text: `INSERT INTO categories (name) VALUES ($1) RETURNING *` ,
      values: [category]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const deleteQuestion = (questionID) => {
    const query = {
      text: `DELETE FROM questions
      WHERE id = $1 RETURNING *` ,
      values: [questionID]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const searchQuestionByText = (title) => {
    const data = ['%' + title + '%'];
    const query = {
      text: `SELECT users.handle, questions.* FROM questions
      INNER JOIN users ON users.id = questions.user_id
      WHERE question_text LIKE $1` ,
      values: data
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getUsersQuestions = (id) => {
    const query = {
      text: `SELECT users.handle, questions.* FROM questions
      INNER JOIN users ON users.id = questions.user_id
    WHERE user_id = $1` ,
      values: [id]
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

  const getOptionsForQuestion = (questionID) => {
    const query = {
      text: `SELECT *
      FROM options
      WHERE question_id = $1`,
      values: [questionID]
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };


  const getQuestionsWithAnswersforUser = (userId) => {
    const query = {
      text: `SELECT users.handle, questions.user_id, questions.id as question_id, questions.question_text, options.option_text
      FROM users
      INNER JOIN questions
      ON users.id = questions.user_id
      INNER JOIN options
      ON questions.id = options.question_id
      WHERE questions.user_id = $1`,
      values: [userId]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getQuestions = () => {
    const query = {
      text: 'SELECT * FROM questions',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getQuestionsWithHandle = () => {
    const query = {
      text: 'SELECT users.handle, questions.* FROM questions INNER JOIN users ON users.id=questions.user_id',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addAnswer = function(answered_by, question_id, selected_option, custom_suggestion) {
    const query = `INSERT INTO answers (answered_by, question_id, selected_option, custom_suggestion) VALUES ($1, $2, $3, $4) RETURNING *`;

    custom_suggestion = custom_suggestion || "";
    const queryParams = [answered_by, question_id, selected_option, custom_suggestion];
    console.log(query);
    console.log("storing answer: ", { queryParams });
    return db.query(query, queryParams)
      .then(result => {
        const newAnswer = result.rows[0];
        console.log("new stored answer: ", { newAnswer });
        return newAnswer;
      })
      .catch((err) => {
        console.log({err});
        return err
      });
  };

  const getAnswersForUser = function(user_id) {
    const query = `SELECT * FROM answers WHERE question_id IN ( SELECT questions.id FROM questions WHERE questions.user_id = $1 ) ORDER BY question_id ASC ;`
    const queryParams = [user_id];
    console.log(query);
    console.log("params [user_id] : ", { queryParams });
    return db.query(query, queryParams)
      .then(result => {
        const answers = result.rows;
        console.log("answers for this user: ", answers);
        return answers;
      })
      .catch((err) => {
        console.log({err});
        return err
      });
  };

  const getAnswersForOtherThanThisUser = function(user_id) {
    const query = `SELECT * FROM answers WHERE question_id IN ( SELECT questions.id FROM questions WHERE questions.user_id != $1 ) ORDER BY question_id ASC ;`
    const params = [user_id];
    console.log(query);
    console.log("params other than this [user_id] : ", { params });
    return db.query(query, params)
      .then(result => {
        const answers = result.rows;
        console.log(" answers for other than this user: ", user_id, " answers:", answers);
        return answers;
      })
      .catch((err) => {
        console.log({err});
        return err
      });
  };

  const getAnswers = function() {
    const query = `SELECT * FROM answers ORDER BY question_id ASC ;`
    console.log(query);
    return db.query(query)
      .then(result => {
        const answers = result.rows;
        console.log("all answers: ", answers);
        return answers;
      })
      .catch((err) => {
        console.log({err});
        return err
      });
  };

  const getAnswersForQuestion = function(question_id) {
    const query = `SELECT * FROM answers WHERE question_id = $1 ORDER BY answers.id ASC; ;`
    const params = [question_id];
    console.log(query);
    console.log("params [question_id] : ", { params });
    return db.query(query, params)
      .then(result => {
        const answers = result.rows;
        console.log("answers for question_id: ", question_id, " answers: ", answers);
        return answers;
      })
      .catch((err) => {
        console.log({err});
        return err
      });
  };

  return {
    getUsers,
    getUserByEmail,
    addUser,
    addQuestion,
    addNewCategory,
    getOptionsForQuestion,
    getUsersQuestions,
    getCategories,
    getOptions,
    deleteQuestion,
    getQuestions,
    searchQuestionByText,
    getQuestionsWithHandle,
    getQuestionsWithAnswersforUser,
    addAnswer,
    getAnswersForUser,
    getAnswersForOtherThanThisUser,
    getAnswers,
    getAnswersForQuestion
  };
};