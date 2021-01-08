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
                    // "Update department",
                    "Update role",
                    // "Update employee",
                    "Quit"
                ]
        })
        .then((select) => {
            switch (select.prompt) {
                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartments();
                    break;

                case "View roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                // case "Update department":
                //     updateDepartment();
                //     break;

                case "Update role":
                    updateRole();
                    break;

                // case "Update employee":
                //     updateEmployee();
                //     break;

                case "Quit":
                    break;

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

        console.log("You have successfully added a new department!");
        generatePrompt();
    })
}

function addRole() {
    db
    .getRoles()
    .then((role) => {

        console.table(role);

        const roleChoices = role.map((role) => ({
            value: role.id,
            name:  role.title,
        }))

        console.table(roleChoices);

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

        console.table(employees);

        const employeeChoices = employees.map((employees) => ({
            value: employees.id,
            name: employees.first_name + " " + employees.last_name
        }))

        const roleChoices = employees.map((employees) => ({
            value: employees.role_id,
            name: employees.title,
        }))

        console.table(employeeChoices, roleChoices);

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
        console.table(response);
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

        console.table(employees);

        const employeeChoices = employees.map((employees) => ({
            value: employees.id,
            name: employees.first_name + " " + employees.last_name
        }))

        const roleChoices = employees.map((employeeRoles) => ({
            // if (employees != "null") {
                value: employeeRoles.id,
                name: employeeRoles.title,
            // }
        }))

        console.table(roleChoices
            // employees.map((employees) => ({
            //     id: employees.id,
            //     first: employees.first_name,
            //     last: employees.last_name,
            //     title: employees.title,
            //     manager: employees.manager_id,
            // }))
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
        console.table(response);
        const data = [ {role_id: response.role_id}, {id: response.id} ]
        db.updateEmployee(data);
        generatePrompt()
        })
    })
}

generatePrompt();


