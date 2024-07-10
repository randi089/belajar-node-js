const express = require("express");
const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

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
    nama: "Randi Febriadi",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Halaman Contact" });
});

app.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.send(
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
