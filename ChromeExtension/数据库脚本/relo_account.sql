/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50128
Source Host           : localhost:3306
Source Database       : relouser

Target Server Type    : MYSQL
Target Server Version : 50128
File Encoding         : 65001

Date: 2016-03-13 00:04:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `relo_account`
-- ----------------------------
DROP TABLE IF EXISTS `relo_account`;
CREATE TABLE `relo_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_site` varchar(255) NOT NULL,
  `role` enum('other','assignee','hr','crown') NOT NULL DEFAULT 'hr',
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of relo_account
-- ----------------------------
INSERT INTO `relo_account` VALUES ('1', 'testingsite', 'hr', 'hr_1', '123asd');
INSERT INTO `relo_account` VALUES ('2', 'testingsite', 'hr', 'hr_2', '123abcd');
INSERT INTO `relo_account` VALUES ('3', 'testingsite', 'hr', 'hr_3', '123sdfdf');
INSERT INTO `relo_account` VALUES ('4', 'testingsite', 'crown', 'crown_1', '1324sdfssd');
INSERT INTO `relo_account` VALUES ('5', 'testingsite', 'crown', 'crown_2', '2434534');
INSERT INTO `relo_account` VALUES ('6', 'testingsite', 'crown', 'crown_3', 'sdfsdf24');
INSERT INTO `relo_account` VALUES ('7', 'testingsite', 'assignee', 'assignee_1', 'qeqwe');
INSERT INTO `relo_account` VALUES ('8', 'testingsite', 'assignee', 'assignee_2', '12341234');
INSERT INTO `relo_account` VALUES ('9', 'testingsite', 'assignee', 'assignee_3', 'dfgdfhd');
INSERT INTO `relo_account` VALUES ('10', 'testingsite', 'other', 'other 1', 'sdfdfg');
INSERT INTO `relo_account` VALUES ('11', 'testingsite', 'other', 'other 2', 'fwerw');
INSERT INTO `relo_account` VALUES ('12', 'testingsite', 'hr', 'hr6', '1234abcd');