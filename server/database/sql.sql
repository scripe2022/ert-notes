DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS token;
CREATE TABLE IF NOT EXISTS `users`(
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `defaultPlayers` JSON,
    `notes` JSON,
    `createTime` TIMESTAMP(6) not NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (username)
);
CREATE TABLE IF NOT EXISTS `notes`(
    `nid` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `content` JSON,
    `players` JSON,
    PRIMARY KEY (nid)
);
CREATE TABLE IF NOT EXISTS `token`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(10000),
    `time` INT,
    PRIMARY KEY (id)
);
INSERT INTO token (token, time) VALUES ('', 0);