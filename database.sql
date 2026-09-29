CREATE DATABASE IF NOT EXISTS swynex_crud;

USE swynex_crud;

CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO expenses (title, amount, category) VALUES
('Lunch', 500.00, 'Food'),
('Internet Bill', 2500.00, 'Utilities'),
('Transport', 800.00, 'Transport');