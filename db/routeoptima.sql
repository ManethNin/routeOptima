-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2023 at 08:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `routeoptima`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(100) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `role`) VALUES
('1', 'admin@gmail.com', '12', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `assistant`
--

CREATE TABLE `assistant` (
  `work_hours` int(3) DEFAULT NULL,
  `user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `user_id` varchar(100) NOT NULL,
  `work_hours` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `id` varchar(100) NOT NULL,
  `quntity` int(3) DEFAULT NULL,
  `processed` tinyint(1) DEFAULT 0,
  `shipped` tinyint(1) DEFAULT 0,
  `delevered` tinyint(1) DEFAULT 0,
  `completd` tinyint(1) DEFAULT 0,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_id` varchar(100) DEFAULT NULL,
  `user_id` varchar(100) DEFAULT NULL,
  `store_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`id`, `quntity`, `processed`, `shipped`, `delevered`, `completd`, `order_date`, `product_id`, `user_id`, `store_id`) VALUES
('ODR_1', 2, 0, 0, 0, 0, '2023-10-27 17:52:00', 'PRO_2', '499bd764417db1667040e5f38b0baedbbcde89c12a53e075468a3b9d8fe03c70', 'STOR_1'),
('ODR_2', 300, 1, 0, 0, 0, '2023-10-28 06:10:47', 'PRO_1', '499bd764417db1667040e5f38b0baedbbcde89c12a53e075468a3b9d8fe03c70', 'STOR_1');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT '0',
  `volume` decimal(8,2) DEFAULT NULL,
  `unit_price` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `volume`, `unit_price`) VALUES
('PRO_1', 'pro1', 2.00, 2.00),
('PRO_2', 'pro 2', 4.00, 23.00);

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE `route` (
  `id` varchar(100) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `max_time` time DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `store_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`id`, `name`, `max_time`, `start_time`, `store_id`) VALUES
('ROUTE_05c3233f9a4b4fc071e3dfe60a2c2fb941916e9a80eb17c8d6eeeeec3211f7d6', 'route 1', '04:30:00', '08:30:00', 'STOR_1'),
('ROUTE_8081c5d043bb6c4590d13e42b743e78c3a74e7cdfd2f33f35272984b79dcecac', 'route 5', '04:30:00', '08:30:00', 'STOR_2'),
('ROUTE_868fbd39e42cc6b1feb3ab5d09e984b7df1b4ede85c993c1e767b28d5ac80edc', 'route 3', '04:30:00', '08:30:00', 'STOR_1'),
('ROUTE_8984d13b2c1cd6f974ca31dcd7c2b1e3805e8a1d5d8458c72e87c0b34189cf08', 'route 4', '04:30:00', '08:30:00', 'STOR_2');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id` varchar(100) NOT NULL,
  `distination` varchar(20) DEFAULT NULL,
  `max_capacity` int(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `train_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id`, `distination`, `max_capacity`, `phone`, `train_id`) VALUES
('STOR_1', 'Colombo', 4000, '0761747447', 'TRAIN_1'),
('STOR_2', 'Negombo', 10000, '0761747447', 'TRAIN_2'),
('STOR_3', 'Galle', 500, '0761747447', 'TRAIN_3'),
('STOR_4', 'Matara', 300, '0761747447', 'TRAIN_4'),
('STOR_5', 'Jaffna', 4000, '0761747447', 'TRAIN_4'),
('STOR_6', 'Trinco', 1000, '0761747447', 'TRAIN_6');

-- --------------------------------------------------------

--
-- Table structure for table `train`
--

CREATE TABLE `train` (
  `id` varchar(100) NOT NULL,
  `distination` varchar(20) DEFAULT NULL,
  `max_capacity` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `train`
--

INSERT INTO `train` (`id`, `distination`, `max_capacity`) VALUES
('TRAIN_1', 'Colombo', 4000),
('TRAIN_2', 'Negombo', 100),
('TRAIN_3', 'Galle', 1000),
('TRAIN_4', 'Matara', 5000),
('TRAIN_5', 'Jaffna', 200),
('TRAIN_6', 'Trinco', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `train_trip`
--

CREATE TABLE `train_trip` (
  `order_product_id` varchar(100) NOT NULL,
  `completed_status` tinyint(1) DEFAULT 0,
  `date` date DEFAULT NULL,
  `volume` int(10) DEFAULT NULL,
  `train_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `train_trip`
--

INSERT INTO `train_trip` (`order_product_id`, `completed_status`, `date`, `volume`, `train_id`) VALUES
('ODR_1', 0, '2023-10-03', 400, 'TRAIN_1'),
('ODR_2', 0, '2023-10-03', 600, 'TRAIN_1');

--
-- Triggers `train_trip`
--
DELIMITER $$
CREATE TRIGGER `update_processed_value` AFTER INSERT ON `train_trip` FOR EACH ROW BEGIN
    UPDATE order_product
    SET processed = 1
    WHERE id = NEW.order_product_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `truck`
--

CREATE TABLE `truck` (
  `id` varchar(100) NOT NULL,
  `max_capacity` int(10) DEFAULT NULL,
  `store_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `truck_delivery`
--

CREATE TABLE `truck_delivery` (
  `order_product_id` varchar(100) NOT NULL,
  `route_id` varchar(100) DEFAULT NULL,
  `truck_id` varchar(100) DEFAULT NULL,
  `driver_user_id` varchar(100) DEFAULT NULL,
  `assistant_user_id` varchar(100) DEFAULT NULL,
  `schedule_status` tinyint(1) DEFAULT 0,
  `completed_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT '0',
  `email` varchar(100) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 0,
  `store_id` varchar(100) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `first_name`, `last_name`, `address`, `country`, `role`, `password`, `status`, `store_id`) VALUES
('499bd764417db1667040e5f38b0baedbbcde89c12a53e075468a3b9d8fe03c70', '0', 'thilakarathnakdb.21@uom.lk', 'kaivndu', 'damsith', 'Mahawaththa ,lewke ,galathara', '🇦🇫 Afghanistan', '0', '$2a$10$xgS/qw0ANRgeFyE/KO5OwOFLe0uR99wxZHCExVHx9eA2wptSyBhwW', 0, ''),
('66663bf73ab2e6b20cb2d518148c8a9f3ddb14a8d7fac00854d562569efbb3b3', '0', 'smanager@uom.lk', 'kaivndu', 'damsith', 'Mahawaththa ,lewke ,galathara', '🇦🇫 Afghanistan', '1', '$2a$10$Dvm08nA9tiqG5ZjguWTuSOL7P9G7z7NNsaAe/kq.TCaY4nmBA4Dfu', 0, 'STOR_1'),
('d24f0810e941512e3a035e70783f0536bab5a53670435211b410b16421a75c7a', '0', 'pmanager@gmail.com', 'kaivndu', 'damsith', 'Mahawaththa ,lewke ,galathara', '🇦🇽 Åland Islands', '4', '$2a$10$vPx7jdQj0/OLrQb9T3bg/eRiw65kZLuxm.skbIXUOaD1hTFgUusxi', 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assistant`
--
ALTER TABLE `assistant`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_order_product` (`product_id`),
  ADD KEY `user_order_product` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_route` (`store_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `train`
--
ALTER TABLE `train`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `train_trip`
--
ALTER TABLE `train_trip`
  ADD PRIMARY KEY (`order_product_id`);

--
-- Indexes for table `truck`
--
ALTER TABLE `truck`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_truck` (`store_id`);

--
-- Indexes for table `truck_delivery`
--
ALTER TABLE `truck_delivery`
  ADD PRIMARY KEY (`order_product_id`),
  ADD KEY `route_dilivrey` (`route_id`),
  ADD KEY `truck_dilivrey` (`truck_id`),
  ADD KEY `driver_dilivrey` (`driver_user_id`),
  ADD KEY `assistant_dilivrey` (`assistant_user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assistant`
--
ALTER TABLE `assistant`
  ADD CONSTRAINT `user_assistant` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `driver`
--
ALTER TABLE `driver`
  ADD CONSTRAINT `user_driver` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `product_order_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `user_order_product` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `route`
--
ALTER TABLE `route`
  ADD CONSTRAINT `store_route` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`);

--
-- Constraints for table `truck`
--
ALTER TABLE `truck`
  ADD CONSTRAINT `store_truck` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`);

--
-- Constraints for table `truck_delivery`
--
ALTER TABLE `truck_delivery`
  ADD CONSTRAINT `assistant_dilivrey` FOREIGN KEY (`assistant_user_id`) REFERENCES `assistant` (`user_id`),
  ADD CONSTRAINT `driver_dilivrey` FOREIGN KEY (`driver_user_id`) REFERENCES `driver` (`user_id`),
  ADD CONSTRAINT `order_product_dilivrey` FOREIGN KEY (`order_product_id`) REFERENCES `order_product` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `route_dilivrey` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`),
  ADD CONSTRAINT `truck_dilivrey` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
