// imports
import { pool, connectToDb } from '../interfaces/connection.js';
// call the connectToDb function to connect to the PostgreSQL database
await connectToDb();

// TODO: Write a class that contains functions for
// performing specific SQL queries to the database.
class Query {
    // TODO: View all departments
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

    // TODO: View all roles
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

    // TODO: View all employees
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

    // TODO: Add a department
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

    // TODO: Add a role


    // TODO: Add an employee


    // TODO: Update an employee role


    // BONUS TODO: Update an employee manager


    // BONUS TODO: View employees by manager


    // BONUS TODO: Delete departments


    // BONUS TODO: Delete roles


    // BONUS TODO: Delete employees


    // BONUS TODO: View the total utilized budget of a department


}

//export the Query class
export default Query;