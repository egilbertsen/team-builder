const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const util = require("util");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

var managerPrompt = [
    {
        type: "input",
        message: "Please enter the manger's name:",
        name: "managersName",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
            }
    },
    {
        type: "input",
        message: "Please enter the manger's id:",
        name: "managersId",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the manger's email:",
        name: "managersEmail",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the manger's office number:",
        name: "managersOffice",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    }
]

var engineerPrompt = [
    {
        type: "input",
        message: "Please enter the engineer's name:",
        name: "engineersName",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the engineers's id:",
        name: "engineersId",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the engineer's email:",
        name: "engineersEmail",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the engineer's GitHub handle:",
        name: "engineersGitHub",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    }    
]

var internPrompt = [
    {
        type: "input",
        message: "Please enter the intern's name:",
        name: "internsName",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the interns's id:",
        name: "internsId",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the intern's email:",
        name: "internsEmail",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    },
    {
        type: "input",
        message: "Please enter the intern's school:",
        name: "internsSchool",
        validate: function(answer) {
            if (answer !== "") {
                return true;
            }
            return "Please enter at least one character"
        }
    }
]

function managerBuilder(){
    inquirer.prompt(managerPrompt).then(function(answers) {
    let manager = new Manager(answers.managersName, answers.managersId, answers.managersEmail, answers.managersOffice);
    employees.push(manager);
    managerBoolean();
    });
}

function engineerBuilder(){
    inquirer.prompt(engineerPrompt).then(function(answers) {
    let engineer = new Engineer(answers.engineersName, answers.engineersId, answers.engineersEmail, answers.engineersGitHub);
    employees.push(engineer);
    engineerBoolean();
    });
}

function internBuilder(){
    inquirer.prompt(internPrompt).then(function(answers) {
    let intern = new Intern(answers.internsName, answers.internsId, answers.internsEmail, answers.internsSchool);
    employees.push(intern);
    internBoolean();
    });
}

function managerBoolean() {
    inquirer.prompt(
        {
            type: "confirm",
            message: "Would you like to add a manager?",
            name: "managerCreate"
        }
    ).then((answers) => {
        if (answers.managerCreate == true){
            managerBuilder();
        } else {
            engineerBoolean();
        }
    });            
}

function engineerBoolean() {
    inquirer.prompt(
        {
            type: "confirm",
            message: "Would you like to add an engineer?",
            name: "engineerCreate"
        }
    ).then((answers) => {
        if (answers.engineerCreate == true){
            engineerBuilder();
        } else {
            internBoolean();
        }
    });
}

function internBoolean() {
    inquirer.prompt(
        {
            type: "confirm",
            message: "Would you like to add an intern?",
            name: "internCreate"
        }
    ).then((answers) => {
        if (answers.internCreate == true){
            internBuilder();
        } else {
            createHtml(employees).then(function(){
                console.log("Successfully wrote to team.html");
            }).catch(function(err) {
                console.log(err);
            });
            return;
        }
    });    
}

managerBoolean();

function createHtml() {
    const html = render(employees);
    return writeFileAsync(outputPath, html);
}