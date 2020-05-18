> Template-Engine@1.0.0 test C:\Users\jorda\Desktop\Code\Template-Engine
> jest --verbose test/*

 PASS  Develop/test/Employee.test.js
  √ Can instantiate Employee instance (2 ms)
  √ Can set name via constructor arguments
  √ Can set id via constructor argument (1 ms)
  √ Can set email via constructor argument
  √ Can get name via getName() (1 ms)
  √ Can get id via getId()
  √ Can get email via getEmail()
  √ getRole() should return "Employee" (1 ms)

 PASS  Develop/test/Manager.test.js
  √ Can set office number via constructor argument (2 ms)
  √ getRole() should return "Manager" (1 ms)
  √ Can get office number via getOffice()

 PASS  Develop/test/Intern.test.js
  √ Can set school via constructor (4 ms)
  √ getRole() should return "Intern" (1 ms)
  √ Can get school via getSchool()

 PASS  Develop/test/Engineer.test.js
  √ Can set GitHUb account via constructor (3 ms)
  √ getRole() should return "Engineer" (1 ms)
  √ Can get GitHub username via getGithub()

Test Suites: 4 passed, 4 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        2.16 s