// Thanks to Adrian De Niz for this static HTML server template

// Modules
const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const url = require('url');
const quiz = require('./personal_project');

// Global Variables
var DBconnected = false;
var DBHost = "us-cdbr-east-03.cleardb.com";
var DBuser = "b25715a5e769ae";
var DBpwd = "61476d2a"
var DBdb = "heroku_3b482e602de5856"
var hostname = process.env.HOST || '127.0.0.1'; // use hostname 127.0.0.1 unless there exists a preconfigured port
var port = process.env.PORT || 8080; // use port 8080 unless there exists a preconfigured port

http.createServer(function (req, res) {
  let q = url.parse(path.normalize(req.url), true);
  // console.log('Request: ', q);
  let filePath = "";

  // Lab 4 Write to File
  if (q.pathname == "/COMP351/Labs/lab4/writeFile/") {
    console.log("Writefile");
    if (q.query["text"]) {
      fs.appendFile(path.join(__dirname + "/public/COMP351/Labs/lab4/readFile/file.txt"), q.query["text"] + "\n", function (err) {
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
  }

  // Lab 4 Read from File
  else if (q.pathname.indexOf("/COMP351/Labs/lab4/readFile/") == 0) {
    console.log("Readfile " + path.basename(q.pathname));
    filePath = "public/" + q.pathname;
  }

  // Lab 4 Delete File
  else if (q.pathname == "/COMP351/Labs/lab4/delFile/") {
    fs.unlink(path.join(__dirname + "/public/COMP351/Labs/lab4/readFile/file.txt"), function () {
      res.end("file.txt deleted");
      return;
    })
  }

  // Lab 5 Write to DB
  else if (q.pathname.includes("/COMP351/Labs/lab5/write")) {
    if (DBconnected) {
      con.query('INSERT INTO score VALUES ("' + q.query.name + '",' + q.query.score + ');', function (err, rows) {
        if (err) {
          console.log(err);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          res.end("Error writing to DB");
        } else {
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          res.end(q.query.name + ":" + q.query.score + " was stored in the DB");
        }
      });
      return;
    }
  }

  // Lab 5 Read from DB
  else if (q.pathname.includes("/COMP351/Labs/lab5/read")) {
    if (DBconnected) {
      con.query('SELECT * FROM score;', function (err, result, fields) {
        if (err) {
          console.log(err);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          res.end("Error reading from DB");
        } else {
          console.log(result);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          for (i = 0; i < result.length; i++) {
            res.write(result[i].name + ":" + result[i].score + "\n");
          }
          res.end();
        }
      });
      return;
    }
  }

  else if (q.pathname.includes("/deletecar")) {

  }

  else if (q.pathname.includes("/updatecar")) {
    if (req.method === 'POST') {
      body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
        if (body.length == 0) {
          res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
          res.end("No POST data sent");
          return;
        }
        try {
          body = JSON.parse(body)
        }
        catch (err) {
          res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
          res.end("Invalid JSON");
          return;
        }
        if (DBconnected) {
          con.query(`UPDATE \`cars\` SET \`manufacturer\`='${body.manufacturer}',\`model\`='${body.model}',\`year\`=${body.year},\`colour\`='${body.colour}',\`mileage\`=${body.mileage},\`price\`=${body.price} WHERE \`id\` = ${body.id};`, function (err, rows) {
            if (err) {
              console.log(err);
              res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
              res.end("Error writing to DB");
            } else {
              if (rows.affectedRows == 0) {
                res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
                res.end("Invalid ID");
              } else {
                res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
                res.end("Car was successfully updated in the DB");
              }
            }
          });
          return;
        }
      });
      return;
    }
  }

  else if (q.pathname.includes("/savecar")) {

    if (req.method === 'POST') {
      body = '';
      req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
      });
      req.on('end', () => {
        if (body.length == 0) {
          res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
          res.end("No POST data sent");
          return;
        }
        try {
          body = JSON.parse(body)
        }
        catch (err) {
          res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
          res.end("Invalid JSON");
          return;
        }
        if (DBconnected) {
          con.query(`INSERT INTO \`cars\`(\`manufacturer\`, \`model\`, \`year\`, \`colour\`, \`mileage\`, \`price\`) VALUES ('${body.manufacturer}', '${body.model}', ${body.year}, '${body.colour}', ${body.mileage}, ${body.price});`, function (err, rows) {
            if (err) {
              console.log(err);
              res.writeHead(400, { "Access-Control-Allow-Origin": "*" });
              res.end("Error writing to DB");
            } else {
              res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
              res.end("Car was successfully stored in the DB");
            }
          });
          return;
        }
      });
      return;
    }
  }

  else if (q.pathname.includes("/getcars")) {

    if (DBconnected) {
      con.query('SELECT * FROM cars;', function (err, result, fields) {
        if (err) {
          console.log(err);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
          res.end("Error reading from DB");
        } else {
          console.log(result);
          res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" });
          contentString = [];
          for (i = 0; i < result.length; i++) {
            item = result[i];
            contentString.push({ "id": item.id, "manufacturer": item.manufacturer, "model": item.model, "year": item.year, "colour": item.colour, "mileage": item.mileage, "price": item.price });
          }
          res.write(JSON.stringify(contentString));
          res.end();
        }
      });
      return;
    }
  }

  // Paths with no specific file e.g. https://localhost/ as opposed to https://localhost/index.html
  else if (q.pathname.indexOf(".") < 0) {
    filePath = path.join("public" + q.pathname + "/index.html");
  }
  else {
    filePath = 'public' + req.url;
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

  // console.log("File path: " + filePath);
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('public/404.html', function (error, content) {
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
    DBconnected = true;
  }
});

// Keep connection alive, otherwise closes after ~30s of inactivity
setInterval(function () {
  con.query('SELECT 1 FROM score', function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('DB Connection active (' + DBHost + ":" + DBdb + ')');
  });
  //}, 5000); // For testing
}, 45000); // Turns out 45s is slow enough to not feel like I'm wasting DB resources, but frequent enough to still work.