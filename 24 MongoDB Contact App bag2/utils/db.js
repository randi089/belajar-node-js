const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ranfeb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Menambah 1 data
// const contact1 = new Contact({
//   nama: "Muhammad Fauzan",
//   nohp: "082392837281",
//   email: "fauzan@gmail.com",
// });

// Simpan ke collection
// contact1.save().then((contact) => console.log(contact));
