-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  handle VARCHAR(255) NOT NULL,
  points INTEGER NOT NULL DEFAULT 1000,
  avatar_image_url VARCHAR(255),
  theme_image_url VARCHAR(255)
);
