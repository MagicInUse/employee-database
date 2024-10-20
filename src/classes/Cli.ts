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
      // this.getDepartmentBudget();

      this.mainMenu();  
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

  async addDepartment() {
    console.log("Beginning the process of adding a department...");
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the new department?"
      }
    ]);
    query.addDepartment(answers.department).then((_res) => { 
      console.log("Department added successfully!"); 
      this.viewAllDepartments();
    });
  }

  async addRole() {
    console.log("Beginning the process of adding a role...");
    const answers = await inquirer.prompt([
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
    ]);
    query.addRole(answers.title, answers.salary, answers.department_id).then((_res) => { 
      console.log("Role added successfully!"); 
      this.viewAllRoles();
    });
  }

  async addEmployee() {
    console.log("Beginning the process of adding an employee...");
    const answers = await inquirer.prompt([
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
    ])
    if (answers.manager_id === "") {
      answers.manager_id = null;
    }
    query.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id).then((_res) => { 
      console.log("Employee added successfully!"); 
      this.viewAllEmployees();
    });
  }

  async updateEmployeeRole() {
    console.log("Beginning the process of updating an employee role...");
    this.viewAllEmployees();
    this.viewAllRoles();
    const answers = await inquirer.prompt([
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
    ]);
    query.updateEmployeeRole(answers.employee_id, answers.role_id).then((_res) => { 
      console.log("Employee role updated successfully!"); 
      this.viewAllEmployees();
    });
  }

  /*
    Define Bonus SQL functions
  */

  async updateEmployeeManager() {
    console.log("Beginning the process of updating an employee manager...");
    this.viewAllEmployees();
    const answers = await inquirer.prompt([
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
    ]);
    if (answers.manager_id === "") {
      answers.manager_id = null;
    }
    query.updateEmployeeManager(answers.employee_id, answers.manager_id).then((_res) => { 
      console.log("Employee manager updated successfully!"); 
      this.viewAllEmployees();
    });
  }

  async viewEmployeesByManager() {
    console.log("Beginning the process of viewing employees by manager...");
    this.viewAllEmployees();
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "manager_id",
        message: "What is the ID of the manager?"
      }
    ]);
    query.getEmployeesByManager(answers.manager_id).then((res) => { 
      console.log("Viewing employees by manager...");
      this.displayTable(res);
    });
  }

  async deleteDepartment() {
    console.log("Beginning the process of deleting a department...");
    this.viewAllDepartments();
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "department_id",
        message: "What is the ID of the department?"
      }
    ]);
    query.deleteDepartment(answers.department_id).then((_res) => { 
      console.log("Department deleted successfully!"); 
      this.viewAllDepartments();
    });
  }

  async deleteRoles() {
    //TODO: add the option to replace the role with a new role
    console.log("Beginning the process of deleting a role...");
    this.viewAllRoles();
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "role_id",
        message: "What is the ID of the role?"
      }
    ]);
    query.deleteRole(answers.role_id).then((_res) => { 
      console.log("Role deleted successfully!"); 
      this.viewAllRoles();
    });
  }

  async deleteEmployee() {
    console.log("Beginning the process of deleting an employee...");
    this.viewAllEmployees();
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the ID of the employee?"
      }
    ]);
    query.deleteEmployee(answers.employee_id).then((_res) => { 
      console.log("Employee deleted successfully!"); 
      this.viewAllEmployees();
    });
  }

  async getDepartmentBudget() {
    console.log("Beginning the process of viewing the department budget utilization...");
    this.viewAllDepartments();
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "department_id",
        message: "What is the ID of the department?"
      }
    ]);
    query.getDepartmentBudget(answers.department_id).then((res) => { 
      console.log("Viewing the total department budget utilization...");
      this.displayTable(res);
    });
  }

  /*
    Define CLI user interaction functions
  */

  // TODONE: add a main menu to loop through
  // TODONE: add a quit option to the main menu
  async mainMenu() {
    const answers = await inquirer.prompt([
      {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
              "View All Departments",
              "View All Roles",
              "View All Employees",
              "Add Department",
              "Add Role",
              "Add Employee",
              "Update Employee Role",
              "Update Employee Manager",
              "View Employees By Manager",
              "Delete Department",
              "Delete Role",
              "Delete Employee",
              "View Department Budget",
              "Quit"
          ]
      }
    ]);
    
    switch (answers.action) {
      case "View All Departments":
          this.viewAllDepartments();
          break;
      case "View All Roles":
          this.viewAllRoles();
          break;
      case "View All Employees":
          this.viewAllEmployees();
          break;
      case "Add Department":
          await this.addDepartment();
          break;
      case "Add Role":
          await this.addRole();
          break;
      case "Add Employee":
          await this.addEmployee();
          break;
      case "Update Employee Role":
          await this.updateEmployeeRole();
          break;
      case "Update Employee Manager":
          await this.updateEmployeeManager();
          break;
      case "View Employees By Manager":
          await this.viewEmployeesByManager();
          break;
      case "Delete Department":
          await this.deleteDepartment();
          break;
      case "Delete Role":
          await this.deleteRoles();
          break;
      case "Delete Employee":
          await this.deleteEmployee();
          break;
      case "View Department Budget":
          await this.getDepartmentBudget();
          break;
      case "Quit":
          console.log("Thank you for using Big Company data!");
          process.exit();
          break;
      default:
          console.log("Invalid action. Please try again.");
          break;
    }
    // Call mainMenu again to loop back
    this.mainMenu();
  }
}

// export the Cli class
export default Cli;