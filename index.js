const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const path = require("path");

function generatePrompt() {
    inquirer
        .prompt({
                name: 'prompt',
                type: 'list',
                message: 'What would you like to do?',
                choices:
                [
                    "Add department",
                    "Add role",
                    "Add employee",
                    "View departments",
                    "View roles",
                    "View employees",
                    "Update department",
                    "Update role",
                    "Update employee",
                    "Quit"
                ]
        })
        .then((select) => {
            switch (select.prompt) {
                case "Add department":
                    addDepartment();
                    return;

                case "Add role":
                    addRole();
                    return;

                case "Add employee":
                    addEmployee();
                    return;

                case "View departments":
                    viewDepartments();
                    return;

                case "View roles":
                    viewRoles();
                    return;

                case "View employees":
                    viewEmployees();
                    return;

                case "Update department":
                    updateDepartment();
                    return;

                case "Update role":
                    updateRole();
                    return;

                case "Update employee":
                    updateEmployee();
                    return;

                case "Quit":
                    return;

                default:
                    connection.end();
            }
        })
}

function addDepartment() {
    inquirer
    .prompt({
        name: 'department_name',
        type: 'input',
        message: 'What is the name of the department?',
    })
    .then(response => {
        db.createDepartment(response);
        generatePrompt();
    })
}

function addRole() {
    db
    .getRoles()
    .then((role) => {

        console.log(role);

        const roleChoices = role.map((role) => ({
            value: role.id,
            name:  role.title,
        }))

        console.log(roleChoices);

        inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?',
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: roleChoices,
            }
        ]).then(response => {
            db.createRole(response);
            generatePrompt();
            })
    })
}

function addEmployee() {
    db
    .getEmployeesAndRoles()
    .then((employees) => {

        console.log(employees);

        const employeeChoices = employees.map((employees) => ({
            value: employees.id,
            name: employees.first_name + " " + employees.last_name
        }))

        const roleChoices = employees.map((employees) => ({
            value: employees.role_id,
            name: employees.title,
        }))

        console.log(
            employees.map((employees) => ({
                id: employees.id,
                first: employees.first_name,
                last: employees.last_name,
                title: employees.title,
                manager: employees.manager_id,
            }))
        );

    inquirer
    .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is the employee's last name?",
        },
        {
            name: 'role_id',
            type: 'list',
            message: "What is the employee's role?",
            choices: roleChoices,
        },
        {
            name: 'manager_id',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: employeeChoices,
        }
    ]).then((response) => {
        console.log(response);
        db.createEmployee(response);
        generatePrompt()
        })
    })
}

function viewDepartments() {
    db
        .getDepartments()
        .then((results) => {
            console.table(results);
            generatePrompt();
        })
}

function viewRoles() {
    db
        .getRoles()
        .then((results) => {
            console.table(results);
            generatePrompt();
        })
}
function viewEmployees() {
    db
        .getEmployees()
        .then((results) => {
            console.table(results);
            generatePrompt();
        })
}

function updateRole() {
    db
    .getEmployeesAndRoles()
    .then((employees) => {

        console.log(employees);

        const employeeChoices = employees.map((employees) => ({
            value: employees.id,
            name: employees.first_name + " " + employees.last_name
        }))

        const roleChoices = employees.map((employees) => ({
            value: employees.role_id,
            name: employees.title,
        }))

        console.log(
            employees.map((employees) => ({
                id: employees.id,
                first: employees.first_name,
                last: employees.last_name,
                title: employees.title,
                manager: employees.manager_id,
            }))
        );

    inquirer
    .prompt([
        {
            name: 'id',
            type: 'list',
            message: "Which employee would you like to update?",
            choices: employeeChoices,
        },
        {
            name: 'role_id',
            type: 'list',
            message: "What is the employee's new role?",
            choices: roleChoices,
        },
    ]).then((response) => {
        console.log(response);
        db.updateEmployee(response);
        generatePrompt()
        })
    })
}

generatePrompt();


