const validator = require("validator");
const chalk = require("chalk");

// console.log(validator.isEmail("randi@gmail.c"));
// console.log(validator.isMobilePhone("0722345678", "id-ID"));
// console.log(validator.isNumeric("0722345678a"));

// console.log(chalk.italic.bgBlue.black("Hello World!"));
const nama = "Randi";
const pesan = chalk`Lorem ipsum dolor, {bgGreen.black.bold sit amet} consectetur {bgGreen.italic.black adipisicing} elit. At, blanditiis. Nama saya : ${nama}`;
console.log(pesan);
