const { prompt } = require('inquirer')
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

// readFileSync
const rf = promisify(readFile)
// writeFileSync
const wf = promisify(writeFile)

let nameQuestion = {
  type: 'input',
  name: 'name',
  message: 'What is your name?'
}

let idQuestion = {
  type: 'input',
  name: 'id',
  message: 'What is your employee ID?'
}

let emailQuestion = {
  type: 'input',
  name: 'email',
  message: 'What is your email?'
}

let roleQuestion = {
  type: 'list',
  name: 'role',
  message: 'What is your role at the company?',
  choices: ['Engineer', 'Intern']
}

let managerQuestion = {
  type: 'input',
  name: 'officeNumber',
  message: 'What is your office number?'
}
  
let engineerQuestion = {
  type: 'input',
  name: 'github',
  message: 'What is your Github username?'
}

let internQuestion = {
  type: 'input',
  name: 'school',
  message: 'What school do you attend?'
}

// make an empty array for all employees
let employeeArr = []

// function to start the question
async function startQuestions() {
  // ask the manager the initial questions
  const initPrompt = await prompt([nameQuestion, idQuestion, emailQuestion, managerQuestion])
    .then((results) => {

      let lead = new Manager(results.name,results.id, results.email, results.officeNumber)
      employeeArr.push(lead.htmlcard())
      console.log(employeeArr);
      
      teamNum=results.teamNumber  

      resume()
    })
    .catch(err => console.log(err))
}

// make function to resume the question
function resume() {
  prompt([{
    type: 'list',
    name: 'resume',
    message: 'Whould you like to add an Employee?',
    choices:['Yes', 'No']
  }])
    // if choice is 'yes' go to the next question, if choice is 'no' create HTML page
    .then((answer)=>{
      if(answer.resume === 'Yes'){
        askMemberQuestions()
      } else {
        employeeCardsJoined = employeeArr.join('')
        createHTML(employeeCardsJoined)
      }
    })
}

// make a function to ask members
async function askMemberQuestions() {
  
    let currentName
    let currentRole

    // ask member for name and role
    const memberPrompt = await prompt([nameQuestion, roleQuestion])
      .then(({ name, role }) => {
        currentName = name
        currentRole = role
      })

    // if current role is engineer
    if (currentRole === 'Engineer') {
      // ask the engineers the related questions
      const engineerPrompt = await prompt([idQuestion, emailQuestion, engineerQuestion])
        .then(({ id, email, github }) => {
          let engineerMember = new Engineer(currentName, id, email, github)
          employeeArr.push(engineerMember.htmlcard())
          resume()
        })
      // else if current role is intern
    } else {
      // ask the interns the related questions
      const internPrompt = await prompt([idQuestion, emailQuestion, internQuestion])
        .then(({ id, email, school }) => {
          let internMember = new Intern(currentName, id, email, school)
          employeeArr.push(internMember.htmlcard())
          resume()
        })
    }

}

// make function to create the HTML page
async function createHTML(arr) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <title>Employee Summary</title>
  </head>
  <body>
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
        <h1 class="display-4">Employee Summary</h1>
      </nav>
      <div class=" jumbotron">
        <div class="btn-lg row container">${arr}</div>
      </div>
    </div>
  </body>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </html>`

  // write file to team.html
  wf('./output/team.html', html, function(err){
  if(err)throw err
  console.log("done")
  })

}

startQuestions()

