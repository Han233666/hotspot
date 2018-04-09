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

CREATE TABLE `spots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(280) NOT NULL,
  `latitude` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  `latitudeDelta` varchar(30) NOT NULL,
  `longitudeDelta` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` ( `username` )
  ) ENGINE=MyISAM DEFAULT CHARSET = utf8;

INSERT INTO `spots` (id,username,title,description,latitude,longitude,latitudeDelta,longitudeDelta) VALUES (1,'guy','better party','come party at the house','37.78825','-122.4324','0.0922','0.0421');
INSERT INTO `spots` (id,username,title,description,latitude,longitude,latitudeDelta,longitudeDelta) VALUES (2,'connor','party','i have a fun party!','39.7392','-104.9903','0.0922','0.0421');