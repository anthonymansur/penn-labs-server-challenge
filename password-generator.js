const passwordHash = require("password-hash");
const password = ""; // enter password here
console.log(passwordHash.generate(password));