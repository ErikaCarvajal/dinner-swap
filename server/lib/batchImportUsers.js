// import data from data.js to MongoDB
const users = require("./users.json");

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
    const subscribers = await db.collection("users").insertMany(users);
    if (subscribers) {
      console.log("These extremelly smart people was added to the DB", subscribers);
    } else {
      console.log("Couldn't connect to the DB");
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnect");
};

batchImport();