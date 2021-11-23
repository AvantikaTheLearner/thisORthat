DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  answered_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  selected_option INTEGER REFERENCES options(id) ON DELETE CASCADE,
  custom_suggestion TEXT
);
