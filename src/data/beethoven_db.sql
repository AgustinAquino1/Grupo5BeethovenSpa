-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: laravel-database
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

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
-- Table structure for table `categories`
--

DROP DATABASE IF EXISTS beethoven_db;
CREATE DATABASE beethoven_db;
USE beethoven_db;

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4	 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,NULL,NULL,'accesorios'),(2,NULL,NULL,'ropa'),(3,NULL,NULL,'gourmet'),(4,NULL,NULL,'spa');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp null default null,
  `updated_at` timestamp null default null,
  `permission_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,null,null,"admin"),(2,null,null,"loged"),(3,null,null,"visitor");
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `birth` date default null,
  `adress` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `pass2` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `permission_id` int(10) unsigned NULL DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  
  PRIMARY KEY (`id`),
  KEY `users_permission_id_foreign` (`permission_id`),
  CONSTRAINT `users_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Pablo','Mccartney','2/10/2022','4 Monica Lane','Pablo@gmail.com',12345678,12345678,1,null,null,null),(2,'Ricardo','Starkey','2/10/2022','4 Monica Lane','Ricardo@gmail.com',12345678,12345678,1,null,null,null),(3,'Juan','Lennon','2/10/2022','4 Monica Lane','Juan@gmail.com',12345678,12345678,1,null,null,null),(4,'Jorge','Harrison','2/10/2022','4 Monica Lane','Jorge@gmail.com',12345678,12345678,1,null,null,null),(5,'Mercedes','Sosa','2/10/2022','4 Monica Lane','Mercedes@gmail.com',12345678,12345678,2,null,null,null),(6,'Julieta','Venegas','2/10/2022','4 Monica Lane','Julieta@gmail.com',12345678,12345678,2,null,null,null),(7,'Fabiana','Cantilo','2/10/2022','4 Monica Lane','Fabiana@gmail.com',12345678,12345678,2,null,null,null),(8,'Rogelio','Waters','2/10/2022','4 Monica Lane','Rogelio@gmail.com',12345678,12345678,2,null,null,null),(9,'Natalia','Lafourcade','2/10/2022','4 Monica Lane','Natalia@gmail.com',12345678,12345678,2,null,null,null),(10,'Carlos','Garcia','2/10/2022','4 Monica Lane','Carlos@gmail.com',12345678,12345678,2,null,null,null),(11,'Luis','Spinetta','2/10/2022','4 Monica Lane','Luis@gmail.com',12345678,12345678,2,null,null,null),(12,'Rodrigo','Bueno','2/10/2022','4 Monica Lane','Rodrigo@gmail.com',12345678,12345678,2,null,null,null),(13,'Diego','Capusotto','2/10/2022','4 Monica Lane','Diego@gmail.com',12345678,12345678,2,null,null,null),(14,'Emilia','Clarke','2/10/2022','4 Monica Lane','Emilia@gmail.com',12345678,12345678,2,null,null,null),(15,'Guido','Kaczka','2/10/2022','4 Monica Lane','Guido@gmail.com',12345678,12345678,2,null,null,null),(16,'Mirtha','Legrand','2/10/2022','4 Monica Lane','Mirtha@gmail.com',12345678,12345678,2,null,null,null),(17,'Moria','Casán','2/10/2022','4 Monica Lane','Moria@gmail.com',12345678,12345678,2,null,null,null),(18,'María Elena','Walsh','2/10/2022','4 Monica Lane','MariaElena@gmail.com',12345678,12345678,2,null,null,null),(19,'Jennifer','Aniston','2/10/2022','4 Monica Lane','Jennifer@gmail.com',12345678,12345678,2,null,null,null),(20,'Esteban','Carell','2/10/2022','4 Monica Lane','Esteban@gmail.com',12345678,12345678,2,null,null,null);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `pet_size` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `pet_type` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `pet_age` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `breed` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `f_image` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `image` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `image1` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `image2` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `color` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `description` varchar(1000) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `price` int(10) COLLATE utf8_unicode_ci NOT NULL,
  `stock` int(10) COLLATE utf8_unicode_ci NOT NULL,
  `brand` varchar(500) COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'BUZO AMARILLO',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(2,'CEPILLO',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(3,'COLLAR',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(4,'EXPERIENCIA SPA COMPLETA',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(5,'MASAJAE DESCONTRACTURADOR',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(6,'PELAJE RENOVADO',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(7,'MAÑANA DE CAMPO',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(8,'EXPERIENCIA GOURMET COMPLETA',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(9,'ALIMENTO FRACCIONADO',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(10,'PLATO GOURMET',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(11,'EXPERIENCIA SPA COMPLETA',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(12,'MASAJAE DESCONTRACTURADOR',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(13,'PELAJE RENOVADO',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(14,'MAÑANA DE CAMPO',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(15,'EXPERIENCIA GOURMET COMPLETA',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(16,'ALIMENTO FRACCIONADO',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(17,'PLATO GOURMET',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(18,'COLLAR',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(19,'COLLAR',1,'pequeño','gato','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(20,'BUZO AMARILLO',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(21,'MEDIAS',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(22,'MEDIAS',1,'mediano','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(23,'BUZO AZUL',1,'grande','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(24,'MEDIAS',1,'mediano','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(25,'COLLAR',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(26,'COLLAR',1,'mediano','gato','adulto','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(27,'PRETAL',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(28,'CORREA LARGA',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(29,'CORREA MEDIANA',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null),(30,'CORREA CORTA',1,'pequeño','perro','cachorro','caniche',null,null,null,null,null,null,2000,1000,null,null,null);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-12 10:09:28