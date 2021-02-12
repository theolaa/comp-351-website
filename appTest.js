// Thanks to Adrian De Niz for this static HTML server outline

const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = process.env.HOST || '127.0.0.1'; // use hostname 127.0.0.1 unless there exists a preconfigured port
const port = process.env.PORT || 8080; // use port 8080 unless there exists a preconfigured port

http.createServer(function (request, response) {
  console.log('request ', request.url);
  let filePath = request.url;

  if (filePath == '/') {
    console.log("HOMEDIR");
    filePath = 'express/index.html';
  } else if (filePath.charAt(filePath.length - 1) == "/") {
    console.log("BASEDIR");
    filePath = "express/" + filePath + "index.html";
  }
  else {
    filePath = 'express' + request.url;
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
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(port);
console.log('Server running at http://${hostname}:${port}/');