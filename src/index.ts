// imports
import Cli from "./classes/Cli.js";
import Query from './classes/Query.js';

// create a new instance of the Query class
const query = new Query();

// query.getAllEmployeeData().then((res) => { console.log(res); });

// create a new instance of the Cli class
const cli = new Cli();
// start the cli
cli.startCli();