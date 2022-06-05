// import data from data.js to MongoDB
const data = require("./data.json");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  //creates a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    //connect to the client
    await client.connect();
    console.log("connect");

    //connects to database
    const db = client.db("dinnerSwap");

    //connects to collection
    const dinners = await db.collection("meals").insertMany(data);
    if (dinners) {
      console.log("greet Success", dinners);
    } else {
      console.log("greet FAILURE");
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnect");
};

batchImport();