const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Abhay(Admin)",
    email: "example@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "TestUser",
    email: "example2@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Test 2",
    email: "exapmle3@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
