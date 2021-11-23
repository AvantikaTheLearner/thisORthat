CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "handle" VARCHAR(255) NOT NULL,
  "points" INTEGER NOT NULL DEFAULT 1000,
  "avatar_image_url" VARCHAR(255),
  "theme_image_url" VARCHAR(255)
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER,
  "category_id" INTEGER,
  "question_text" TEXT
);

CREATE TABLE "options" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "question_id" INTEGER,
  "option_text" VARCHAR(255) NOT NULL,
  "image_url" VARCHAR(255)
);

CREATE TABLE "badges" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "points" INTEGER NOT NULL
);

CREATE TABLE "answers" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "answered_by" INTEGER,
  "question_id" INTEGER,
  "selected_option" INTEGER,
  "custom_suggestion" VARCHAR(255)
);

ALTER TABLE "questions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "questions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE;

ALTER TABLE "options" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE CASCADE;

ALTER TABLE "answers" ADD FOREIGN KEY ("answered_by") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE CASCADE;

ALTER TABLE "answers" ADD FOREIGN KEY ("selected_option") REFERENCES "options" ("id") ON DELETE CASCADE;
