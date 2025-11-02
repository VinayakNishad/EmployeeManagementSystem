CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department VARCHAR(100),
    designation VARCHAR(100),
    join_date DATE
);

-- Insert some mock data
INSERT INTO employees (name, email, department, designation, join_date)
VALUES
('Alice Smith', 'alice@example.com', 'Engineering', 'Frontend Developer', '2021-06-01'),
('Bob Johnson', 'bob@example.com', 'Engineering', 'Backend Developer', '2019-03-15'),
('Charlie Brown', 'charlie@example.com', 'Marketing', 'SEO Specialist', '2020-01-10'),
('David Lee', 'david@example.com', 'Sales', 'Sales Manager', '2018-11-20'),
('Eva Green', 'eva@example.com', 'Engineering', 'UI/UX Designer', '2022-05-30'),
('Frank White', 'frank@example.com', 'HR', 'Recruiter', '2020-07-19'),
('Grace Hall', 'grace@example.com', 'Marketing', 'Content Writer', '2021-09-05');
