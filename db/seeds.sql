-- Seed data for department table
INSERT INTO department (department_name) VALUES 
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales');

-- Seed data for role table
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000.00, 1),
('HR Manager', 60000.00, 2),
('Marketing Specialist', 55000.00, 3),
('Sales Representative', 50000.00, 4);

-- Seed data for employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Jones', 3, NULL),
('Michael', 'Brown', 4, NULL),
('Sarah', 'Davis', 1, 1),
('David', 'Wilson', 2, 2),
('Laura', 'Taylor', 3, 3),
('James', 'Anderson', 4, 4);