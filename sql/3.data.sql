# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: meetingroom
# Generation Time: 2019-04-13 11:05:04 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table quotes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `quotes`;

CREATE TABLE `quotes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;

INSERT INTO `quotes` (`id`, `text`, `created_at`)
VALUES
	(1,'“Keep your eyes on the stars and keep on the ground.”','2019-04-13 10:55:58'),
	(2,'“A goal is a dream with a deadline.”','2019-04-13 10:56:06'),
	(3,'“Only I can change my life. No one can do it for me.”','2019-04-13 10:56:20'),
	(4,'“Don’t watch the clock, do what it does. Keep Going.”','2019-04-13 10:56:30'),
	(5,'“A river cuts through rock, not because of its power, but because of persistence.”','2019-04-13 10:56:47'),
	(6,'“Things do not happen. Things are made to happen.”','2019-04-13 10:57:09'),
	(7,'Few are those who see with their own eyes and feel with their own hearts. - Einstein','2019-04-13 10:58:22'),
	(8,'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world. - Einstein','2019-04-13 10:58:32'),
	(9,'Unthinking respect for authority is the greatest enemy of truth. - Einstein','2019-04-13 10:58:46'),
	(10,'Try not to become a man of success, but rather try to become a man of value. - Einstein','2019-04-13 10:58:58'),
	(11,'I am by heritage a Jew, by citizenship a Swiss, and by makeup a human being, and only a human being, without any special attachment to any state or national entity whatsoever. - Einstein','2019-04-13 10:59:13'),
	(12,'Great spirits have always encountered violent opposition from mediocre minds. - Einstein','2019-04-13 10:59:25'),
	(13,'Not everything that can be counted counts, and not everything that counts can be counted. - Einstein','2019-04-13 10:59:32'),
	(14,'Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid. - Einstein','2019-04-13 10:59:42'),
	(15,'Look deep into nature, and then you will understand everything better. - Einstein','2019-04-13 10:59:59'),
	(16,'Any intelligent fool can make things bigger and more complex… It takes a touch of genius – and a lot of courage to move in the opposite direction. - Einstein','2019-04-13 11:00:13'),
	(17,'A man should look for what is, and not for what he thinks should be. - Einstein','2019-04-13 11:00:23'),
	(18,'In the middle of difficulty lies opportunity. - Einstein','2019-04-13 11:00:33'),
	(19,'A person who never made a mistake never tried anything new. - Einstein','2019-04-13 11:00:43'),
	(20,'Education is what remains after one has forgotten what one has learned in school. - Einstein','2019-04-13 11:00:53');

/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table rooms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `capacity` varchar(3) DEFAULT NULL,
  `arrow` enum('left','right') DEFAULT NULL,
  `video_url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;

INSERT INTO `rooms` (`id`, `email`, `name`, `capacity`, `arrow`, `video_url`)
VALUES
	('1','https://calendar.google.com/calendar/embed?src=caffeina.com_31343434353937313130%40resource.calendar.google.com&ctz=Europe%2FRome','UX Lab','20','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/uxlab.mp4'),
	('2','https://calendar.google.com/calendar/embed?src=caffeina.com_3939383835383330383330%40resource.calendar.google.com&ctz=Europe%2FRome','Terra di Mezzo','8','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/terra-di-mezzo.mp4'),
	('3','https://calendar.google.com/calendar/embed?src=caffeina.com_3132323734363633393236%40resource.calendar.google.com&ctz=Europe%2FRome','Pop Corn','10','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/pop-corn.mp4'),
	('4','https://calendar.google.com/calendar/embed?src=caffeina.com_3835343432313132363837%40resource.calendar.google.com&ctz=Europe%2FRome','Masnovo','4','right','https://caffeina.s3.amazonaws.com/meetingroom/videos/masnovo.mp4'),
	('5','https://calendar.google.com/calendar/embed?src=caffeina.com_3332323439343032323232%40resource.calendar.google.com&ctz=Europe%2FRome','Mad Men','8','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/mad-men.mp4'),
	('6','https://calendar.google.com/calendar/embed?src=caffeina.com_3731303830353532323736%40resource.calendar.google.com&ctz=Europe%2FRome','Ideas Never Sleep','15','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/ideas-never-sleep.mp4'),
	('7','https://calendar.google.com/calendar/embed?src=caffeina.com_3534383634353239373534%40resource.calendar.google.com&ctz=Europe%2FRome','Eureka','8','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/eureka.mp4'),
	('8','https://calendar.google.com/calendar/embed?src=caffeina.com_3131383238363534343237%40resource.calendar.google.com&ctz=Europe%2FRome','Einstein','8','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/einstein.mp4'),
	('9','https://calendar.google.com/calendar/embed?src=caffeina.com_3138383334303239363132%40resource.calendar.google.com&ctz=Europe%2FRome','Caracas','8','left','https://caffeina.s3.amazonaws.com/meetingroom/videos/caracas.mp4');

/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
