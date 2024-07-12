const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");
const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

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

// halaman tambah contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "Form Tambah Contact",
    data: "",
  });
});

// proses tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      let duplikat = await Contact.find();
      duplikat = duplikat.find(
        (dup) => dup.nama.toLowerCase() === value.toLowerCase()
      );
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        data: req.body,
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        // kirimkan flash message
        req.flash("msg", "Contact berhasil ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);

// proses delete contact
app.delete("/contact", async (req, res) => {
  Contact.deleteOne(req.body).then((result) => {
    // kirimkan flash message
    req.flash("msg", "Contact berhasil dihapus!");
    res.redirect("/contact");
  });
});

// halaman form ubah contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "Form Ubah Contact",
    contact,
  });
});

// proses ubah data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      let duplikat = await Contact.find();
      duplikat = duplikat.find(
        (dup) => dup.nama.toLowerCase() === value.toLowerCase()
      );
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "No HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Edit Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // kirimkan flash message
        req.flash("msg", "Contact berhasil diubah!");
        res.redirect("/contact");
      });
    }
  }
);

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
