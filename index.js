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

                case "Quit":
                    return;

                default:
                    connection.end();
            }
        })
}

function renderDepartment() {
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

function renderRole() {
    db
    .getRoles()
    .then((role) => {

        console.log(role);

        const roleChoices = role.map((role) => ({
            value: role.id,
            name:  role.title,
        }))

        console.log(
            role.map((role) => ({
                value: role.id,
                name:  role.title,
            }))
        );

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

function renderEmployee() {
    inquirer
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
            generatePrompt()
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


