const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Cập nhật nếu cần
const client = new MongoClient(uri);

async function fetchData() {
  await client.connect();
  const database = client.db("Skyemec");
  const collection = database.collection("DrSchedule");
  const data = await collection.find({}).toArray();
  await client.close();
  return data;
}

module.exports = fetchData;
