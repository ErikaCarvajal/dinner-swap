// Utility function to connect to MongoDB

// Dependencies:
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = async (req, res, next) => {
  //connect to Mongo and save to a client variable:
  try {
    const client = new MongoClient(MONGO_URI, options);
    // create new MongoClient object:
    await client.connect();
    // save client to a req key:
    res.locals.clientDb = client;
    console.log("Connected to MongoDB");

    //Pass it to the next handler:
    next(); //use next instead of sending the response.
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendResponse = (res, status, data, message = "No message included") => {
  return res.status(status).json({ status, data, message });
};

module.exports = { sendResponse, connectDb };