const Employee = require("./Employee");

class Manager extends Employee {

  constructor(name, id, email, officeNumber) {
    super(name, id, email)
    this.officeNumber = officeNumber
  }

  getOfficeNumber() {
    return this.officeNumber
  }
  getRole() {
    return 'Manager'
  }
  htmlcard(){
    return `<div class="card border-primary mb-3 col-m-2">
      <div class="card-header">
        Manager
      </div>
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <p class="card-text">Id: ${this.id}</p>
        <p class="card-text">Email: ${this.email}</p>
        <p class="card-text">Office Number: ${this.officeNumber}</p>
      </div>
    </div>`
  }
}

module.exports = Manager