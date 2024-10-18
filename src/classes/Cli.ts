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
      // this.viewAllDepartments();
      // this.viewAllRoles();
      // this.viewAllEmployees();
      // this.addDepartment();
      // this.addRole();
      // this.addEmployee();
      // this.updateEmployeeRole();
      // this.updateEmployeeManager();
      // this.viewEmployeesByManager();
      // this.deleteDepartment();
      // this.deleteRoles();
      // this.deleteEmployee();
      this.getDepartmentBudget();
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


  /*
    Define basic SQL functions
  */

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

  /*
    Define advanced SQL functions
  */

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

  addRole() {
    console.log("Beginning the process of adding a role...");
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?"
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department ID of the new role?"
      }
    ]).then((answers) => {
      query.addRole(answers.title, answers.salary, answers.department_id).then((_res) => { 
        console.log("Role added successfully!"); 
        this.viewAllRoles();
      });
    });
  }

  addEmployee() {
    console.log("Beginning the process of adding an employee...");
    inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the new employee?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the new employee?"
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of the new employee?"
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager ID of the new employee?"
      }
    ]).then((answers) => {
      if (answers.manager_id === "") {
        answers.manager_id = null;
      }
      query.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id).then((_res) => { 
        console.log("Employee added successfully!"); 
        this.viewAllEmployees();
      });
    });
  }

  updateEmployeeRole() {
    console.log("Beginning the process of updating an employee role...");
    this.viewAllEmployees();
    this.viewAllRoles();
    inquirer.prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the ID of the employee?"
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the new role ID?"
      }
    ]).then((answers) => {
      query.updateEmployeeRole(answers.employee_id, answers.role_id).then((_res) => { 
        console.log("Employee role updated successfully!"); 
        this.viewAllEmployees();
      });
    });
  }

  /*
    Define Bonus SQL functions
  */

  updateEmployeeManager() {
    console.log("Beginning the process of updating an employee manager...");
    this.viewAllEmployees();
    inquirer.prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the ID of the employee?"
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the new manager ID?"
      }
    ]).then((answers) => {
      if (answers.manager_id === "") {
        answers.manager_id = null;
      }
      query.updateEmployeeManager(answers.employee_id, answers.manager_id).then((_res) => { 
        console.log("Employee manager updated successfully!"); 
        this.viewAllEmployees();
      });
    });
  }

  viewEmployeesByManager() {
    console.log("Beginning the process of viewing employees by manager...");
    this.viewAllEmployees();
    inquirer.prompt([
      {
        type: "input",
        name: "manager_id",
        message: "What is the ID of the manager?"
      }
    ]).then((answers) => {
      query.getEmployeesByManager(answers.manager_id).then((res) => { 
        console.log("Viewing employees by manager...");
        this.displayTable(res);
      });
    });
  }

  deleteDepartment() {
    console.log("Beginning the process of deleting a department...");
    this.viewAllDepartments();
    inquirer.prompt([
      {
        type: "input",
        name: "department_id",
        message: "What is the ID of the department?"
      }
    ]).then((answers) => {
      query.deleteDepartment(answers.department_id).then((_res) => { 
        console.log("Department deleted successfully!"); 
        this.viewAllDepartments();
      });
    });
  }

  deleteRoles() {
    //TODO: add the option to replace the role with a new role
    console.log("Beginning the process of deleting a role...");
    this.viewAllRoles();
    inquirer.prompt([
      {
        type: "input",
        name: "role_id",
        message: "What is the ID of the role?"
      }
    ]).then((answers) => {
      query.deleteRole(answers.role_id).then((_res) => { 
        console.log("Role deleted successfully!"); 
        this.viewAllRoles();
      });
    });
  }

  deleteEmployee() {
    console.log("Beginning the process of deleting an employee...");
    this.viewAllEmployees();
    inquirer.prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the ID of the employee?"
      }
    ]).then((answers) => {
      query.deleteEmployee(answers.employee_id).then((_res) => { 
        console.log("Employee deleted successfully!"); 
        this.viewAllEmployees();
      });
    });
  }

  getDepartmentBudget() {
    console.log("Beginning the process of viewing the department budget utilization...");
    this.viewAllDepartments();
    inquirer.prompt([
      {
        type: "input",
        name: "department_id",
        message: "What is the ID of the department?"
      }
    ]).then((answers) => {
      query.getDepartmentBudget(answers.department_id).then((res) => { 
        console.log("Viewing the total department budget utilization...");
        this.displayTable(res);
      });
    });
  }

  /*
    Define CLI user interaction functions
  */

  // TODO: add a main menu
  // TODO: add a sub-menu for each main menu option
  // TODO: add a back option to each sub-menu
  // TODO: add a quit option to the main menu
  
}

// export the Cli class
export default Cli;