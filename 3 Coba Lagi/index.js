// console.log("Hello RanFeb");
// const nama = "Randi Febriadi";
// const cetakNama = (nama) => `Hi, nama saya ${nama}`;
// console.log(cetakNama(nama));
// const fs = require("fs"); //core module
// const cetakNama = require("./coba"); //local module
// const moment = require("moment"); //third party module / npm module / node_modules

// console.log("Hello RanFeb");

const coba = require("./coba");

console.log(
  coba.cetakNama("Randi"),
  coba.PI,
  coba.mahasiswa.cetakMhs(),
  new coba.Orang()
);
