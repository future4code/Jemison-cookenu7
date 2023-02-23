
CREATE TABLE IF NOT EXISTS cookenu (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
);

CREATE TABLE IF NOT EXISTS recipe_cookenu (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    title VARCHAR(64) NOT NULL,
    description VARCHAR(1024) DEFAULT "No description provided",
    FOREIGN KEY (user_id) REFERENCES cookenu(id)
);
