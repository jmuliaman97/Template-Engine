const Employee = require("./Employee")

class Intern extends Employee {

  constructor(name, id, email, school) {
    super(name, id, email)
    this.school = school
  }
  
  getSchool() {
    return this.school
  }
  getRole() {
    return 'Intern'
  }
  htmlcard(){
      `<div class="card border-primary mb-3 col-m-2">
        <div class="card-header">
          Engineer
        </div>
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">Id: ${this.id}</p>
          <p class="card-text">Email: ${this.email}</p>
          <p class="card-text">School: ${this.school}</p>
        </div>
      </div>`
  }
}

module.exports = Intern