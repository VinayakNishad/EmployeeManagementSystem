-- 1. TABLE CREATION
-- -------------------
-- Drop the table if it already exists, so we can re-run the script

create database if needed
CREATE DATABASE IF NOT EXISTS employee_db;


DROP TABLE IF EXISTS employees;

-- Create the 'employees' table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    join_date DATE NOT NULL,

    -- Add indexes for faster filtering and searching
    -- The UNIQUE constraint on 'email' already creates an index
    INDEX (name),
    INDEX (department),
    INDEX (designation),
    INDEX (join_date)

    -- For MySQL, a FULLTEXT index is even better for the search bar
    -- which queries both name and email.
    -- FULLTEXT(name, email)
);


-- 2. SAMPLE DATA
-- ----------------
-- Insert sample data into the 'employees' table
INSERT INTO employees (name, email, department, designation, join_date) VALUES
('Alice Johnson', 'alice.j@example.com', 'Engineering', 'Senior Software Engineer', '2020-05-15'),
('Bob Smith', 'bob.s@example.com', 'Sales', 'Sales Manager', '2019-11-01'),
('Charlie Brown', 'charlie.b@example.com', 'Engineering', 'Software Engineer', '2022-03-10'),
('Diana Prince', 'diana.p@example.com', 'Marketing', 'Marketing Coordinator', '2021-07-22'),
('Eve Torres', 'eve.t@example.com', 'HR', 'HR Specialist', '2023-01-05'),
('Frank Miller', 'frank.m@example.com', 'Engineering', 'Product Manager', '2021-02-18'),
('Grace Lee', 'grace.l@example.com', 'Sales', 'Sales Associate', '2023-06-30'),
('Henry Wilson', 'henry.w@example.com', 'Marketing', 'SEO Specialist', '2022-09-14'),
('Ivy Green', 'ivy.g@example.com', 'Engineering', 'QA Tester', '2023-03-01'),
('Jack Black', 'jack.b@example.com', 'HR', 'Recruiter', '2022-11-20');

