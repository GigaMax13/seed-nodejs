# sudo mysql -u root -p
# PASS: root || admin
# CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
# GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';
# FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `seed`
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

DROP TABLE IF EXISTS `seed`.`cfg_users_login`;
DROP TABLE IF EXISTS `seed`.`cfg_users`;

CREATE TABLE `seed`.`cfg_users` (
  sk_user       BIGINT(20) auto_increment           PRIMARY KEY,
  id_user       VARCHAR(36)                         NOT NULL,
  nm_user       VARCHAR(50)                         NOT NULL,
  nm_email      VARCHAR(100)                        NOT NULL,
  ts_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  ts_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  is_active     TINYINT(1) DEFAULT '1'              NOT NULL,
  CONSTRAINT cfg_users_sk_user_uindex
  UNIQUE (sk_user),
  CONSTRAINT cfg_users_id_user_uindex
  UNIQUE (id_user)
);

CREATE TABLE `seed`.cfg_users_login (
  sk_users_login    BIGINT(20) auto_increment           PRIMARY KEY,
  id_user           VARCHAR(36)                         NOT NULL,
  cd_salt           VARCHAR(64)                         NOT NULL,
  cd_hash           VARCHAR(64)                         NOT NULL,
  ts_created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  ts_updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  is_active         TINYINT(1) DEFAULT '1'              NOT NULL,
  CONSTRAINT fk_id_user FOREIGN KEY (id_user) REFERENCES cfg_users (id_user),
  CONSTRAINT cfg_users_login_sk_users_login_uindex
  UNIQUE (sk_users_login)
);
