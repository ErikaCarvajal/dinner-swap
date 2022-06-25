// import data from data.js to MongoDB
const data = require("./data.json");
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

    //connects to database
    const db = client.db("dinnerSwap");

    //connects to collection
    const dinners = await db.collection("meals").insertMany(data);
    const subscribers = await db.collection("users").insertMany(users);

    if (dinners && subscribers) {
      console.log(
        "Meals and Users collections are updated",
        dinners,
        subscribers
      );
    } else {
      console.log(
        "There was an error on uploading information. Please try again."
      );
    }
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnect");
};

batchImport();
