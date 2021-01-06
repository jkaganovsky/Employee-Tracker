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
                choices: [
                        "Add department",
                        "Add role",
                        "Add employee",
                        "View departments",
                        "View roles",
                        "View employees",
                        "Update department",
                        "Update role",
                        "Update employee"
                ]
        })
        .then((select) => {
            switch (select.prompt) {
                case "Add department":
                    renderDepartment();
                    return;

                case "Add role":
                    renderRole();
                    return;

                case "Add employee":
                    renderEmployee();
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

                default:
                    connection.end();
            }
        })
}

function renderDepartment() {
    return inquirer
    .prompt({
            name: 'department',
            type: 'input',
            message: 'What is the name of the department?',
    })
    .then((response) => {
        if (response.department) {
            generatePrompt();
        }
    })
}

function renderRole() {
    return inquirer
    .prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What is the name of the role?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?',
        },
        {
            name: 'dept_role',
            type: 'input',
            message: 'Which department does the role belong to?',
        },
    ])
    .then((response) => {
        if (response.dept_role) {
            generatePrompt();
        }
    })
}

function renderEmployee() {
    return inquirer
    .prompt([
        {
            name: 'name',
            type: 'input',
            message: "What is the employee's first name?",
        },
        {
            name: 'employee_role',
            type: 'input',
            message: "What is the employee's role?",
        },
        {
            name: 'employee_mgr',
            type: 'input',
            message: "Who is the employee's manager?",
        },
    ]).then((response) => {
        if (response.employee_mgr) {
            generatePrompt();
        }
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

generatePrompt();


