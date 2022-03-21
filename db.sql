-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 18, 2022 at 02:34 PM
-- Server version: 8.0.28
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `family_budget`
--

-- --------------------------------------------------------

--
-- Table structure for table `budget_user`
--

CREATE TABLE `budget_user` (
  `user_id` int NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password_user` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `budget_user`
--

INSERT INTO `budget_user` (`user_id`, `firstname`, `lastname`, `email`, `password_user`, `address`, `phone`) VALUES
(1, 'Adebola', 'Onikoyi', 'onikoyiadebola@gmail.com', '123456', 'Roehampton Lane SW15 London', '7258963145'),
(2, 'Samuel', 'Ogbuokiri', 'endidocksam88@gmail.com', '0077@', 'Claphmam Junction SW18 London', '70959574243'),
(3, 'John', 'Ogundina', 'ogundinajohn@gmail.com', '12345678', 'Roehampton Lane SW15 London', '7258964582'),
(4, 'Zenepe', 'Kolaveri', 'zenepekolaveri@gmail.com', '2222@@', 'Harlesden NW10 London', '7258961436');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expense_id` int NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `category` varchar(30) NOT NULL,
  `amount_GBP` decimal(10,2) NOT NULL,
  `expense_date` date NOT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `description`, `category`, `amount_GBP`, `expense_date`, `user_id`) VALUES
(1, 'Market', 'Shopping', '20.30', '2022-02-20', 3),
(2, 'Wine', 'Drink', '5.00', '2022-02-10', 3),
(3, 'Train ticket', 'Transportation', '15.80', '2022-02-15', 3),
(4, 'help children', 'Charity', '50.00', '2022-02-04', 3),
(5, 'Bus ticket', 'Transportation', '16.30', '2022-02-28', 4),
(6, 'Tesco', 'Shopping', '47.50', '2022-02-12', 4),
(7, 'Clothes', 'Shopping', '30.65', '2022-02-02', 4),
(8, 'Gas', 'Utilities', '70.00', '2022-02-10', 1),
(9, 'Car', 'Insurance', '28.50', '2022-02-27', 1),
(10, 'Netflix', 'Entertainment', '10.60', '2022-02-13', 1),
(11, 'Water', 'Drink', '1.20', '2022-02-20', 2),
(12, 'Top-up', 'Communication', '10.15', '2022-02-01', 2);

-- --------------------------------------------------------

--
-- Table structure for table `income`
--

CREATE TABLE `income` (
  `i_id` int NOT NULL,
  `i_category` varchar(30) NOT NULL,
  `i_amount_GBP` decimal(10,2) NOT NULL,
  `i_date` date NOT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `income`
--

INSERT INTO `income` (`i_id`, `i_category`, `i_amount_GBP`, `i_date`, `user_id`) VALUES
(1, 'Salary', '1500.36', '2022-02-01', 3),
(2, 'Gift', '210.00', '2022-02-05', 3),
(3, 'Salary', '2341.90', '2022-02-02', 4),
(4, 'Other', '428.00', '2022-02-10', 4),
(5, 'Profit', '900.30', '2022-02-15', 1),
(6, 'Salary', '1800.50', '2022-02-01', 2),
(7, 'Savings', '200.30', '2022-02-01', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budget_user`
--
ALTER TABLE `budget_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_id`),
  ADD KEY `budget_user` (`user_id`);

--
-- Indexes for table `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`i_id`),
  ADD KEY `user_id` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
