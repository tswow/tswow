CREATE TABLE IF NOT EXISTS `datafile_build_history` (
    `file_name` VARCHAR(32) NOT NULL,
    `file_key` VARCHAR(32) NOT NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`file_name`, `file_key`));
`)