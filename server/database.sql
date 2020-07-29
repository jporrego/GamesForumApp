CREATE DATABASE gamesforum;

CREATE TABLE game
(
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    img VARCHAR(2500) NOT NULL,
    platform VARCHAR(50),
    summary VARCHAR(500) NOT NULL,
    date INTEGER NOT NULL
);

CREATE TABLE user_account 
(
    user_account_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    reg_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE comment
(   
    comment_id SERIAL PRIMARY KEY,
    user_account_id INT,
    game_id INT,
    replied_comment_id INT,
    comment_text VARCHAR(2500) NOT NULL,
    comment_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user_account FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
    CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES game(game_id),
    CONSTRAINT fk_replied_comment_id FOREIGN KEY (replied_comment_id) REFERENCES comment(comment_id)
);

CREATE TABLE follow
(   
    follow_id SERIAL PRIMARY KEY,
    user_account_id INT,
    game_id INT,
    follow_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user_account FOREIGN KEY (user_account_id) REFERENCES user_account(user_account_id),
    CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES game(game_id)
);