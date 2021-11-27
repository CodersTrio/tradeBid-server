const { MongoClient } = require('mongodb');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
// const fileUpload = require('express-fileupload');
const ObjectId = require("mongodb").ObjectID;
require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()
app.use(cors());
app.use(bodyParser.json());
// app.use(fileUpload());


const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m8cui.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const usersCollection = client.db(`${process.env.DB_NAME}`).collection("user");
  // perform actions on the collection object
  
   // add user to database
   app.post('/addUser', (req, res) => {
    usersCollection.insertOne(req.body)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
});


  
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
