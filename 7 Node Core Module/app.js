// Core Module
// File System
const fs = require("fs");

// menuliskan string ke file (synchronous)
// try {
//   fs.writeFileSync("data/test.txt", "Hello World secara Synchronous!");
// } catch (err) {
//   console.log(err);
// }

// menuliskan string ke file (asynchronous)
// fs.writeFile("data/test.txt", "Hellow World secara Asynchronous", (err) => {
//   console.log(err);
// });

// membaca isi file (synchronous)
// const data = fs.readFileSync("test.text", "utf-8");

// console.log(data);

// membaca isi file (Asynchronous)
// fs.readFile("datas/test.text", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan nama anda : ", (nama) => {
  rl.question("Masukkan No HP anda : ", (nohp) => {
    const contact = { nama, nohp };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));

    console.log("Terimakasih sudah memasukkan data!");
    rl.close();
  });
});
