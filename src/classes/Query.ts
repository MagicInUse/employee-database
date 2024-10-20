// imports
import { pool, connectToDb } from '../interfaces/connection.js';
// call the connectToDb function to connect to the PostgreSQL database
await connectToDb();

// TODONE: Write a class that contains functions for
// performing specific SQL queries to the database.
class Query {
    // TODONE: View all departments
    async getAllDepartments() {
        // SQL query
        const query = "SELECT * FROM department";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query);
            // return the result
            return res.rows;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODONE: View all roles
    async getAllRoles() {
        // SQL query
        const query = "SELECT * FROM role";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query);
            // return the result
            return res.rows;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODONE: View all employees
    // first demo function written to get all the data from the
    // employee table in the DB_NAME (.env variable) database
    // moved function but kept note for fun easter egg
    async getAllEmployees() {
        // SQL query
        const query = "SELECT * FROM employee";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query);
            // return the result
            return res.rows;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODONE: Add a department
    async addDepartment(department: string) {
        // SQL query
        const query = "INSERT INTO department (department_name) VALUES ($1)";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [department]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODONE: Add a role
    async addRole(title: string, salary: number, departmentId: number) {
        // SQL query
        const query = "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [title, salary, departmentId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODONE: Add an employee
    async addEmployee(firstName: string, lastName: string, roleId: number, managerId: number) {
        // SQL query
        const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [firstName, lastName, roleId, managerId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODONE: Update an employee role
    async updateEmployeeRole(employeeId: number, roleId: number) {
        // SQL query
        const query = "UPDATE employee SET role_id = $1 WHERE id = $2";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [roleId, employeeId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // BONUS TODONE: Update an employee manager
    async updateEmployeeManager(employeeId: number, managerId: number) {
        // SQL query
        const query = "UPDATE employee SET manager_id = $1 WHERE id = $2";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [managerId, employeeId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // BONUS TODONE: View employees by manager
    async getEmployeesByManager(managerId: number) {
        // SQL query
        const query = "SELECT * FROM employee WHERE manager_id = $1";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [managerId]);
            // return the result
            return res.rows;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // BONUS TODONE: Delete departments
    async deleteDepartment(departmentId: number) {
        // SQL query
        const query = "DELETE FROM department WHERE id = $1";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [departmentId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // BONUS TODONE: Delete roles
    async deleteRole(roleId: number) {
        // SQL query
        const query = "DELETE FROM role WHERE id = $1";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [roleId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // BONUS TODONE: Delete employees
    async deleteEmployee(employeeId: number) {
        // SQL query
        const query = "DELETE FROM employee WHERE id = $1";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [employeeId]);
            // return the result
            return res;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // BONUS TODONE: View the total utilized budget of a department
    async getDepartmentBudget(departmentId: number) {
        // SQL query
        const query = "SELECT SUM(salary) AS Salary_Totals FROM role WHERE department_id = $1";
        // try-catch block
        try {
            // execute the query
            const res = await pool.query(query, [departmentId]);
            // return the result
            return res.rows;
        } catch (err) {
            // return the error
            return err;
        }
    }

    // TODO: Clean up the queries for better json formatting on the front end
}

//export the Query class
export default Query;