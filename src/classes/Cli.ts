// imports
import inquirer from "inquirer";
import Query from './Query.js';

// create a new instance of the Query class
const query = new Query();
// example query:
// query.getAllEmployeeData().then((res) => { console.log(res); });

// define the Cli class
class Cli {
  // define the startCli method
  startCli() {
      // log a welcome message
      console.log(`
#####    #######   #####       #####    #####   ##   ##  ######     ###    ###  ##  ###  ##
##  ##     ###    ###         ###  ##  ###  ##  ### ###  ###  ##   #####   ###  ##  ###  ##
#####      ###    ### ##      ##       ###  ##  #######  ###  ##   ## ##   #### ##  #######
##  ##     ###    ###  ##     ##   ##  ###  ##  #######  #######  ##   ##  #######   ##### 
##  ###    ###    ###  ##     ###  ##  ###  ##  #######  ######   ##   ##  #######    ###  
#######  #######  #######     #######  #######  ###  ##  ####     ## ####  ### ###    ###  
######   #######  #######     #######  #######  ###  ##  ####     ## ####  ###  ##    ###  
######   #######   #####       #####    #####   ###  ##  ####     ##   ##  ###  ##    ###  

     Welcome to the Big Company CLI!`);
      // call the testPrompt method for an example server response
      // this.testPrompt();
      this.viewAllDepartments();
      this.viewAllRoles();
      this.viewAllEmployees();
      this.addDepartment();
  }

  // define the testPrompt method
  testPrompt() {
      // prompt the user with a list
      inquirer.prompt([
        {
          type: "list",
          name: "department",
          message: "Which department would you like to view?",
          choices: ["Engineering", "Sales", "Finance", "Legal"]
        }
      ]).then((answers) => {
        // log the user's response
        if (answers.department === "Engineering") {
          console.log("Viewing Engineering department...");
          query.getAllEmployees().then((res) => { this.displayTable(res); });
        }
        else if (answers.department === "Sales") {
          console.log("Viewing Sales department...");
        }
        else if (answers.department === "Finance") {
          console.log("Viewing Finance department...");
        }
        else if (answers.department === "Legal") {
          console.log("Viewing Legal department...");
        }
        else {
          console.log("Unexpected Error.");
        }
      });
  }

  // This is the brains behind easily displaying the json response data!
  // An automatically calculated table is made to fit the incoming json
  // response data with labels representing the columns / keys and the
  // data representing the rows. All of this also done while adapting
  // graphically to fit to rows data.
  displayTable(data: any[]) {
    if (data.length === 0) {
      console.log("No data available - Table creation failed!");
      return;
    }

    // Extract column names from the keys of the first object
    const columns = Object.keys(data[0]);

    // Calculate the maximum width for each column
    const columnWidths = columns.map(column => 
      Math.max(column.length, ...data.map(row => String(row[column]).length))
    );

    // Create a horizontal separator
    const separator = columnWidths.map(width => '-'.repeat(width + 2)).join('+');

    // Print the column headers
    const header = columns.map((column, index) => 
      column.padEnd(columnWidths[index])
    ).join(' | ');

    console.log(separator);
    console.log(`| ${header} |`);
    console.log(separator);

    // Print each row of data
    data.forEach(row => {
      const rowString = columns.map((column, index) => 
        String(row[column]).padEnd(columnWidths[index])
      ).join(' | ');
      console.log(`| ${rowString} |`);
    });

    console.log(separator);
  }

  viewAllDepartments() {
    query.getAllDepartments().then((res) => {
      console.log("Viewing all departments...");
      this.displayTable(res);
    });
  }

  viewAllRoles() {
    query.getAllRoles().then((res) => {
      console.log("Viewing all roles...");
      this.displayTable(res);
    });
  }

  viewAllEmployees() {
    query.getAllEmployees().then((res) => { 
      console.log("Viewing all employees...");
      this.displayTable(res);
    });
  }

  addDepartment() {
    console.log("Beginning the process of adding a department...");
    inquirer.prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the new department?"
      }
    ]).then((answers) => {
      query.addDepartment(answers.department).then((_res) => { 
        console.log("Department added successfully!"); 
        this.viewAllDepartments();
      });
    });
  }
}

// export the Cli class
export default Cli;