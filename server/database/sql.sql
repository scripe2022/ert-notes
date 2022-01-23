DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;
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
