CREATE DATABASE pet_selling_system;

USE pet_selling_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_address TEXT NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(id)
);
