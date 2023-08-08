const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let collection;

async function connectToMongoDB() {
  try {
    const url =   process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/react';
    
  //  const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3';
   // const url = 'mongodb://mongodb:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3';
    const client = new MongoClient(url);

    // Wait for MongoDB container to initialize for 5 seconds (adjust as needed)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await client.connect();
    console.log('Connected to MongoDB successfully!');
    const db = client.db('react');
    collection = db.collection('login');
    const response = await collection.find({}).toArray();
     console.log('Data retrieved from collection:', response);
   }
   catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB().then(() => {
  app.post('/api/login', async (req, res) => {
    const {username,password} = req.body;
    console.log('Received username:', username);
    console.log('Received password:', password);
  
    try {
      const user = await collection.findOne({username,password});
      console.log('User data from database:', user);
  
      if (user) {
        return res.json({ success: true, message: 'Login Successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid Credentials' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

  // Other routes and app.listen as per your existing code...
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


