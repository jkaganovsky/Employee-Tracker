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
        }
}