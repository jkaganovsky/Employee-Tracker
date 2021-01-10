const db = require("./db");
const connection = require("./db/connection");
const inquirer = require("inquirer");
const path = require("path");

// PROMPTS
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
                    // "View employees by manager",
                    // "View total departmental budget",
                    // "Update department",
                    "Update role",
                    // "Update employee",
                    // "Update employee managers",
                    // "Delete departments",
                    // "Delete roles",
                    "Delete employees",
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

                // case "View employees by manager":
                //     viewEmployeesByManager();
                //     break;

                // case "View total utilized budget of a department":
                //     viewBudget();
                //     break;

                // case "Update department":
                //     updateDepartment();
                //     break;

                case "Update role":
                    updateRole();
                    break;

                // case "Update employee":
                //     updateEmployee();
                //     break;

                // case "Update employee managers":
                //     updateEmployeeManagers();
                //     break;

                // case "Delete departments":
                //     deleteDepartments();
                //     break;

                // case "Delete roles":
                //     deleteRoles();
                //     break;

                case "Delete employees":
                    deleteEmployees();
                    break;

                case "Quit":
                    break;

                default:
                    connection.end();
            }
        })
}

// ADD
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
        .getDepartments()
        .then((department) => {

            console.table(department);

            const departmentChoices = department.map((department) => ({
                value: department.id,
                name:  department.department_name,
            }))

            console.table(departmentChoices);

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
                    choices: departmentChoices,
                }
            ])
            .then(response => {
                console.log(response);
                db.createRole(response);
                generatePrompt();
            })
    })
}

function addEmployee() {
    db
        .getRoles()
        .then((roles) => {

            console.table(roles);

            const roleChoices = roles.map((roles) => ({
                value: roles.id,
                name: roles.title
            }))

    // db
    //     .getEmployees()
    //     .then((employee) => {
    //         const employeeChoices = employee.map((employee) => ({
    //             value: employee.id,
    //             name: employee.first_name + " " + roles.last_name,
    //         }))

            // console.table(employeeChoices);
            // console.table(roleChoices);

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
                // {
                //     name: 'manager_id',
                //     type: 'list',
                //     message: "Who is the employee's manager?",
                //     choices: employeeChoices,
                // }
            ])
            .then((response) => {
                console.table(response);
                db.createEmployee(response);
                generatePrompt()
            })
        })
}

// VIEW
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

// UPDATE
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
                    value: employeeRoles.id,
                    name: employeeRoles.title,
            }))

            console.table(roleChoices);

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
            ])
            .then((response) => {
                console.table(response);
                const data = [ {role_id: response.role_id}, {id: response.id} ]
                db.updateEmployee(data);
                generatePrompt()
            })
        })
}

// DELETE
function deleteEmployees() {
    db
        .getEmployees()
        .then((employees) => {

            console.table(employees);

            const employeeChoices = employees.map((employees) => ({
                value: employees.id,
                name: employees.employee_name
            }))

            console.table(employeeChoices);

        inquirer
            .prompt({
                    name: 'id',
                    type: 'list',
                    message: "Which employee would you like to delete?",
                    choices: employeeChoices,
            })
            .then((response) => {
                console.table(response);
                const data = {id: response.id}
                console.log(data);
                db.deleteEmployees(data);
                generatePrompt()
            })
        })
}

generatePrompt();

// Note comments for future development.
// Work on creating separate files for each function.
