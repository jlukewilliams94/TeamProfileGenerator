const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let employeeArray = [];

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

            if (responseA.role === "Manager") {
                responseB = await inquirer.prompt([{
                    name: "officeNumber",
                    type: "input",
                    message: "What is the Manager's office number?"
                }])
                const manager = new Manager(responseA.name, responseA.id, responseA.email, responseA.role, responseB.officeNumber)
                employeeArray.push(manager)
            } else if (responseA.role === "Engineer") {
                responseB = await inquirer.prompt([{
                    name: "github",
                    type: "input",
                    message: "What is the Engineer's github username?"
                }])
                const engineer = new Engineer(responseA.name, responseA.id, responseA.email, responseA.role, responseB.github)
                employeeArray.push(engineer)
            } else if (responseA.role === "Intern") {
                responseB = await inquirer.prompt([{
                    name: "school",
                    type: "input",
                    message: "What college does the Intern go to?"
                }])
                const intern = new Intern(responseA.name, responseA.id, responseA.email, responseA.role, responseB.school)
                employeeArray.push(intern)
            }

        } catch (err) {
            return console.log(err)
        }
        console.log(employeeArray)

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

    const renderdArray = render(employeeArray)
    console.log(renderdArray)
    console.log(outputPath)

    fs.writeFile(outputPath, renderdArray, function(e){
        if (err){
            console.log(err)
        }
        console.log("Congrats you just built a website")
    })

}


prompt();
