const prompt = require('inquirer').createPromptModule()
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Handlebars = require('handlebars')
const fs = require('fs')

let teamNumberQuestion = {
  type: 'input',
  name: 'teamNumber',
  message: 'How many team members are there?'
}

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

let employeeArr = []

async function startQuestions() {
  // ask the manager the initial questions
  const initPrompt = await prompt([nameQuestion, idQuestion, emailQuestion, managerQuestion])
    .then(({ teamNumber, name, id, email, officeNumber }) => {
      teamNumber = teamNumber
      let lead = new Manager(name, id, email, officeNumber).push(lead)
      askMemberQuestions(teamNumber - 1)
    })
    .catch(err => console.log(err))
}

async function askMemberQuestions(teamNumber) {
  for (let i = 0; i < teamNumber; i++) {
    let currentName
    let currentRole

    const memberPrompt = await prompt([nameQuestion, roleQuestion])
      .then(({ name, role }) => {
        currentName = name
        currentRole = role
      })

    if (currentRole === 'Engineer') {
      // ask the engineers the related questions
      const engineerPrompt = await prompt([idQuestion, emailQuestion, engineerQuestion])
        .then(({ id, email, github }) => {
          let engineerMember = new Engineer(currentName, id, email, github)
          employeeArr.push(engineerMember)
        })
    } else {
      // ask the interns the related questions
      const internPrompt = await prompt([idQuestion, emailQuestion, internQuestion])
        .then([{ id, email, school }] => {
        let internMember = new Intern(currentName, id, email, school)
        employeeArr.push(internMember)
        })
    }
  }

  createHTML(employeeArr)
}

async function createHTML(arr) {
  let cards = ''

  //create cards based on object types
  const objectChecker = await arr.forEach((elem) => {

    if (elem instanceof Manager) {
      let text = fs.readFileSync('./templates/manager.html', 'utf8')
      let template = Handlebars.compile(text)
      let result = template(elem)
      cards += result
    }

    if (elem instanceof Engineer) {
      let text = fs.readFileSync('./templates/engineer.html', 'utf8')
      let template = Handlebars.compile(text)
      let result = template(elem)
      cards += result
    }

    if (elem instanceof Intern) {
      let text = fs.readFileSync('./templates/intern.html', 'utf8')
      let template = Handlebars.compile(text)
      let result = template(elem)
      cards += result
    }

    //store cards text in object
    let cardObject = { cards }

    //add the created cards to template
    let text = fs.readFileSync('./templates/main.html', 'utf8')
    let template = Handlebars.compile(text)
    let result = template(cardObject)

    fs.writeFile('./output/team.html', result, err => {
      if (err) {
        throw err
        console.log('Saved!')
      }
    })
  })
}

startQuestions()
