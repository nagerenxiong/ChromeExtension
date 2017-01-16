/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.5.38 : Database - ip
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ip` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ip`;

/*Table structure for table `bmd` */

DROP TABLE IF EXISTS `bmd`;

CREATE TABLE `bmd` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gid` int(11) DEFAULT NULL,
  `ip` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;

/*Data for the table `bmd` */

insert  into `bmd`(`id`,`gid`,`ip`) values (133,12,'127.0.0.1'),(131,11,'127.0.0.1');

/*Table structure for table `ip` */

DROP TABLE IF EXISTS `ip`;

CREATE TABLE `ip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(20) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `gid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3219 DEFAULT CHARSET=utf8;

/*Data for the table `ip` */

insert  into `ip`(`id`,`address`,`time`,`gid`) values (3218,'58.132.182.43','2016-10-24 09:11:54',12),(3217,'122.75.36.183','2016-10-24 18:25:44',12),(3216,'122.75.43.144','2016-10-25 11:01:07',12),(3215,'27.188.97.57','2016-10-25 19:44:23',12),(3214,'221.193.207.101','2016-10-26 18:16:09',12),(3213,'106.119.73.246','2016-10-26 18:35:03',12),(3212,'175.188.162.72','2016-10-27 20:02:54',12),(3211,'106.115.37.17','2016-10-28 09:20:40',12),(3210,'222.223.250.36','2016-10-28 09:52:10',12),(3209,'27.188.173.220','2016-10-31 16:08:14',12),(3208,'27.188.173.220','2016-10-31 16:08:37',12),(3207,'58.132.182.43','2016-10-24 09:11:54',11),(3206,'122.75.36.183','2016-10-24 18:25:44',11),(3205,'122.75.43.144','2016-10-25 11:01:07',11),(3204,'27.188.97.57','2016-10-25 19:44:23',11),(3203,'221.193.207.101','2016-10-26 18:16:09',11),(3202,'106.119.73.246','2016-10-26 18:35:03',11),(3201,'175.188.162.72','2016-10-27 20:02:54',11),(3200,'106.115.37.17','2016-10-28 09:20:40',11),(3199,'222.223.250.36','2016-10-28 09:52:10',11),(3198,'27.188.173.220','2016-10-31 16:08:14',11),(3197,'27.188.173.220','2016-10-31 16:08:37',11);

/*Table structure for table `query` */

DROP TABLE IF EXISTS `query`;

CREATE TABLE `query` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_day` int(11) DEFAULT NULL,
  `ip_time` int(11) DEFAULT NULL,
  `ipD_day` int(11) DEFAULT NULL,
  `ipD_time` int(11) DEFAULT NULL,
  `isIp` int(11) DEFAULT NULL,
  `isIpD` int(11) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `query` */

insert  into `query`(`id`,`ip_day`,`ip_time`,`ipD_day`,`ipD_time`,`isIp`,`isIpD`,`name`) values (12,5,5,5,5,0,0,'河北昂雷网络科技公司');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `eTime` date DEFAULT NULL,
  `isUsed` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`eTime`,`isUsed`) values (8,'河北昂雷网络科技公司','2016-11-03',1),(9,'2016-11-03','2016-11-03',0),(10,'2016-11-03','2016-11-03',1),(11,'2016-11-03','2016-11-03',1),(12,'2016-11-03','2016-11-03',0),(13,'2016-11-03','2016-11-03',1),(15,'2016-11-03','2016-11-03',1),(16,'2016-11-03','2016-11-03',1),(17,'2016-11-03','2016-11-03',1),(18,'2016-11-03','2016-11-03',1),(19,'2016-11-03','2016-11-03',1),(20,'2016-11-03','2016-11-03',1),(21,'2016-11-03','2016-11-03',1),(22,'2016-11-03','2016-11-03',1),(23,'2016-11-03','2016-11-03',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
