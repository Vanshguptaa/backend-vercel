-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS crm_db;
USE crm_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  status ENUM('Active', 'Inactive', 'Pending') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  industry VARCHAR(100),
  budget VARCHAR(50),
  expected_close_date DATE,
  status ENUM('New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost') DEFAULT 'New',
  source VARCHAR(50),
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  assigned_to VARCHAR(100),
  notes TEXT,
  last_contact_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  lead_id INT,
  customer_id INT,
  value DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'USD',
  stage ENUM('Qualification', 'Proposal', 'Negotiation', 'Contract', 'Closed Won', 'Closed Lost') DEFAULT 'Qualification',
  probability INT DEFAULT 0,
  expected_close_date DATE,
  assigned_to VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Communication History table
CREATE TABLE IF NOT EXISTS communications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lead_id INT,
  customer_id INT,
  type ENUM('Email', 'Call', 'Meeting', 'Note') NOT NULL,
  subject VARCHAR(200),
  content TEXT,
  direction ENUM('Inbound', 'Outbound') DEFAULT 'Outbound',
  status ENUM('Scheduled', 'Completed', 'Failed') DEFAULT 'Completed',
  scheduled_date DATETIME,
  completed_date DATETIME,
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date DATE,
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  assigned_to INT,
  related_to VARCHAR(50),
  related_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
); 