const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
let dbInstance = null;

const connectToDatabase = async () => {
  if (dbInstance) return dbInstance;
  try {
    const client = await MongoClient.connect(uri);
    dbInstance = client.db('responsi14');
    console.log('Connected to Database');
    return dbInstance;
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;