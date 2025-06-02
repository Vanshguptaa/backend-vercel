-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS crm_db;
USE crm_db;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password is 'admin123')
INSERT INTO users (username, password) 
VALUES ('admin', '$2a$10$8K1p/a0dR1xqM8K1p/a0dR1xqM8K1p/a0dR1xqM8K1p/a0dR1xqM8K1p')
ON DUPLICATE KEY UPDATE password = VALUES(password);

-- Insert test user (password is 'test123')
INSERT INTO users (username, password) 
VALUES ('test', '$2a$10$8K1p/a0dR1xqM8K1p/a0dR1xqM8K1p/a0dR1xqM8K1p/a0dR1xqM8K1p')
ON DUPLICATE KEY UPDATE password = VALUES(password);

UPDATE users 
SET password = '$2b$10$3UEqG55a/ez5On.mi3wnQ.DrIRpmtM6LMQzsbXT0e3tkP.2hR0N4K'
WHERE username = 'admin'; 