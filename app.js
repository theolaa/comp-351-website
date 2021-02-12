// Modules
const http = require('http');
const mysql = require('mysql');
const url = require('url');
const express = require('express');
const path = require('path');
const fs = require('fs');

// Global Variables
var DBHost = "us-cdbr-east-03.cleardb.com";
var DBuser = "b25715a5e769ae";
var DBpwd = "61476d2a"
var DBdb = "heroku_3b482e602de5856"

const con = mysql.createConnection({
  host: DBHost,
  database: DBdb,
  user: DBuser,
  password: DBpwd
});

con.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected to MySQL!");
  }
});

// Keep connection alive, otherwise closes after ~30s of inactivity
setInterval(function () {
  con.query('SELECT name,score FROM score', (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Connection Active...');
  });
}, 45000);

con.query('SELECT * FROM score', (err, rows) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Contents of ' + DBdb + ':');
  console.log(rows);
});

// Set up Server
const app = express();

app.get("/COMP351/Labs/lab4/writeFile", function (req, res) {
  let q = url.parse(req.url, true);
  if (q.query["text"]) {
    fs.app
    fs.appendFile(path.join(__dirname + "/express/COMP351/Labs/lab4/readFile/file.txt"), q.query["text"] + "\n", function () {
      res.send("'" + q.query["text"] + "' saved to lab4/readFile/file.txt");
    });
  } else {
    res.send("Please use 'text' as the query <br> Example: '?text=Hello'");
  }
});
app.get("/COMP351/Labs/lab4/readFile/*", function (req, res) {
  let q = url.parse(req.url, true);
  fs.readFile(path.join(__dirname + "/express/COMP351/Labs/lab4/readFile/" + path.basename(req.url)), function (err, data) {
    if (err) {
      res.send("404 " + path.basename(req.url) + " not found");
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    }
  });
  //res.send(fs.readFileSync(path.normalize(req.url + "../file.txt")));
});
app.get("/COMP351/Labs/lab4/delFile", function (req, res) {
  fs.unlink(path.join(__dirname + "/express/COMP351/Labs/lab4/readFile/file.txt"), function () {
    res.send("file.txt deleted");
  })
});
app.use(express.static('express'));

const server = http.createServer(app);
port = (process.env.PORT || 8080)
server.listen(port);

console.debug('Server listening on port ' + port);