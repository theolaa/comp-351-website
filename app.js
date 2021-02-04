const http = require('http');
const url = require('url');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });
const server = http.createServer(app);
port = (process.env.PORT || 8080)
server.listen(port);
console.debug('Server listening on port ' + port);
console.log(__dirname);