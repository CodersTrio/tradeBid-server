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

// ${process.env.DB_USER}
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m8cui.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const usersCollection = client.db(`${process.env.DB_NAME}`).collection("users");
  const productsCollection = client.db(`${process.env.DB_NAME}`).collection("products");
  const verifiedUsersCollection = client.db(`${process.env.DB_NAME}`).collection("verifiedUsers");

  
  // perform actions on the collection object

  // add user to database
  app.post('/addUser', (req, res) => {
    usersCollection.insertOne(req.body)
      .then(result => {
        res.send(true)
      })
  });

  // add products to database
  app.post('/addProduct', (req, res) => {
    productsCollection.insertOne(req.body)
      .then(result => {
        res.send(true)
      })
  });

  //getting products 
  app.get('/products', (req, res) => {
    productsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  });

  // verify user

  app.get('/verifyUser', (req, res) => {
    const queryEmail = req.query.email;
    usersCollection.find({ email: queryEmail })
        .toArray((err, users) => {
            verifiedUsersCollection.insertOne(users[0])
            .then(result => {
                    res.send(true)
                  })
        })
})
  //  app.get('/verifyUser', (req, res) => {
  //   const queryEmail = req.query.email;
  //   usersCollection.find({ email: queryEmail })
  //   .toArray((err, user) => {

  //   }

  //   console.log(user.body);
  //   verifiedUsersCollection.insertOne(user)
  //     .then(result => {
  //       res.send(true)
  //     })
  // });

 



});


app.get('/', (req, res) => {
  res.send('Hello Trade Bidders!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
