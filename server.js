var connect = require('connect');
connect.createServer(
  connect.logger(),
  connect.static(__dirname + '/public')
).listen(process.env.PORT || 3000);