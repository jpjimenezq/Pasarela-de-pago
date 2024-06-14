const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = 'nextjsdb';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    cachedDb = db;
    console.log('Conectado exitosamente a MongoDB');
    return db;
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err.message);
    throw err;
  }
}

module.exports = { connectToDatabase };