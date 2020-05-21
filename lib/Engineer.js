const Employee = require("./Employee");

class Engineer extends Employee {

  constructor(name, id, email, github) {
    super(name, id, email)
    this.github = github
  }
  
  getGithub() {
    return this.github
  }
  getRole() {
    return 'Engineer'
  }
  htmlcard(){
   return `<div class="card border-primary mb-3 col-m-2">
      <div class="card-header">
        Engineer
      </div>
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">Id: ${this.id}</p>
        <p class="card-text">Email: ${this.email}</p>
        <p class="card-text">Github: ${this.github}</p>
      </div>
    </div>`
  }
}

module.exports = Engineer