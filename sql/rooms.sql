CREATE TABLE `rooms` (
  `id` varchar(40) NOT NULL DEFAULT '',
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `capacity` varchar(3) DEFAULT NULL,
  `arrow` enum('left','right') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;