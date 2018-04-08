create database hotspot;
use hotspot;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` ( `username` )
  ) ENGINE=MyISAM DEFAULT CHARSET = utf8;
INSERT INTO `users` (id,username,password) VALUES (1,'guy','1234');
INSERT INTO `users` (id,username,password) VALUES (2,'connor','1111');