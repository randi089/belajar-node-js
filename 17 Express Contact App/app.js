const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contact");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

app.use(expressLayouts); // Third party middleware

app.use(express.static("public")); // Built-in middleware

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Randi Febriadi",
      email: "randifebriadi@gmail.com",
    },
    {
      nama: "Tasya Aryati Sakinah",
      email: "tasyaaryati@gmail.com",
    },
    {
      nama: "Rumzi Rahman",
      email: "rumzirahman@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Randi Febriadi",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts: loadContact(),
  });
});

app.get("/contact/:nama", (req, res) => {
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact: findContact(req.params.nama),
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
