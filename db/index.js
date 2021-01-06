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

        createDepartment(data) {
            return connect.query("INSERT INTO department SET ?", data)
        },

        createRole(data) {
            return connect.query("INSERT INTO employee_role SET ?", data)
        },
}

