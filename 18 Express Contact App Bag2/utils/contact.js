const fs = require("fs");

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menuliskan / menimpa file contacts.json dengan data yang baru
const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts, null, 2));
};

// menambahkan data contact baru
const addContact = ({ nama, email, nohp }) => {
  const contacts = loadContact();
  const contact = { nama, email, nohp };

  contacts.push(contact);

  saveContact(contacts);
};

// cek nama yang duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
};

module.exports = { loadContact, findContact, addContact, cekDuplikat };
