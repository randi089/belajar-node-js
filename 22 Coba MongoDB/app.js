const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "ranfeb";

const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log("Koneksi berhasil!");

  //   pilih database
  const db = client.db(dbName);
  const collection = db.collection("mahasiswa");

  // menambahkan 1 data ke collection mahasiswa
  // const insertResult = await collection.insertOne({
  //   nama: "Muhammad Fauzan",
  //   email: "fauzan@gmail.com",
  // });
  // console.log("berhasil menambahkan => ", insertResult);

  // menambahkan Banyak data
  //   const insertResult = await collection.insertMany([
  //     {
  //       nama: "Taufiqurrahman",
  //       email: "taufiq@gmail.com",
  //     },
  //     {
  //       nama: "Tito Yanul Fikri",
  //       email: "tito@gmail.com",
  //     },
  //   ]);
  //   console.log("berhasil menambahkan => ", insertResult);

  // Menampilkan semua data
  //   const findResult = await collection.find({}).toArray();
  //   console.log("Found documents =>", findResult);

  // Menampilkan data berdasarkan kriteria
  //   const findResult = await collection
  //     .find({ _id: new ObjectId("66909012c57937a18dc4e49b") })
  //     .toArray();
  //   console.log("Found documents =>", findResult);

  // Mengubah data berdasarkan id
  //   const updateResult = await collection.updateOne(
  //     { _id: new ObjectId("66909012c57937a18dc4e49b") },
  //     {
  //       $set: {
  //         nama: "Randi Ajah",
  //       },
  //     }
  //   );
  //   console.log("Update documents =>", updateResult);

  //   Menghapus 1 data
  //     const deleteResult = await collection.deleteOne({
  //       _id: new ObjectId("66909012c57937a18dc4e49b"),
  //     });
  //     console.log("Deleted documents =>", deleteResult);

  //   Menghapus lebih dari 1 data
  const deleteResult = await collection.deleteMany({
    nama: "Muhammad Fauzan",
  });
  console.log("Deleted documents =>", deleteResult);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
