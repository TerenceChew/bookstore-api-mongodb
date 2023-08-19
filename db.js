const { MongoClient } = require("mongodb");

let dbConnection;
const connectionString =
  "mongodb+srv://terencecws:test123@cluster0.82suigq.mongodb.net/?retryWrites=true&w=majority";

const connectToDb = async cb => {
  try {
    const client = await MongoClient.connect(connectionString);
    dbConnection = client.db();
    cb();
  } catch (err) {
    cb(err);
  }
};

const getDb = () => dbConnection;

module.exports = {
  connectToDb,
  getDb,
};
