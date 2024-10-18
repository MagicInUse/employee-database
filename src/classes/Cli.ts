// imports
import inquirer from "inquirer";

// define the Cli class
class Cli {
  // define the startCli method
  startCli() {
      // log a welcome message
      console.log("Welcome to the CLI!");
      // call the promptUser method
      this.promptUser();
  }

  // define the promptUser method
  promptUser() {
      // prompt the user with a question
      inquirer.prompt([
          {
              type: "input",
              name: "name",
              message: "What is your name?"
          }
      ]).then((answers) => {
          // log the user's response
          console.log(`Hello, ${answers.name}!`);
      });
  }
}

// export the Cli class
export default Cli;