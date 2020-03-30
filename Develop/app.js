const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
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

async function prompt(){
    let finishResponse = "";
    do{
        try{
            responseA = await inquirer.prompt(prompts)
            let responseB = '';

            if(responseA.role === "Manager"){
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

        }catch(err){
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

​}




​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
