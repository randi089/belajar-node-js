const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");
const app = express();
const port = 3000;

// setup ejs
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Halaman Home
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

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts: await Contact.find(),
    msg: req.flash("msg"),
  });
});

// halaman detail contact
app.get("/contact/:nama", async (req, res) => {
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact: await Contact.findOne({ nama: req.params.nama }),
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
