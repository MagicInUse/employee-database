// imports
import { pool, connectToDb } from '../interfaces/connection.js';
// call the connectToDb function to connect to the PostgreSQL database
await connectToDb();

// TODO: Write a class that contains functions for
// performing specific SQL queries to the database.
class Query {
    // first demo function to get all the data from the
    // employee table in the DB_NAME (.env variable) database
    async getAllEmployeeData() {
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

    // TODO: View all departments


    // TODO: View all roles


    // TODO: View all employees


    // TODO: Add a department


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