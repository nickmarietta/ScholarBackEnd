const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv/config');

const uri = process.env.MONGO_URI || '';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDb() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error(err);
  }
}

connectToDb();

let db = client.db('ScholarsPath');
let collection = db.collection('Users');
module.exports = db;
