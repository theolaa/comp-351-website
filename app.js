// Modules
const http = require('http');
const url = require('url');
const express = require('express');
const path = require('path');
const fs = require('fs');

// Set up Server
const app = express();

app.get("/COMP351/Labs/lab4/writeFile", function (req, res) {
  let q = url.parse(req.url, true);
  if (q.query["text"]) {
    fs.writeFile(path.join(__dirname + "/express/COMP351/Labs/lab4/readFile/file.txt"), q.query["text"], function () {
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
app.use(express.static('express'));

const server = http.createServer(app);
port = (process.env.PORT || 8080)
server.listen(port);

console.debug('Server listening on port ' + port);