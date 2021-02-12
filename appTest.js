// Thanks to Adrian De Niz for this static HTML server outline

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const hostname = process.env.HOST || '127.0.0.1'; // use hostname 127.0.0.1 unless there exists a preconfigured port
const port = process.env.PORT || 8080; // use port 8080 unless there exists a preconfigured port

http.createServer(function (req, res) {
  let q = url.parse(path.normalize(req.url), true);
  console.log('Request: ', q);
  let filePath = "";

  if (q.pathname == "/COMP351/Labs/lab4/writeFile/") {
    console.log("Writefile");
    if (q.query["text"]) {
      fs.appendFile(path.join(__dirname + "/express/COMP351/Labs/lab4/readFile/file.txt"), q.query["text"] + "\n", function (err) {
        if (err) {
          res.end("Error");
        } else {
          res.end("'" + q.query["text"] + "' saved to lab4/readFile/file.txt");
        }
      });
    } else {
      res.end("Please use 'text' as the query <br> Example: '?text=Hello'");
    }
    return;
  } else if (q.pathname.indexOf("/COMP351/Labs/lab4/readFile/") == 0) {
    console.log("Readfile " + path.basename(q.pathname));
    filePath = "express/" + q.pathname;
  } else if (q.pathname == "/COMP351/Labs/lab4/delFile/") {
    fs.unlink(path.join(__dirname + "/express/COMP351/Labs/lab4/readFile/file.txt"), function () {
      res.end("file.txt deleted");
      return;
    })
  } else if (q.pathname.indexOf(".") < 0) {
    console.log("BASEDIR");
    filePath = path.join("express" + q.pathname + "/index.html");
  }
  else {
    filePath = 'express' + req.url;
  }

  let extname = String(path.extname(filePath)).toLowerCase();
  let mimeTypes = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain'
  };

  let contentType = mimeTypes[extname] || 'application/octet-stream';

  console.log("File path: " + filePath);
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('express/404.html', function (error, content) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });

}).listen(port);
console.log(`Server running at http://${hostname}:${port}/`);