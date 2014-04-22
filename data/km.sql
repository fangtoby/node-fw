-- MySQL dump 10.13  Distrib 5.6.16, for osx10.9 (x86_64)
--
-- Host: localhost    Database: km
-- ------------------------------------------------------
-- Server version	5.6.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authority` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `weight` int(11) NOT NULL DEFAULT '1',
  `name` varchar(30) NOT NULL DEFAULT 'user',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES (1,1,'user','2014-04-22 05:58:35','2014-04-22 05:58:35'),(2,2,'admin','2014-04-22 06:01:21','2014-04-22 05:58:35');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classification`
--

DROP TABLE IF EXISTS `classification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classification` (
  `cfid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT 'classification name',
  `weights` int(11) NOT NULL DEFAULT '0',
  `creater` int(11) NOT NULL DEFAULT '1',
  `ispublic` int(11) NOT NULL DEFAULT '1',
  `comment` varchar(100) DEFAULT NULL,
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cfid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classification`
--

LOCK TABLES `classification` WRITE;
/*!40000 ALTER TABLE `classification` DISABLE KEYS */;
INSERT INTO `classification` VALUES (1,'javascript',0,1,1,'js nodejs',0,'2014-04-22 06:06:04','2014-04-22 06:06:04'),(2,'php',0,1,1,'php apache',0,'2014-04-22 06:06:04','2014-04-22 06:06:04'),(3,'dairy',0,1,1,'dairy document',0,'2014-04-22 06:06:04','2014-04-22 06:06:04'),(4,'c',0,1,1,'c language',0,'2014-04-22 06:06:04','2014-04-22 06:06:04'),(5,'linux',0,1,1,'linux operating system',0,'2014-04-22 06:06:04','2014-04-22 06:06:04'),(6,'life',0,1,1,'life notes',0,'2014-04-22 06:15:41','2014-04-22 06:15:41'),(7,'travel',0,1,1,'travel',0,'2014-04-22 06:15:41','2014-04-22 06:15:41');
/*!40000 ALTER TABLE `classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `did` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `content` varchar(300) NOT NULL,
  `isgood` int(11) DEFAULT NULL,
  `isbad` int(11) DEFAULT NULL,
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'is very nice job!',1,0,0,'2014-04-22 06:40:43','2014-04-22 06:40:43'),(2,2,2,'awosome!',1,0,0,'2014-04-22 06:40:43','2014-04-22 06:40:43'),(3,1,2,'is very nice job!',1,0,0,'2014-04-22 06:43:36','2014-04-22 06:43:36'),(4,2,1,'awosome!',1,0,0,'2014-04-22 06:43:36','2014-04-22 06:43:36');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `document` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL COMMENT 'type of document',
  `content` text NOT NULL,
  `publish` int(11) NOT NULL DEFAULT '1' COMMENT 'open docuemnt,that other people can read it',
  `isgood` int(11) NOT NULL DEFAULT '0',
  `isbad` int(11) NOT NULL DEFAULT '0',
  `copy` int(11) DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  `isopen` int(11) NOT NULL DEFAULT '1',
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES (1,'Closures',1,1,'That\'s the theory out of the way — but are closures actually useful? Let\'s consider their practical implications. A closure lets you associate some data (the environment) with a function that operates on that data. This has obvious parallels to object oriented programming, where objects allow us to associate some data (the object\'s properties) with one or more methods.\n\nConsequently, you can use a closure anywhere that you might normally use an object with only a single method.\n\nSituations where you might want to do this are particularly common on the web. Much of the code we write in web JavaScript is event-based — we define some behavior, then attach it to an event that is triggered by the user (such as a click or a keypress). Our code is generally attached as a callback: a single function which is executed in response to the event.',1,0,0,NULL,NULL,1,0,'2014-04-22 06:36:17','2014-04-22 06:36:17'),(2,'Prototype',1,1,'Languages such as Java provide the ability to declare methods private, meaning that they can only be called by other methods in the same class.\n\nJavaScript does not provide a native way of doing this, but it is possible to emulate private methods using closures. Private methods aren\'t just useful for restricting access to code: they also provide a powerful way of managing your global namespace, keeping non-essential methods from cluttering up the public interface to your code.\n\nHere\'s how to define some public functions that can access private functions and variables, using closures which is also known as the module pattern:',1,0,0,NULL,NULL,1,0,'2014-04-22 06:36:17','2014-04-22 06:36:17');
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `mcid` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `accepter` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 unread 1 read',
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '0 normal message 1 admin message 2 system message',
  `deleter` int(11) DEFAULT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,1,1,2,0,0,1,NULL,'2014-04-22 07:03:55','2014-04-22 07:03:55'),(2,1,1,3,0,0,1,NULL,'2014-04-22 07:03:55','2014-04-22 07:03:55'),(3,2,2,3,0,0,0,NULL,'2014-04-22 07:12:25','2014-04-22 07:12:25'),(4,3,3,2,0,0,0,NULL,'2014-04-22 07:12:25','2014-04-22 07:12:25');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messageComment`
--

DROP TABLE IF EXISTS `messageComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messageComment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) NOT NULL,
  `creater` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messageComment`
--

LOCK TABLES `messageComment` WRITE;
/*!40000 ALTER TABLE `messageComment` DISABLE KEYS */;
INSERT INTO `messageComment` VALUES (1,1,2,'ok~',0,0,'2014-04-22 07:24:17','2014-04-22 07:24:17'),(2,2,3,'good~',0,0,'2014-04-22 07:24:17','2014-04-22 07:24:17'),(3,3,3,'is very nice~',0,0,'2014-04-22 07:24:17','2014-04-22 07:24:17'),(4,4,2,'ha ha',0,0,'2014-04-22 07:24:17','2014-04-22 07:24:17');
/*!40000 ALTER TABLE `messageComment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messageContent`
--

DROP TABLE IF EXISTS `messageContent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messageContent` (
  `mcid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` varchar(200) NOT NULL,
  `creater` int(11) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`mcid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messageContent`
--

LOCK TABLES `messageContent` WRITE;
/*!40000 ALTER TABLE `messageContent` DISABLE KEYS */;
INSERT INTO `messageContent` VALUES (1,'hello','hello world',1,1,0,'2014-04-22 07:09:01','2014-04-22 07:09:01'),(2,'hi','are you ok!',2,0,0,'2014-04-22 07:09:01','2014-04-22 07:09:01'),(3,'how are you?','when are you come on?',3,0,0,'2014-04-22 07:09:01','2014-04-22 07:09:01');
/*!40000 ALTER TABLE `messageContent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relation`
--

DROP TABLE IF EXISTS `relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relation` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `requester` int(11) NOT NULL,
  `recipienter` int(11) NOT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0 or 1',
  `expirestime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` varchar(100) DEFAULT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `destroyer` int(11) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relation`
--

LOCK TABLES `relation` WRITE;
/*!40000 ALTER TABLE `relation` DISABLE KEYS */;
INSERT INTO `relation` VALUES (1,1,2,0,'2014-04-27 16:00:00','i want to add you to be my friends!','2014-04-22 06:51:03','2014-04-22 06:59:19',NULL),(2,1,3,0,'2014-04-27 16:00:00','add me!','2014-04-22 06:51:03','2014-04-22 06:59:19',NULL),(3,2,3,1,'2014-04-27 16:00:00','where are friends','2014-04-22 06:51:03','2014-04-22 06:59:19',NULL);
/*!40000 ALTER TABLE `relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL DEFAULT 'hello',
  `sex` int(11) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL DEFAULT '1',
  `achievement` int(11) NOT NULL DEFAULT '1',
  `activity` int(11) NOT NULL DEFAULT '100' COMMENT '1-100',
  `visible` int(11) NOT NULL DEFAULT '1',
  `isfirst` int(11) NOT NULL DEFAULT '1',
  `deleteflag` int(11) NOT NULL DEFAULT '0',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'fangtoby','fangtoby@live.cn','hello',0,2,1,100,1,0,0,'2014-04-22 06:47:30','2014-04-22 03:06:21'),(2,'google','google@live.cn','hello',1,1,1,100,1,1,0,'2014-04-22 03:06:21','2014-04-22 03:06:21'),(3,'ye.fei','ye.fie@gmail.com','hello',1,1,1,100,1,1,0,'2014-04-22 03:06:21','2014-04-22 03:06:21');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-04-22 15:25:29
