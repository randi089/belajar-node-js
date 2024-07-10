const { tulisPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await tulisPertanyaan("Masukkan nama anda : ");
  const email = await tulisPertanyaan("Masukkan email anda : ");
  const nohp = await tulisPertanyaan("Masukkan no HP anda : ");

  simpanContact(nama, email, nohp);
};

main();
