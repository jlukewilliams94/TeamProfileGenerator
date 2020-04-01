// Source of Manager Class and Constructor
const Manager = require("./lib/Manager");
// Source of Engineer Class and Constructor
const Engineer = require("./lib/Engineer");
// Source of Intern Class and Constructor
const Intern = require("./lib/Intern");
// Inquirer.js source to prompt user for information in terminal
const inquirer = require("inquirer");
// Path to allow output to be directed to correct location to write team.html file
const path = require("path");
// fs to allow user to write hmtl file
const fs = require("fs");

// Allow the user to create file in output folder
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Function to render each class of object in Employee Array in correct html format
const render = require("./lib/htmlRenderer");

// Variable to store employee class objects that are created from inquirer prompts
let employeeArray = [];

// Questions stored in object array
const prompts = [{
    name: "name",
    type: "input",
    message: "What is the employee's name?"
},
{
    name: "id",
    type: "number",
    message: "What is the employee's id number"
},
{
    name: "email",
    type: "input",
    message: "What is the employee's email address?"
},
{
    name: "role",
    type: "list",
    message: "What is the employee's role?",
    choices: [
        "Engineer",
        "Manager",
        "Intern"
    ]
}
];

async function prompt() {
    let finishResponse = "";
    do {
        try {
            responseA = await inquirer.prompt(prompts)
            let responseB = '';
            // If the employee is a manager they will be promoted for the their office number
            if (responseA.role === "Manager") {
                responseB = await inquirer.prompt([{
                    name: "officeNumber",
                    type: "input",
                    message: "What is the Manager's office number?"
                }])
                // The new employee depending on class is then passed into an object and object is pushed to Employee Array
                const manager = new Manager(responseA.name, responseA.id, responseA.email, responseB.officeNumber)
                employeeArray.push(manager)

            // If the employee is an Engineer they will be promoted for their github username
            } else if (responseA.role === "Engineer") {
                responseB = await inquirer.prompt([{
                    name: "github",
                    type: "input",
                    message: "What is the Engineer's github username?"
                }])
                // The new employee depending on class is then passed into an object and object is pushed to Employee Array
                const engineer = new Engineer(responseA.name, responseA.id, responseA.email, responseB.github)
                employeeArray.push(engineer)
            // If the employee is an Intern they will be prompted for their college
            } else if (responseA.role === "Intern") {
                responseB = await inquirer.prompt([{
                    name: "school",
                    type: "input",
                    message: "What college does the Intern go to?"
                }])
                // The new employee depending on class is then passed into an object and object is pushed to Employee Array
                const intern = new Intern(responseA.name, responseA.id, responseA.email, responseB.school)
                employeeArray.push(intern)
            }

        } catch (err) {
            return console.log(err)
        }
        console.log(employeeArray)
        // Final Question to ask user if they want to create a new employee object
        finishResponse = await inquirer.prompt([{
            name: "finish",
            type: "list",
            message: "Do you want to add another Employee?",
            choices: [
                "Yes",
                "No"
            ]
        }])
    } while (finishResponse.finish === "Yes")
    // Render employeeArray to create html for each employee class
    const renderdArray = render(employeeArray)
    console.log(renderdArray)
    console.log(outputPath)
    //write file to create team.html file with rendered html
    fs.writeFile(outputPath, renderdArray, function(err){
        if(err) {
            return (err)
        }
    
        console.log("Congrats you just built a website")
    })

}

// calls the inquirer function when user enters node app.js in terminal
prompt();
