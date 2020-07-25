CREATE DATABASE gamesforum;

CREATE TABLE game
(
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    img VARCHAR(500) NOT NULL,
    platform VARCHAR(50),
    summary VARCHAR(500) NOT NULL,
);