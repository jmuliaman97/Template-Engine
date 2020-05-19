# Test Result

> jest --verbose test/*

 PASS  test/Employee.test.js
  √ Can instantiate Employee instance (3 ms)
  √ Can set name via constructor arguments
  √ Can set id via constructor argument
  √ Can set email via constructor argument (1 ms)
  √ Can get name via getName()
  √ Can get id via getId()
  √ Can get email via getEmail()
  √ getRole() should return "Employee" (1 ms)

 PASS  test/Manager.test.js
  √ Can set office number via constructor argument (6 ms)
  √ getRole() should return "Manager" (1 ms)
  √ Can get office number via getOffice() (1 ms)

 PASS  test/Engineer.test.js
  √ Can set GitHUb account via constructor (3 ms)
  √ getRole() should return "Engineer" (1 ms)
  √ Can get GitHub username via getGithub()

 PASS  test/Intern.test.js
  √ Can set school via constructor (4 ms)
  √ getRole() should return "Intern"
  √ Can get school via getSchool() (1 ms)

Test Suites: 4 passed, 4 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        3.299 s