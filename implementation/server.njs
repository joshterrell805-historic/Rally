var http = require('http');

var users = {};
var server = http.createServer(function(req, res) {
  switch (req.method) {
  case 'GET':
    console.log('GET ' + req.headers.userid);
    switch (req.headers.userid) {
    case '1':
      res.end(users['2'] || '');
      break;
    case '2':
      res.end(users['1'] || '');
      break;
    default:
      throw new Error('invalid userId: ' + req.headers.userid);
    }
    break;
  case 'POST':
    console.log('POST ' + req.headers.userid + ' ' + req.headers.coords);
    users[req.headers.userid] = req.headers.coords;
    res.end();
    break;
  default:
    throw new Error("invalid method: " + req.method);
  }
});

server.listen(6721);
