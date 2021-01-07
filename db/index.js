const connect = require("./connection");

module.exports = {
        getAll(table) {
            return connect.query("SELECT * FROM ??", table)
        },

        getDepartments() {
            return connect.query("SELECT * FROM department")
        },

        getRoles() {
            return connect.query("SELECT * FROM employee_role")
        },

        getEmployees() {
            return connect.query("SELECT * FROM employee")
        },

        getEmployeesAndRoles() {
            return connect.query(
                "SELECT *\
                FROM employee_trackerDB.employee\
                JOIN employee_trackerDB.employee_role\
                ON employee.role_id = employee_role.id"
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
            return connect.query("UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id: data.role_id
                },
                {
                    id: data.id
                }
            ])
        }
}

