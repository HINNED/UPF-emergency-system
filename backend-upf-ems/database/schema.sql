CREATE DATABASE IF NOT EXISTS upf_ems;
USE upf_ems;

-- USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'officer', 'station') NOT NULL,
    station VARCHAR(100),
    station_key VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CASES TABLE
CREATE TABLE cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_number VARCHAR(20) NOT NULL UNIQUE,
    caller_name VARCHAR(100) NOT NULL,
    caller_phone VARCHAR(15) NOT NULL,
    emergency_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100),
    referral_station VARCHAR(100),
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    assigned_officer INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_officer) REFERENCES users(id)
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    case_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert default users (replace password_hash with real bcrypt hashes)
INSERT INTO users (username, password_hash, role)
VALUES 
('admin', '$2b$10$w3n8n8n8n8n8n8n8n8n8nOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'admin'),
('officer1', '$2b$10$w3n8n8n8n8n8n8n8n8n8nOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'officer'),
('station1', '$2b$10$w3n8n8n8n8n8n8n8n8n8nOQw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1Qw1', 'station', 'Kiira Road', 'kiira2023');