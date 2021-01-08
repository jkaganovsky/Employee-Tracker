const connect = require("./connection");

module.exports = {
        getAll(table) {
            return connect.query("SELECT * FROM ??", table)
        },

        getDepartments() {
            return connect.query("SELECT * FROM department")
        },

        getRoles() {
            return connect.query(
                `SELECT
                employee_role.id,
                employee_role.title, employee_role.salary, department.department_name
                AS department
                FROM employee_role
                LEFT JOIN department
                ON employee_role.department_id = department.id;`)
        },

        getEmployees() {
            return connect.query(
                `SELECT
                employee.id,
                CONCAT(employee.first_name, " ", employee.last_name)
                AS employee_name,
                employee_role.title, employee_role.salary, department.department_name
                AS department,
                CONCAT(manager.first_name, " ", manager.last_name)
                AS manager
                FROM employee
                LEFT JOIN employee_role
                ON employee.role_id = employee_role.id
                LEFT JOIN department
                ON employee_role.department_id = department.id
                LEFT JOIN employee manager
                ON manager.id = employee.manager_id;`)
        },

        getEmployeesAndRoles() {
            return connect.query(
                `SELECT *
                FROM employee_role
                LEFT JOIN employee
                ON employee.id = employee_role.id
                ORDER BY employee.id;`
            )
        },

        createDepartment(data) {
            return connect.query("INSERT INTO department SET ?", data)
        },

        createRole(data) {
            return connect.query("INSERT INTO employee_role SET ?", data)
        },

        createEmployee(data) {
            return connect.query("INSERT INTO employee SET ?", data)
        },

        updateEmployee(data) {
            return connect.query("UPDATE employee SET ? WHERE ?", data)
        },

        deleteEmployees(data) {
            return connect.query(
                `DELETE FROM employee
                WHERE ?`, data)
        }

}

