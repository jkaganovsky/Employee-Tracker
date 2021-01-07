USE employee_trackerDB;
INSERT INTO department
    (department_name)
VALUES
    ("Hematology"),
    ("Chemistry"),
    ("Virology"),
    ("Genetics");

INSERT INTO employee_role
	(title, salary, department_id)
VALUES
    ("Laboratory Lead", 63000, 1),
    ("Lab Technician", 45000, 1),
    ("Lab Scientist", 67000, 2),
    ("Student Assistant", 38000, 2),
    ("Lab Assistant", 40000, 3),
    ("Director", 97000, 3),
    ("Manager", 85000, 4),
    ("Supervisor", 75000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Sam", "Barnes", 2, 1),
    ("Abigail", "Santos", 3, NULL),
    ("Araya", "Fabio", 4, 3),
    ("Sumit", "Singh", 5, NULL),
    ("April", "Brown", 6, 5),
    ("Billy", "Thor", 7, NULL),
    ("Travis", "McKowski", 8, 7)