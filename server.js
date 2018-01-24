console.log('SERVER OPENED');

const express = require('express');
const bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// serve files from the public directory
app.use(express.static('public'));

// needed to parse JSON data in the body of POST requests
app.use(bodyparser.json());

// connect to the db and start the express server
let db;

// ***Replace the URL below with the URL for your database***
const url =  'mongodb://localhost/clickDB';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('ACTIVE ON 8080');
	   console.log('SUCCESSFUL.');
  });
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



// function testing1() {
//   const logScore = {person : score};
//   console.log(logScore);
// }


//------------------------------ 

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
  const logScore = {person : score};
  // ^ this line was previously
  // const click = {clickTime: new Date()};


  console.log(logScore);
  console.log(db);

  db.collection('score').save(logScore, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('score added to db');
    res.redirect('/');
  });
});


// ---------------

// get the click data from the database
app.get('/score', (req, res) => {

  db.collection('score').find().sort({score:-1}).limit(1).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// after receiving a PUT request, update the database 
app.put('/gameEnd', (req, res) => {
  console.log('Data received: ' + JSON.stringify(req.body));
  db.collection('score').save(req.body, (err, result) => {
    if (err) {
      return console.log(err);
    }
  });
  res.sendStatus(200); // respond to the client indicating everything was ok
});