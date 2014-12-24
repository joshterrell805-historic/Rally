var http = require('http');

var server = http.createServer(function(req, res) {
  console.log(req.headers);
  res.end('yoooo');
});

server.listen(6721);
